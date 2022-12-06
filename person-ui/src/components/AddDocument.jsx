import React, { useState } from "react";

import axios from "axios";
import { configuration } from "../configuration";

const AddDocument = (props) => {
  const [formData, setFormData] = useState({
    document_name: "",
    person: "",
    language: "",
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  let documentApi =
    configuration[`${process.env.NODE_ENV}`]?.document?.baseUrl ||
    "http://localhost:4001";
  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(documentApi + "/document/create", {
        document_name: formData.document_name,
        person: props.person.itemId,
        language: props.person.data.language_id + "",
      })
      .then((res) => {
        setMessage("Record entered");
        setDefault();
        props.refreshDocuments();
        props.hideDocument();
      })
      .catch((err) => {
        setMessage(err.message);
        setError(true);
      });
  };
  const hide = () => {
    props.hideDocument();
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
      id="document-modal"
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
              Add a new document
            </h3>
            <form onSubmit={onSubmit} className="space-y-6" action="#">
              <div>
                {/*<label htmlFor="firstName" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>*/}
                <input
                  value={formData.document_name}
                  onChange={onChangeHandler}
                  type="text"
                  name="document_name"
                  id="documentName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Write document name"
                />
              </div>

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
export default AddDocument;
