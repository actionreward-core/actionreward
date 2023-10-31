/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useMemo, useState } from "react";
import { signIn } from "../client/mutations/signin";
import { getMe } from "../client/queries/me";
import {
  ScoreBoardRow,
  Scoreboard,
  playMatch,
} from "../client/mutations/match";
import classNames from "classnames";
import { PolygonIdLogo } from "../components/PolygonIdLogo";

export const IndexPage: FC = () => {
  const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null);
  const { data: me, refetch: refetchMe } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
  const signinMutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: signIn,
  });
  const playMatchMutation = useMutation({
    mutationKey: ["playMatch"],
    mutationFn: playMatch,
  });
  const onSignInClick = async () => {
    const { token } = await signinMutation.mutateAsync();
    localStorage.setItem("game-access-token", token);
    refetchMe();
  };
  const logout = () => {
    localStorage.removeItem("game-access-token");
    refetchMe();
  };
  const onPlayMatchClick = async () => {
    const scoreboard = await playMatchMutation.mutateAsync();
    setScoreboard(scoreboard);
  };

  const getRewardUrl = () => {
    return `${import.meta.env.VITE_ACTION_REWARDS_BASE_URL || ''}/rewards/${import.meta.env.VITE_REWARD_ID || ''}`;
  }

  const renderTeamScoreboard = (team: ScoreBoardRow[], className: string) => (
    <div className="overflow-x-auto mb-2">
      <div className="flex">
        <table className={`table ${className} rounded-lg`}>
          <thead>
            <tr className="text-white">
              <th>Score</th>
              <th>Nickname</th>
              <th>Kills</th>
              <th>Deaths</th>
              <th>K/D</th>
            </tr>
          </thead>
          <tbody>
            {team.map((user) => (
              <tr
                className={classNames({
                  "bg-blue-700": user.nickname === me?.nickname,
                })}
              >
                <th>{user.score}</th>
                <td>{user.nickname}</td>
                <td>{user.kills}</td>
                <td>{user.deaths}</td>
                <td>{user.kd.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (!me) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <button className="btn btn-primary" onClick={() => onSignInClick()}>
          Sign-In
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div>
        {me && (
          <div className="flex justify-center mb-4">
            <div className="flex items-center">
              <div className="avatar">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-4">
                  <img src={me.avatar} />
                </div>
              </div>
              {me.nickname}
              <a
                className="text-primary ml-2 cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </a>
            </div>
          </div>
        )}
        {scoreboard && (
          <div className="flex">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
              <h1
                className={classNames(
                  "text-3xl font-bold text-center mt-8 mb-4 text-white rounded-lg p-4",
                  {
                    "bg-red-500": !scoreboard.victory,
                    "bg-blue-500": scoreboard.victory,
                  }
                )}
              >
                {scoreboard.victory ? "VICTORY" : "DEFEAT"}
              </h1>
              <div className="font-bold mb-2">Team A</div>
              {renderTeamScoreboard(scoreboard.teamA, "bg-blue-500 text-white")}
              <div className="font-bold mb-2 mt-8">Team B</div>
              {renderTeamScoreboard(scoreboard.teamB, "bg-red-500 text-white")}
            </div>
            <div>
              <div className="flex items-center ml-8 bg-gray-800 border border-gray-700 rounded-lg p-8">
                <div className="flex flex-col items-center justify-center text-center w-full">
                  <div className="text-center mb-4 text-white">
                    Match Certificate
                  </div>
                  <img src={scoreboard.qrcode} className="w-64" />
                  <div className="flex justify-center mt-4">
                    <PolygonIdLogo />
                  </div>
                </div>
              </div>
              <div className="flex items-center ml-8 bg-gray-800 border border-gray-700 rounded-lg p-8 mt-2">
                <div>
                  Get beta access with a score above 1000
                  <div className="mt-16">
                    <a className="btn btn-primary btn-block" target="_blank" href={getRewardUrl()}>
                      Claim Reward
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            className="btn btn-primary btn-block"
            onClick={onPlayMatchClick}
          >
            Play Match
          </button>
        </div>
      </div>
    </div>
  );
};
