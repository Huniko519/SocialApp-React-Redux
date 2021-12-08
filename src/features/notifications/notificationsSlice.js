import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { selectAllPosts } from "../posts/postsSlice";
import { client } from "../../api/client";

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
        const allNotifications = selectAllNotifications(getState())
        const [latestNotifications] = allNotifications
        const latestTimestamp = latestNotifications ? latestNotifications.date : ""
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
        )
        return response.notifications
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        allNotificationsRead(state, action) {
            state.forEach( notification => {
                notification.read = true
            })
        }
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            state.forEach( notification => {
                notification.isNew = !notification.read
            })
            state.push(...action.payload)
            state.sort((a, b) => b.date.localeCompare(a.date))
        }
    }
})

export const { allNotificationsRead } = notificationsSlice.actions
export default notificationsSlice.reducer

export const selectAllNotifications = state => state.notifications