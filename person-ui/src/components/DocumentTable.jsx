import React from "react";

const DocumentTable = (props) => {
  return (
    <div className="p-3 my-12">
      <div className="overflow-x-auto mx-auto">
        <table className="table-auto w-full mx-auto">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              {props.columns.map((column, index) => {
                return (
                  <th
                    key={column.name + index}
                    className="p-2 whitespace-nowrap"
                  >
                    <div className="font-semibold text-left">{column.name}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100 text-white">
            {props.data &&
              props.data.length &&
              props.data.map((item, index) => {
                return (
                  <tr key={index + item.id} className={"person-row"}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{item.id}</div>
                    </td>

                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-green-500">{item.tag}</div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DocumentTable;
