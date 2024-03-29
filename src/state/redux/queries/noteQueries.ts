import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LM_Entity, LM_EntityName } from "../../../types/Entity/entity"
import { LM_Note } from "../../../types/Note/note"

export const noteAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.environment === "production"
        ? "librimem.com/api/v1/"
        : "http://localhost:4000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token")

      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  reducerPath: "noteAPI",
  endpoints: (build) => ({
    /**
     * Gets all
     */
    getNotes: build.query<
      LM_Note[],
      { entity: LM_EntityName; entityID: string }
    >({
      query: ({ entity, entityID }) => `note/${entity}/${entityID}`,
    }),
    getNote: build.query<
      LM_Note,
      { entity: LM_EntityName; entityID: string; noteID: string }
    >({
      query: ({ entity, entityID, noteID }) => `note/${entityID}/${noteID}`,
    }),
    addNote: build.mutation<LM_Note, LM_Note>({
      query: (body) => ({
        url: `note/${body.entity}/${body.entity_id}/${body.note_id}`,
        method: "POST",
        body,
      }),
    }),
    updateNote: build.mutation<void, LM_Note>({
      query: (body) => ({
        url: `note/${body.entity}/${body.entity_id}/${body.note_id}`,
        method: "POST",
        body: body,
      }),
    }),
    deleteNote: build.mutation<
      { result: boolean },
      { entity: LM_EntityName; entityID: string; noteID: string }
    >({
      query({ entity, entityID, noteID }) {
        return {
          url: `note/${entity}/${entityID}/${noteID}`,
          method: "DELETE",
        }
      },
    }),
  }),
})

export const {
  useGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useGetNotesQuery,
} = noteAPI
