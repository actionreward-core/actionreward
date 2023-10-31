/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { signIn } from "../client/mutations/signin";
import { getMe } from "../client/queries/me";
import {
  ScoreBoardRow,
  Scoreboard,
  playMatch,
} from "../client/mutations/match";
import classNames from "classnames";

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

  const renderTeamScoreboard = (team: ScoreBoardRow[], className: string) => (
    <div className="overflow-x-auto mb-2">
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
            <tr className={classNames({ 'bg-blue-700': user.nickname === me?.nickname })}>
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
          <div>
            <h1
              className={classNames("text-3xl font-bold text-center mt-8 mb-4 text-white rounded-lg p-4", {
                "bg-red-500": !scoreboard.victory,
                "bg-blue-500": scoreboard.victory,
              })}
            >
              {scoreboard.victory ? "VICTORY" : "DEFEAT"}
            </h1>
            <div className="font-bold mb-2">
              Team A
            </div>
            {renderTeamScoreboard(scoreboard.teamA, "bg-blue-500 text-white")}
            <div className="font-bold mb-2 mt-8">
              Team B
            </div>
            {renderTeamScoreboard(scoreboard.teamB, "bg-red-500 text-white")}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button className="btn btn-primary" onClick={onPlayMatchClick}>
            Play Match
          </button>
        </div>
      </div>
    </div>
  );
};
