import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LM_EntityName } from "../../../types/Entity/entity"
import { LM_Summary } from "../../../types/summary/summary"
export const summaryAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.environment === "production"
        ? "librimem.com/api/v1"
        : "http://localhost:4000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token")

      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  reducerPath: "summaryAPI",
  endpoints: (build) => ({
    getSummaries: build.query<
      LM_Summary[],
      { entity: LM_EntityName; entityID: string }
    >({
      query: ({ entity, entityID }) => `summary/${entity}/${entityID}`,
    }),
  }),
})

export const { useGetSummariesQuery } = summaryAPI
