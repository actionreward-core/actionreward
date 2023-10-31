import { FC } from "react";
import { AppLayout } from "../../../layouts/AppLayout";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRewards } from "../../../client/queries/rewards";

export interface SchemasIndexProps {}

export const RewardsIndex: FC<SchemasIndexProps> = () => {
  const { data: rewards } = useQuery({
    queryKey: ['getRewards'],
    queryFn: getRewards,
  })
  const rightMenuActions = (
    <div>
      <Link className="btn btn-sm btn-primary flex" to="/app/rewards/create">
        <PlusIcon className="w-4 h-4" />
        Create
      </Link>
    </div>
  );
  return (
    <AppLayout
      title="Rewards"
      noContentPadding
      actions={rightMenuActions}
    >
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Type</th>
              <th>Supply</th>
            </tr>
          </thead>
          <tbody>
            {rewards?.data.map(reward => (
              <tr>
                <td>
                  <Link
                    to={`/app/schemas/123`}
                    className="link no-underline text-primary"
                  >
                    {reward.name}
                  </Link>
                </td>
                <td>{reward.type}</td>
                <td>
                  500
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};
