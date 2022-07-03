import { RootState } from "../store"
import { createSelector } from "@reduxjs/toolkit"
import { LM_Summary } from "../../../types/summary/summary"

const selectSummaries = (store: RootState) =>
  store.summaries.summaries.summaries
export const summariesSelector = createSelector(selectSummaries, (s) => {
  return Object.values(s)
}) as unknown as () => LM_Summary[]
