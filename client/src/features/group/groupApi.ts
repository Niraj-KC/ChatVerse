import { apiSlice } from "./../chat/api/apiSlice";

export const groupApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addAdmins: builder.mutation<any, any>({
            query: (formData: any) => {
                return {
                    url: '/groups/add-admins',
                    method: "POST",
                    body: formData,
                    formData: true
                }
            },
            invalidatesTags: ["Chat", "Group"]
        }),
        renameGroupChat: builder.mutation<any, any>({
            query: (formData: any) => {
                return {
                    url: "/groups/rename-group",
                    method: "POST",
                    body: formData,
                    formData: true,
                }
            },
            invalidatesTags:["Chat","Group"]
        }),
        updateGroupAvatar: builder.mutation<any, any>({
            query: (payload: any) => {
                const { formData, chatId } = payload as any
                const formDataBody = new FormData()
                Object.keys(formData as any).forEach((key: any) => {
                    formDataBody.append(key as any, (formData as any)[key])
                })
                return {
                    url: `/groups/update-group-avatar/${chatId}`,
                    method: "PATCH",
                    body: formDataBody,
                    formData: true,
                }
            }
        })
    })
})

export const { useAddAdminsMutation, useRenameGroupChatMutation, useUpdateGroupAvatarMutation } = groupApi