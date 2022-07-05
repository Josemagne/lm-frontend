import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LM_Character } from '../../../types/character';
import { LM_EntityName } from '../../../types/Entity/entity';

export const characterAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl:
            process.env.environment === "production" ? "librimem/api/v1" : "http://localhost:4000/api/v1",
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("token")

            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }

            return headers;
        }
    }),
    reducerPath: "characterAPI",
    endpoints: (build) => ({
        getCharacters: build.query<LM_Character[], { entity: LM_EntityName; entityID: string }>({
            query: ({ entity, entityID }) => `character/${entity}/${entityID}`
        }),
        addCharacter: build.mutation<LM_Character, LM_Character>({
            query: (body) => ({
                url: `note/${body.entity}/${body.entity_id}`,
                method: "POST",
                body
            })
        })
    })
})