import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import getMinMax from "../getMinMax"
import useAppSelector from "../../../hooks/useAppSelector"
import { flashcardsSelector } from "../../../state/redux/features/Flashcard/flashcardSlice"
import { LM_Flashcard } from "../../../types/Flashcard/flashcard"

const FlashcardChart = () => {
  const flashcards = useAppSelector(flashcardsSelector) as LM_Flashcard[]
  // const width = useState(400)
  // const height = useState(500)
  // const margin = useState({ top: 50, right: 50, bottom: 50, left: 50 })
  const width = 400
  const height = 500
  const margin = { top: 50, right: 50, bottom: 50, left: 50 }
  const minMax = useState(getMinMax(flashcards))

  useEffect(() => {
    const chart = d3
      .select(".statistics_chart")
      .append("svg")
      .attr("width", width - margin.right - margin.left)
      .attr("height", height - margin.top - margin.bottom)
      .append("g")
      .attr("transform", `transition(${margin.left}, ${margin.top})`)

    const xScale = d3
      .scaleTime()
      // @ts-ignore
      .domain([minMax.xMin, minMax.xMax])
      .range([0, width])

    // @ts-ignore
    const yScale = d3
      .scaleLinear()
      .domain([minMax.yMin, minMax.yMax])
      .range([height, 0])
  }, [])

  return <div className="statistics__chart"></div>
}

export default FlashcardChart
