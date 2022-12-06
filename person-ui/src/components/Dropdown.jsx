import React from "react";

const Dropdown = (props) => {
  // const [value, setValue] = useState("");
  const onChange = (event) => {
    // console.log('The value', event.target.value)

    props.onChange(event);
  };

  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <select
          name={props.name}
          onChange={onChange}
          defaultValue={"0"}
          value={props.value}
          placeholder={props.placeHolder}
          className="form-select appearance-none

      w-full
    dark:placeholder-gray-400
      bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
      border border-solid border-gray-300
      block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
      transition
      ease-in-out
      m-0
     focus:border-blue-600 focus:outline-none"
        >
          <option value={"0"}>{props.placeHolder}</option>
          {props.items &&
            props.items.map((item, index) => {
              return (
                <option key={index + item.data} value={item.itemId}>
                  {item.data}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};
export default Dropdown;
