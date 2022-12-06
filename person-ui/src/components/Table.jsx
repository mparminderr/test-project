import React from "react";
import "./PersonTable.css";

const Table = (props) => {
  return (
    <div className="p-3">
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
              props.data.map((person, index) => {
                console.log("returning", person);
                return (
                  <tr
                    onClick={(event) => {
                      event.preventDefault();

                      props.personClicked(person);
                    }}
                    key={index}
                    className={"person-row"}
                  >
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{person.data.id}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                          <img
                            className="rounded-full"
                            src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                            width="40"
                            height="40"
                            alt="Alex Shatov"
                          />
                        </div>
                        <div className="font-medium">{person.data.name}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{person.data.country}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{person.data.language}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{person.data.birthdate}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-green-500">
                        {person.data.telephone}
                      </div>
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
export default Table;
