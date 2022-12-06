import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import AddPerson from "../components/AddPerson";
import axios from "axios";
import { configuration } from "../configuration";
import Loader from "../components/Loader";
import DocumentTable from "../components/DocumentTable";
import AddDocument from "../components/AddDocument";

const Home = () => {
  let personApi =
    configuration[`${process.env.NODE_ENV}`]?.person?.baseUrl ||
    "http://localhost:4000";
  let documentApi =
    configuration[`${process.env.NODE_ENV}`]?.document?.baseUrl ||
    "http://localhost:4001";
  const documentColumns = [
    { name: "id", key: "id" },
    { name: "Document name", key: "name" },
  ];
  const personTableColumns = [
    { name: "id", key: "id" },
    { name: "name", key: "name" },
    { name: "person_country", key: "country" },
    { name: "person_language", key: "language" },
    { name: "birthDate", key: "birthdate" },
    { name: "telephone", key: "telephone" },
  ];
  const [addPerson, showAddPerson] = useState(false);
  const [addDocument, showDocumentModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [documentLoader, setDocumentLoader] = useState(false);
  const [languages, setLanguages] = useState(null);
  const [countries, setCountries] = useState(null);
  const [persons, setPersons] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(personApi + "/person/all"),
      axios.get(personApi + "/countries/all"),
      axios.get(documentApi + "/languages/all"),
    ])
      .then((response) => {
        response.forEach((res) => {
          if (res.data.languages) {
            let languages = res.data.languages.map((item) => {
              return {
                itemId: "" + item.id + "",
                data: item.language_name,
              };
            });
            setLanguages(languages);
          } else if (res.data.countries) {
            let countries = res.data.countries.map((item) => {
              return {
                itemId: "" + item.id + "",
                data: item.country_name,
              };
            });
            setCountries(countries);
          } else {
            let persons = res.data.items.map((item) => {
              return {
                itemId: "" + item.id + "",
                data: item,
              };
            });
            setPersons(persons);
          }
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (languages && persons && countries) {
      setLoaded(true);
    }
  }, [languages, countries, persons]);
  const hidePerson = () => {
    showAddPerson(false);
  };
  const showAddPersonHandler = () => {
    showAddPerson(true);
  };
  const hideDocumentModal = () => {
    showDocumentModal(false);
  };
  const refreshDocuments = () => {
    setDocumentLoader(true);

    axios
      .post(documentApi + "/documents", { person: person.itemId })
      .then((response) => {
        setDocuments(response.data.items);
        setDocumentLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setDocumentLoader(false);
      });
  };
  const refreshPersons = () => {
    setLoaded(false);
    axios
      .get(personApi + "/person/all")
      .then((response) => {
        let persons = response.data.items.map((item) => {
          return {
            itemId: "" + item.id + "",
            data: item,
          };
        });
        setPersons(persons);
        setLoaded(true);
        showAddPerson(false);
      })
      .catch((err) => {
        setLoaded(false);
      });
  };
  const personClick = (row, event) => {
    setDocumentLoader(true);

    axios
      .post(documentApi + "/documents", { person: row.itemId })
      .then((response) => {
        setDocuments(response.data.items);
        setDocumentLoader(false);
        setPerson(row);
      })
      .catch((err) => {
        console.log(err);
        setDocumentLoader(false);
      });
  };
  return (
    <div className="flex flex-col">
      {addPerson && (
        <AddPerson
          refreshPersons={refreshPersons}
          languages={languages}
          countries={countries}
          hide={hidePerson}
        />
      )}
      {addDocument && (
        <AddDocument
          person={person}
          refreshDocuments={refreshDocuments}
          hideDocument={hideDocumentModal}
        />
      )}
      {loaded ? (
        <div className="person w-3/4 mx-auto mt-12 flex flex-col">
          <div className="inline-block">
            <h1 className="text-gray-200 text-3xl text-left float-left">
              Person table
            </h1>
            <button
              onClick={showAddPersonHandler}
              style={{ background: "#a516a59c" }}
              className={"rounded-full float-right text-white px-4 py-2"}
            >
              Add person
            </button>
          </div>

          {persons && persons.length ? (
            <Table
              personClicked={personClick}
              columns={personTableColumns}
              data={persons}
            />
          ) : (
            <h3 className={"text-2xl text-white"}>No user found!</h3>
          )}
        </div>
      ) : (
        <Loader />
      )}
      {documentLoader ? (
        <Loader />
      ) : (
        <div className="person w-3/4 mx-auto mt-24 flex flex-col">
          {person && (
            <div className="inline-block">
              <h1 className="text-gray-200 text-3xl text-left float-left">
                Document table of{" "}
                <b style={{ color: "green" }} className={"text-3xl"}>
                  {person.data.name}
                </b>{" "}
                with id {person.itemId}
              </h1>
              <button
                onClick={() => showDocumentModal(true)}
                style={{ background: "#a516a59c" }}
                className={"rounded-full float-right text-white px-4 py-2"}
              >
                Add document
              </button>
            </div>
          )}
          {documents && documents.length ? (
            <DocumentTable columns={documentColumns} data={documents} />
          ) : (
            <h3 className={"text-2xl text-white"}>
              No documents found for the user!
            </h3>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;
