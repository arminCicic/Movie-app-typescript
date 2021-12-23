import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "./Tab.css";
import { SingleContent } from "../SingleContent/SingleContent";
import { AppContext } from "../../App";

const Series = () => {
  const [content, setContent] = useState<any[]>([]);

  const { searchContent, setSearchContent, searchText, search } =
    useContext(AppContext);

  // const [searchContent, setSearchContent] = useState<any[]>([]);
  // const [searchText, setSearchText] = useState<string>("");
  // const [search, setSearch] = useState<boolean>(false);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    setContent(data.results);
    // setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {search ? (
        <div className="series">
          {searchContent &&
            searchContent
              .slice(0, 10)
              .map((c) => (
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  media_type="tv"
                  vote_average={c.vote_average}
                  overview={c.overview}
                />
              ))}
        </div>
      ) : (
        <div className="series">
          {content &&
            content
              .slice(0, 10)
              .map((c) => (
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  media_type="tv"
                  vote_average={c.vote_average}
                  overview={c.overview}
                />
              ))}
        </div>
      )}
    </>
  );
};

export default Series;
