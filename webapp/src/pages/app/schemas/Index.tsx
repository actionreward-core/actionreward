import { FC } from "react";
import { AppLayout } from "../../../layouts/AppLayout";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSchemas } from "../../../client/queries/schemas";

export interface SchemasIndexProps {}

export const SchemasIndex: FC<SchemasIndexProps> = () => {
  const { data: schemas } = useQuery({
    queryKey: ['getSchemas'],
    queryFn: getSchemas,
  })
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
              <th>Key</th>
              <th>Description</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schemas?.data.map(schema => (
              <tr>
                <td>
                {schema.name}
                </td>
                <td>{schema.key}</td>
                <td>{schema.description}</td>
                <td>
                  <Link
                    to={schema.schemaUrl || ''}
                    className="link no-underline text-primary"
                    target="_blank"
                  >
                    View Schema JSON
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {schemas?.data.length === 0 && (
          <div className="w-full flex items-center justify-center p-24 border-dashed border-2 text-gray-500">
            No schema created yet
          </div>
        )}
      </div>
    </AppLayout>
  );
};
