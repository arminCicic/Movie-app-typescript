import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./Tab.css";
import { SingleContent } from "../SingleContent/SingleContent";
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

const Movies = () => {
  const [content, setContent] = useState<Content[]>([]);

  const { searchContent, setSearchContent, searchText, search } =
    useContext(AppContext);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    setContent(data.results);
    console.log(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);

    fetchMovies();

    // eslint-disable-next-line
  }, []);

  //

  return (
    <>
      {search ? (
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
                  media_type="movie"
                  vote_average={c.vote_average}
                  overview={c.overview}
                />
              ))}
        </div>
      ) : (
        <div className="movies">
          {content &&
            content
              .slice(0, 10)
              .map((c) => (
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  media_type="movie"
                  vote_average={c.vote_average}
                  overview={c.overview}
                />
              ))}
        </div>
      )}
    </>
  );
};

export default Movies;
