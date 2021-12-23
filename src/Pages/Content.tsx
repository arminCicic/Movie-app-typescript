import { useEffect, useState } from "react";
import axios from "axios";
import { SingleContent } from "../Components/SingleContent/SingleContent";
import Tabs from "../Components/ContentTabs/Tabs";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");

  const [searchContent, setSearchContent] = useState<any>();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=1&include_adult=false`
      );
      setSearchContent(data.results);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type]);

  return (
    <>
      <span className="pageTitle">Discover TV Series and Movies</span>
      <Tabs />

      {type ? (
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
        <div className="movies">
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
      )}
    </>
  );
};

export default Search;
