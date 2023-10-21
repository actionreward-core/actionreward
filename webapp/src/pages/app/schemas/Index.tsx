import React, { FC } from "react";
import { AppLayout } from "../../../layouts/AppLayout";
import { CodeBracketIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export interface SchemasIndexProps {}

export const SchemasIndex: FC<SchemasIndexProps> = () => {
  const rightMenuActions = (
    <div>
      <Link className="btn btn-sm btn-primary flex" to="/app/schemas/create">
        <PlusIcon className="w-4 h-4" />
        Create
      </Link>
    </div>
  );
  return (
    <AppLayout
      title="Action Schemas"
      noContentPadding
      actions={rightMenuActions}
    >
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Version</th>
              <th>Description</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link
                  to={`/app/schemas/123`}
                  className="link no-underline text-primary"
                >
                  Win The Match
                </Link>
              </td>
              <td>0.0.1</td>
              <td>Win the Match in First Place</td>
              <td className="text-center">
                <button className="btn btn-sm btn-square">
                  <CodeBracketIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <Link
                  to={`/app/schemas/123`}
                  className="link no-underline text-primary"
                >
                  Another Thing
                </Link>
              </td>
              <td>0.0.1</td>
              <td>Desktop Support Technician</td>
              <td className="text-center">
                <button className="btn btn-sm btn-square">
                  <CodeBracketIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <Link
                  to={`/app/schemas/123`}
                  className="link no-underline text-primary"
                >
                  Another Thing
                </Link>
              </td>
              <td>0.0.1</td>
              <td>Tax Accountant</td>
              <td className="text-center">
                <button className="btn btn-sm btn-square">
                  <CodeBracketIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};
