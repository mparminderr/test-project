import React, { useState } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import { configuration } from "../configuration";

const AddPerson = (props) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthdate: "",
    telephone: "",
    country: "0",
    language: "0",
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  let personApi =
    configuration[`${process.env.NODE_ENV}`]?.person?.baseUrl ||
    "http://localhost:4000";
  const onChangeHandler = (event) => {
    console.log("Setting event", event.target.value);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    // let {first_name,last_name,birthdate,telephone} = formData;
    event.preventDefault();
    axios
      .post(personApi + "/person/create", formData)
      .then((res) => {
        setMessage("Record entered");
        setDefault();
        props.refreshPersons();
      })
      .catch((err) => {
        setMessage(err.message);
        setError(true);
      });
  };
  const hide = () => {
    props.hide();
  };

  const setDefault = () => {
    let keys = Object.keys(formData);
    let obj = {};
    keys.forEach((key) => {
      obj[`${key}`] = "";
    });
    setFormData(obj);
  };
  return (
    <div
      id="person-modal"
      style={{ background: "#00000080" }}
      className="fade flex justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={hide}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Add a new person
            </h3>
            <form onSubmit={onSubmit} className="space-y-6" action="#">
              <div>
                {/*<label htmlFor="firstName" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>*/}
                <input
                  value={formData.first_name}
                  onChange={onChangeHandler}
                  type="text"
                  name="first_name"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="First name"
                />
              </div>
              <div>
                {/*<label htmlFor="lastName" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>*/}
                <input
                  value={formData.last_name}
                  onChange={onChangeHandler}
                  type="text"
                  name="last_name"
                  id="lastName"
                  placeholder="Last name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                {/*<label htmlFor="birthDate" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your birth date</label>*/}
                <input
                  value={formData.birthdate}
                  onChange={onChangeHandler}
                  type="date"
                  name="birthdate"
                  id="birthDate"
                  placeholder="Birth date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                {/*<label htmlFor="telephone" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your telephone</label>*/}
                <input
                  value={formData.telephone}
                  onChange={onChangeHandler}
                  type="text"
                  name="telephone"
                  id="telephone"
                  placeholder="Telephone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              {props.languages && props.languages.length && (
                <div>
                  <Dropdown
                    value={formData.language}
                    name={"language"}
                    onChange={onChangeHandler}
                    items={props.languages}
                    placeHolder={"Select language"}
                  />
                </div>
              )}
              {props.countries && props.countries.length && (
                <div>
                  <Dropdown
                    value={formData.country}
                    name={"country"}
                    onChange={onChangeHandler}
                    items={props.countries}
                    placeHolder={"Select country"}
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add it!
              </button>
              {message && (
                <h2
                  className={
                    "text-3xl " + error ? "text-red-500" : "text-green-500"
                  }
                >
                  {message}
                </h2>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddPerson;
