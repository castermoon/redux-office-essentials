import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await client.get('/fakeApi/users')
	return response.data
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			//这里并没有修改state，而是返回了action的payload，而也是一种修改state的方法，原来的state
			//会被替换为返回值。
			return action.payload
		})
	}
})

export default usersSlice.reducer
