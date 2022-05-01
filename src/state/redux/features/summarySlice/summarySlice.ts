import {LM_Summary} from "../../../../types/summary/summary"
import {LM_EntityName} from "../../../../types/Entity/entity";
import Summary from "../../../../classes/base/Summary"
import {nanoid} from "nanoid";
import {createAsyncThunk, createSlice, Slice} from "@reduxjs/toolkit"
import axios from "axios"


interface InitialSummaryState {
  summaries: {
    summaries: {
      [id: string]: LM_Summary;
    } | null;
    error: string | null;
    loading: boolean;
    amountOfSummaries: number;
  },
  selectedSummary: LM_Summary | null;
  newSummary: LM_Summary;
}

const initialSummaryState: InitialSummaryState = {
  summaries: {
    summaries: null,
    error: null,
    loading: false,
    amountOfSummaries: 0
  },
  selectedSummary: null,
  newSummary: new Summary(nanoid(), "", "BOOK")
}

export const fetchSummariesBackend = createAsyncThunk("summary/fetchSummariesBackend", async ( type: LM_EntityName): Promise<LM_Summary[]>  => {

  const api = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? `http://${process.env.BACKEND_IP_DEVELOPMENT}/api/v1` :`http://${process.env.BACKEND_IP_PRODUCTION}/api/v1`, headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  })  

  const summaries = await api.get(`/summary/${type}`)

  return summaries.data;
})

export const summarySlice: Slice<InitialSummaryState> = createSlice({
  name: "summaries",
  initialState: initialSummaryState,
  reducers: {
    addSummary: (state, action) => {

    },
    deleteSummary: (state, action) => {

    },
    updateSummary: (state, action) => {

    },
    changeSelectedSummary: (state, action) => {

    },
    renewNewSummary: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSummariesBackend.pending, (state,action) => {
      state.summaries.loading =true;
    }), 
      builder.addCase(fetchSummariesBackend.fulfilled, (state, action) => {
        const summaries = action.payload;

        if (!state.summaries.summaries) state.summaries.summaries = {};

        summaries.forEach((summary) => {
          //@ts-ignore
          if(!state.summaries.summaries[summary.summary_id]) {
          //@ts-ignore
          state.summaries.summaries[summary.summary_id] = summary
          }

        })

      }),
      builder.addCase(fetchSummariesBackend.rejected, (state,action) => {
        state.summaries.error = action.payload as string;
        state.summaries.loading =false
      })
  
}
})

export const {addSummary, deleteSummary, updateSummary, renewNewSummary, changeSelectedSummary} = summarySlice.actions;

