import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {UpdateModel} from "./seminarsApi.types";



export type Seminar = {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
}


export const seminarsApi = createApi({
    reducerPath: 'seminarsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/"
    }),
    tagTypes: ['seminarsApi'],
    endpoints: builder => ({
        getSeminars: builder.query<Seminar[], void>({
            query: () => 'seminars',
            providesTags: ['seminarsApi']
        }),
        removeSeminars: builder.mutation<Seminar[], number>({
            query: (seminarId) => ({
                method: "DELETE",
                url: `seminars/${seminarId}`
            }),
            invalidatesTags: ['seminarsApi']
        }),
        updateSeminar: builder.mutation<Seminar[], { model: UpdateModel }>({
            query: ({model}) => ({
                method: "PUT",
                url: `seminars/${model.id}`,
                body: model
            }),
            invalidatesTags: ['seminarsApi']
        })
    })
})

export const {useGetSeminarsQuery, useRemoveSeminarsMutation, useUpdateSeminarMutation} = seminarsApi