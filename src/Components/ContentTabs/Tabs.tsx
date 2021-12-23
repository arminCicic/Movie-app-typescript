import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./Tab.css";
import SeriesTab from "./SeriesTab";
import MoviesTab from "./MoviesTab";
import { AppContext } from "../../App";

interface Content {
  key: number;
  id: number;
  poster_path: string;
  title: string;
  name: string;
  media_type: string;
  vote_average: number;
  overview: string;
}

function Tab(_props: any) {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  // const [content, setContent] = useState<Content[]>([]);

  useEffect(() => {
    fetchSearch();
  }, [activeTab]);

  const { setSearchContent, searchText, setSearchText, setSearch } =
    useContext(AppContext);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          activeTab === "tab1" ? "tv" : "movie"
        }?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=1&include_adult=false`
      );
      setSearchContent(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  return (
    <>
      <ul className="nav">
        <li
          className={activeTab === "tab1" ? "active" : ""}
          onClick={handleTab1}
        >
          TV Series
        </li>
        <li
          className={activeTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
        >
          Movies
        </li>
      </ul>
      <input
        type="search"
        placeholder={
          activeTab === "tab1" ? "Search TV Series..." : "Search Movies..."
        }
        className="search"
        minLength={3}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(event.target.value);

          if (event.target.value.length > 2) {
            setTimeout(() => {
              setSearch(true);
              fetchSearch();
            }, 1000);
          } else {
            setSearch(false);
          }
        }}
      ></input>
      <div className="outlet">
        {activeTab === "tab1" ? <SeriesTab /> : <MoviesTab />}
      </div>
    </>
  );
}

Tab.propTypes = {};

export default Tab;
