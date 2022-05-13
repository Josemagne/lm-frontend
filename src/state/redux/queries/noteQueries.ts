import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LM_Note } from '../../../types/Note/note';

export const noteAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("token");

            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }

            return headers;
        }
    }),
    reducerPath: "noteAPI",
    endpoints: (build) => ({
        getNotes: build.query<LM_Note[], void>({
            query: () => 'note',
        }),
        getNote: build.query<LM_Note, string>({
            query: (id) => `note/${id}`
        }),
        addNote: build.query<LM_Note, LM_Note>({
            query: (body) => ({
                url: `note/${body.note_id}`,
                method: 'POST',
                body
            })
        }),
        updateNote: build.mutation<void, LM_Note>({
            query: (body) => ({
                url: `note/${body.note_id}`,
                method: "POST",
                body: body
            })
        }),
        deleteNote: build.mutation<{ result: boolean }, string>({
            query(id) {
                return {
                    url: `note/${id}`,
                    method: "DELETE"
                }
            }
        })

    })
})

export const { useGetNoteQuery, useAddNoteQuery, useUpdateNoteMutation, useDeleteNoteMutation, useGetNotesQuery } = noteAPI;