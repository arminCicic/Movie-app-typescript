import React, { FC, useState, createContext } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Content from "./Pages/Content";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Modal from "./Components/Modal/Modal";

//This means this functional component is of type FC (funcitonal component).

interface AppContextInterface {
  searchContent: Array<{
    key: number;
    id: number;
    poster_path: string;
    title: string;
    name: string;
    media_type: string;
    vote_average: number;
    overview: string;
  }>;
  setSearchContent: Function;
  searchText: string;
  setSearchText: Function;
  search: boolean;
  setSearch: Function;
  fetchSearch: Function;
  typeOfSearch: string;
  setTypeOfSearch: Function;
  toggleModal: Function;
  setIndividualMovieInfo: Function;
}

export const AppContext = createContext<AppContextInterface>(null);

const App: FC = () => {
  const [typeOfSearch, setTypeOfSearch] = useState<string>("");

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${typeOfSearch}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`
      );
      setSearchContent(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const [searchContent, setSearchContent] = useState<any>();
  const [searchText, setSearchText] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [individualMovieInfo, setIndividualMovieInfo] = useState<any>({});

  const toggleModal = () => setShow(!show);

  const contextValue: AppContextInterface = {
    searchContent: searchContent,
    setSearchContent: setSearchContent,
    searchText: searchText,
    setSearchText: setSearchText,
    search: search,
    setSearch: setSearch,
    fetchSearch: fetchSearch,
    typeOfSearch: typeOfSearch,
    setTypeOfSearch: setTypeOfSearch,
    toggleModal: toggleModal,
    setIndividualMovieInfo,
  };

  return (
    <div className="app">
      <Header />
      <Modal
        show={show}
        toggleModal={toggleModal}
        individualMovieInfo={individualMovieInfo}
      />

      <AppContext.Provider value={contextValue}>
        <Content />
      </AppContext.Provider>
    </div>
  );
};

export default App;
