import { FC } from "react";
import { AppLayout } from "../../../layouts/AppLayout";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRewards } from "../../../client/queries/rewards";

export interface SchemasIndexProps {}

const OPERATORS_NAME: any = {
  $eq: 'equals to',
  $ne: 'not equals to',
  $lt: 'less than',
  $gt: 'greater than',
  $in: 'in',
  $nin: 'not in',
};


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
              <th>Condition</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rewards?.data.map(reward => (
              <tr>
                <td>
                  {reward.name}
                </td>
                <td>
                  {reward.type === 'GIFT_CARD' ? 'Gift Card': 'Custom'}
                </td>
                <td>
                  <strong>{reward.conditionField} </strong>{OPERATORS_NAME[reward.conditionOperator]} <strong>{reward.conditionValue}</strong>
                </td>
                <td>
                  <Link
                    to={`/rewards/${reward.id}`}
                    className="link no-underline text-primary"
                    target="_blank"
                  >
                    View Claim Page
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rewards?.data.length === 0 && (
          <div className="w-full flex items-center justify-center p-24 border-dashed border-2 text-gray-500">
            No reward created yet
          </div>
        )}
      </div>
    </AppLayout>
  );
};
