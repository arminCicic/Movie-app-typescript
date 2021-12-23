import React, { useEffect, useRef } from "react";
import "./Modal.css";
import { img_500, unavailable } from "../../configuration/configuration";

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export default function Modal({ show, toggleModal, individualMovieInfo }) {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => toggleModal());

  return (
    <>
      {show ? (
        <div className="modalContainer">
          <div ref={ref} className="modal">
            <button className="close" onClick={() => toggleModal()}>
              X
            </button>

            <div className="image-container">
              {individualMovieInfo.video ? (
                <video width="320" height="240" autoPlay>
                  <source src={individualMovieInfo.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="modal-image"
                  src={
                    individualMovieInfo.poster
                      ? `${img_500}/${individualMovieInfo.poster}`
                      : unavailable
                  }
                />
              )}
            </div>

            <main>{individualMovieInfo.title}</main>
            <p>{individualMovieInfo.overview}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
