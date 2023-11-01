import { FC } from "react";
import { AppLayout } from "../../layouts/AppLayout";
import {
  BoltIcon,
  DocumentTextIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getActions } from "../../client/queries/actions";
import { getDashboardStats } from "../../client/queries/dashboard";
import { Link } from "react-router-dom";

export const AppIndexPage: FC = () => {
  const { data: stats } = useQuery({
    queryKey: ["getDashboardStats"],
    queryFn: getDashboardStats,
    refetchInterval: 10000,
  });
  const { data: actions } = useQuery({
    queryKey: ["getActions"],
    queryFn: getActions,
    refetchInterval: 10000,
  });
  return (
    <AppLayout>
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <BoltIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">Triggered Actions</div>
          <div className="stat-value text-primary">{stats?.actions}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <UsersIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">Connected Users</div>
          <div className="stat-value text-primary">{stats?.users}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <DocumentTextIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">Action Schemas</div>
          <div className="stat-value text-primary">{stats?.schemas}</div>
        </div>
      </div>

      <div className="bg-white border rounded-lg mt-16">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-4 border-b flex content-between w-full items-center">
          <div className="w-full">
            <h1 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
              Recent Triggered Actions
            </h1>
          </div>
        </div>
        <div className={"max-w-7xl mx-auto p-2 sm:p-2 lg:p-2"}>
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
                    <td>
                      {action.user.userId}
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
                <div className="text-center">
                  No action triggered yet. <br />
                  The actions triggered from SDK will appear here

                  <div className="mt-8">
                    <div>
                    Looks like you don't have schema yet
                    </div>
                    <Link to="/app/schemas/create" className="btn btn-outline btn-primary mt-4">
                      Create your first Schema
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
