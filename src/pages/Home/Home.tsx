import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/booksviewer", { replace: true });
    }
  }, []);
  return (
    <div className="lm-home">
      <div className="lm-home__features">
        <div className="lm-home__section">
          <div className="lm-home__section__books">
            <h3 className="lm-home__section__boooks__title">
              
            </h3>
            <div className="lm-home__section__books__text">
              Keep 
            </div>
            <div className="lm-home__section__books__image">
            </div>

          </div>
        </div>
        <div className="lm-home__section">
          <div className="lm-home__section__flashcards">
            <h3 className="lm-home__section__flashcard__title">
              
            </h3>
            <div className="lm-home__section__flashcard__text">
              Keep 
            </div>
            <div className="lm-home__section__flashcards__image">
            </div>

          </div>
        </div>
      </div>
      {/* ANCHOR Flashcard */}
      {/* Repeat what you've learnt */}
      <div className="lm-home__flashcard">
        <p>You can create flashcards</p>
      </div>

      {/* ANCHOR Summary */}
      {/* Get the gist of what you've learnt */}
      <div className="lm-home__summary">
        <p>You can write summaries for chapters</p>
      </div>

      {/* ANCHOR Commentary */}
      {/* You can write your own commentary. */}

      {/* ANCHOR Statistics */}
      {/* See how you progress */}

      {/* ANCHOR Action to login */}
      {!localStorage.getItem("token") ? (
        <div className="lm-cta-authenticate">
          <div
            className="lm-cta-register"
            onClick={() => navigate("/register", { replace: true })}
          >
            <button type="button" className="btn btn-primary">
              Register
            </button>
          </div>
          <div
            className="lm-cta-login"
            onClick={() => navigate("/login", { replace: true })}
          >
            <button type="button" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
