import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
// @ts-ignore
import summaryImage from "../../assets/images/summary.png"
import flashcardImage from "../../assets/images/flashcard.svg"
import bookImage from "../../assets/images/book.svg"

type Props = {}

const Home = (props: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/booksviewer", { replace: true })
    }
  }, [])

  const features = [
    {
      title: "Track your books",
      text: "Track the books that you are reading at the moment.",
      image: bookImage,
    },
    {
      title: "Add Flashcards",
      text: "You surely will have to repeat what you have learnt. With LibriMem you can create flashcards and train yourself.",
      image: flashcardImage,
    },
    {
      title: "Write Summaries",
      text: "You really comprehended what read? Then write a summary and bring the most important points together.",
      image: summaryImage,
    },
    // {
    //   title: "Commentaries",
    //   text: "",
    //   image: ""
    // },
    // {
    //   title: "Notes",
    //   text: "",
    //   image: "",
    // },
    // {
    //   title: "Questions",
    //   text: "Sometimes we come along passages where we just don't get a point. Add a question in LM and once you are able to answer it it will be converted into a flashcard.",
    //   image: ""
    // },
    // {
    //   title: "Pictures",
    //   text: "Text alone is boring. Add your own images to compliment your texts.",
    //   image: ""
    // },
    // {
    //   title: "Loanwords",
    //   text: ""
    // },
  ]

  return (
    <div className="lm-home lm-page">
      <div className="lm-home__intro">
        <p>
          Reading a book can be complicated sometimes. LibriMem gives you an app
          where you can engage in the process of learning.
        </p>
        <p>
          With demanding texts such as technical books it not enough to just
          read them. You will have to "interact" with what you have read to
          really grasp it.{" "}
        </p>
      </div>
      <div className="lm-home__features">
        {features.map((feature) => {
          return (
            <>
              <div className="lm-home__section">
                <h3 className="title">{feature.title}</h3>
                <div className="text">
                  <p>{feature.text}</p>
                </div>
                <div className="image">
                  <img src={feature.image} alt="title" />
                </div>
              </div>
              <div className="section-divider"></div>
            </>
          )
        })}
      </div>

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
  )
}

export default Home
