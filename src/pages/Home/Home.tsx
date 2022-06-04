import React, { LegacyRef, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
// @ts-ignore
import summaryImage from "../../assets/images/summaries.jpg"
// @ts-ignore
import flashcardImage from "../../assets/images/flashcards.jpg"
// @ts-ignore
import noteImage from "../../assets/images/notes.jpg"
// @ts-ignore
import bookImage from "../../assets/images/books.jpg"
import { gsap } from "gsap"
import { fileURLToPath } from "url"

type Props = {}

const Home = (props: Props) => {
  const navigate = useNavigate()

  const textIntro = (elem: any) => {
    gsap.from(elem, {
      xPercent: -20,
      opacity: 0,
      stagger: 0.2,
      duration: 2,
      scale: -1,
      ease: "back",
    })
  }

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
      imageName: "books.jpg",
    },
    {
      title: "Add Flashcards",
      text: "You surely will have to repeat what you have learnt. With LibriMem you can create flashcards and train yourself.",
      image: flashcardImage,
      imageName: "flashcards.jpg",
    },
    {
      title: "Write Summaries",
      text: "You really comprehended what read? Then write a summary and bring the most important points together.",
      image: summaryImage,
    },
    {
      title: "Take Notes",
      text: "We always forget something. Take a note and make your future self a favor.",
      image: noteImage,
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

  const authenticateRef = useRef(null)

  useEffect(() => {
    gsap.from(".lm-home__section", { duration: 1, x: "-100%" })
  }, [])

  return (
    <div className="lm-home ">
      {/* <div className="home__authenticate">
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
      </div> */}
      <div className="lm-home__intro">
        <p>
          Reading is more than just speaking out the content of a scripture such
          in a book. Along with reading comes comprehension. Reading a book can
          be complicated sometimes. LibriMem is an app where you can engage in
          the process of learning.
        </p>
        <p>
          With demanding texts such as technical books it is not enough to just
          read them. You will have to "interact" with what you have read to
          really grasp it.{" "}
        </p>
      </div>
      <div className="section-divider"></div>
      <div className="lm-home__features">
        {features.map((feature, index) => {
          return (
            <>
              <div
                className={`lm-home__section${index} lm-home__section`}
                style={{
                  backgroundImage: `url(${feature.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  zIndex: "0",
                }}
              >
                <div className="content-container">
                  <h1 className="title">{feature.title}</h1>
                  <p className="text">{feature.text}</p>
                </div>
                {/* <div className="image">
                  <img src={feature.image} alt="title" />
                </div> */}
              </div>
              <div className="section-divider"></div>
            </>
          )
        })}
      </div>

      {/* ANCHOR Action to login */}
    </div>
  )
}

export default Home
