import { LM_Summary } from "../../../../types/summary/summary"
import { LM_EntityName } from "../../../../types/Entity/entity"
import Summary from "../../../../classes/base/Summary"
import { nanoid } from "nanoid"
import {
  createAsyncThunk,
  createSlice,
  Slice,
  PayloadAction,
} from "@reduxjs/toolkit"
import axios from "axios"
import { summaryAPI } from "../../queries/summaryQueries"

interface InitialSummaryState {
  summaries: {
    summaries: {
      [id: string]: LM_Summary
    }
    error: string | null
    loading: boolean
    amountOfSummaries: number
  }
  selection: {
    selectedSummary: LM_Summary | null
    isSelectingSummary: boolean
  }
  new: {
    newSummary: LM_Summary
    IsAddingNewSummary: boolean
  }
  filter: {
    isFilteringSummaries: boolean
    filteredSummaries: LM_Summary[]
  }
}

const initialSummaryState: InitialSummaryState = {
  summaries: {
    summaries: {},
    error: null,
    loading: false,
    amountOfSummaries: 0,
  },
  selection: {
    selectedSummary: null,
    isSelectingSummary: false,
  },
  new: {
    newSummary: new Summary(nanoid(), "", "BOOK"),
    IsAddingNewSummary: false,
  },
  filter: {
    isFilteringSummaries: false,
    filteredSummaries: [],
  },
}

export const fetchSummariesBackend = createAsyncThunk(
  "summary/fetchSummariesBackend",
  async (type: LM_EntityName): Promise<LM_Summary[]> => {
    const api = axios.create({
      baseURL:
        process.env.NODE_ENV === "development"
          ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api/v1`
          : `http://${process.env.BACKEND_IP_PRODUCTION}/api/v1`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    })

    const summaries = await api.get(`/summary/${type}`)

    return summaries.data
  }
)

export const summarySlice: Slice<InitialSummaryState> = createSlice({
  name: "summaries",
  initialState: initialSummaryState,
  reducers: {
    addSummary: (
      state: InitialSummaryState,
      action: PayloadAction<LM_Summary>
    ) => {
      state.summaries.summaries[action.payload.summary_id] = action.payload
    },
    deleteSummary: (
      state: InitialSummaryState,
      action: PayloadAction<LM_Summary>
    ) => {
      state.summaries.summaries[action.payload.summary_id] = action.payload
    },
    updateSummary: (state, action) => {},
    updateSelectedSummary: (state, action) => {},
    updateNewSummary: (state, action) => {},
    toggleIsSelectingSummary: (
      state: InitialSummaryState,
      action: PayloadAction<void>
    ) => {
      state.selection.isSelectingSummary = !state.selection.isSelectingSummary
    },
    toggleIsAddingNewSummary: (
      state: InitialSummaryState,
      action: PayloadAction<void>
    ) => {
      state.new.IsAddingNewSummary = !state.new.IsAddingNewSummary
    },
    toggleIsFilteringSummaries: (
      state: InitialSummaryState,
      action: PayloadAction<void>
    ) => {
      state.filter.isFilteringSummaries = !state.filter.isFilteringSummaries
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSummariesBackend.pending, (state, action) => {
      state.summaries.loading = true
    }),
      builder.addCase(fetchSummariesBackend.fulfilled, (state, action) => {
        const summaries = action.payload

        if (!state.summaries.summaries) state.summaries.summaries = {}

        summaries.forEach((summary) => {
          //@ts-ignore
          if (!state.summaries.summaries[summary.summary_id]) {
            //@ts-ignore
            state.summaries.summaries[summary.summary_id] = summary
          }
        })
      }),
      builder.addCase(fetchSummariesBackend.rejected, (state, action) => {
        state.summaries.error = action.payload as string
        state.summaries.loading = false
      }),
      builder.addMatcher(
        summaryAPI.endpoints.getSummaries.matchFulfilled,
        (state: InitialSummaryState, action: PayloadAction<LM_Summary[]>) => {
          const summaries = action.payload
          summaries.forEach((s) => {
            state.summaries.summaries[s.summary_id] = s
          })
        }
      )
  },
})

export const {
  addSummary,
  deleteSummary,
  updateSummary,
  renewNewSummary,
  changeSelectedSummary,
} = summarySlice.actions

export default summarySlice.reducer
