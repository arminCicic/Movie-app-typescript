import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  const handleClick = () => {
    window.scroll(0, 0);
  };

  return (
    <>
      <span onClick={handleClick} className="header">
        <FontAwesomeIcon className="icon" icon={faFilm}></FontAwesomeIcon>
        Cinephilia
        <FontAwesomeIcon className="icon" icon={faFilm}></FontAwesomeIcon>
      </span>
    </>
  );
};

export default Header;
