import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { setCredientials, setLogout } from "../../auth/authSlice"
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL || process.env.API_BASE_URL || "http://chatverse-server:4000/api/v1";


const baseQuery = fetchBaseQuery({
    baseUrl: apiBaseUrl,
    // baseUrl: "http://192.168.29.187:4000/api/v1",
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        const token = getState().auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401) {
        console.log('sending refresh token')
        const refreshResult: any = await baseQuery('/users/refresh-token', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const state: any = api?.getState?.() as any
            const user: any = state?.auth?.user
            if (user) {
                api.dispatch(setCredientials({ data: { accessToken: (refreshResult as any)?.data?.data?.accessToken, user } } as any))
            }
            result = await baseQuery(args, api, extraOptions)
        }
        else {
            console.log("Looged out")
            api.dispatch(setLogout())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
    tagTypes: ["User", "Chat", "Message", "Group"]
})