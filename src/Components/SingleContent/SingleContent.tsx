import React, { useContext } from "react";
import { img_300, unavailable } from "../../configuration";
import "./SingleContent.css";
import { AppContext } from "../../App";

interface Props {
  key: number;
  id: number;
  poster: string;
  title: string;
  media_type: string;
  vote_average: number;
  overview: string;
}

//Instead of using "props" i could destructure the properties (eg. {poster, title, date}...).

function getClassByRate(vote_average: number) {
  if (vote_average >= 8) {
    return "green";
  } else if (vote_average >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

export const SingleContent = (props: Props) => {
  const { toggleModal, setIndividualMovieInfo } = useContext(AppContext);

  const colectMovieInfoAndOpenModal = () => {
    setIndividualMovieInfo(props);
    toggleModal();
  };

  return (
    <div className="movie" onClick={() => colectMovieInfoAndOpenModal()}>
      <img
        src={props.poster ? `${img_300}/${props.poster}` : unavailable}
        alt={props.title}
      />

      <div className="movie-info">
        <h3>{props.title}</h3>
        <span className={`${getClassByRate(props.vote_average)}`}>
          {props.vote_average}
        </span>
      </div>
      <div className="overview">
        <h3>Overview</h3>
        {props.overview}
      </div>
    </div>
  );
};

//Also, if I want to define this component to be a functional component, after importing {FC} from "react", I have to write it like this ------->

//export const SingleContent: FC<Props> = ({poster,title,media_type,date}) => {...rest of the code}

// export default SingleContent;

//About the image --> Whenever we display an image from movidb we have to append it to this string (image links from the configuration file).
