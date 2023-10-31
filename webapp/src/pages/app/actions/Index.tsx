import { FC } from "react";
import { AppLayout } from "../../../layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { getActions } from "../../../client/queries/actions";

export interface ActionsIndexProps {}

export const ActionsIndex: FC<ActionsIndexProps> = () => {
  const { data: actions } = useQuery({
    queryKey: ["getActions"],
    queryFn: getActions,
    refetchInterval: 10000,
  });
  return (
    <AppLayout title="Triggered Actions" noContentPadding>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-gray-100">
              <th>User ID</th>
              <th>Action Schema</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {actions?.data.map((action) => (
              <tr>
                <td>{action.user.userId}
                  <div className="text-gray-400 text-xs">
                    {action.user.did}
                  </div>
                </td>
                <td>{action.schema.name}</td>
                <td>{new Date(action.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {actions?.data.length === 0 && (
          <div className="w-full flex items-center justify-center p-24 border-dashed border-2 text-gray-500">
            No action triggered yet
          </div>
        )}
      </div>
    </AppLayout>
  );
};
