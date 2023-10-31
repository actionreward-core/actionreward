/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FC } from "react";
import { AppLayout } from "../../../layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { getProjectUsers } from "../../../client/queries/projectUsers";

export interface UsersIndexProps {}

export const UsersIndex: FC<UsersIndexProps> = () => {
  const { data: users } = useQuery({
    queryKey: ["getProjectUsers"],
    queryFn: getProjectUsers,
    refetchInterval: 10000,
  });
  return (
    <AppLayout title="Connected Users" noContentPadding>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-gray-100">
              <th>User ID</th>
              <th>Connected At</th>
            </tr>
          </thead>
          <tbody>
            {users?.data.map((user) => (
              <tr>
                <td>{user.userId}
                  <div className="text-gray-400 text-xs">
                    {user.did}
                  </div>
                </td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users?.data.length === 0 && (
          <div className="w-full flex items-center justify-center p-24 border-dashed border-2 text-gray-500">
            No user connected the PolygonID yet
          </div>
        )}
      </div>
    </AppLayout>
  );
};
