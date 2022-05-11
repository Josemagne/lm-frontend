import React from "react"

type Props = {}

/**
 * Shows meta information
 * @param props
 * @returns
 */
const AboutPage = (props: Props) => {
  const sections = [
    {
      title: "So Much Information",
      text: "In todays world we are bombarded with a lot of information.",
    },
  ]
  return (
    <div className="lm-about lm-page">
      {/* TODO Contact */}
      {/* HOW */}
      <div className="about__section">
        <div className="about__section__title">
          <h3>So Much Information</h3>
        </div>
        <div className="about__section__text">
          <p>In todays world we are bombarded with a lot of information.</p>
        </div>
      </div>
      {}
      {/* -->  */}
      {/* WHY */}
      {/* WHAT does it give */}
      {/* --> track your books */}
      {/* -->  */}
      {/* TOOLS */}
      {/* --> Lead to jaime-jose.xyz/... */}
      {/* How can the user contact me? */}
      {/* Add: syntomera address */}
    </div>
  )
}

export default AboutPage
