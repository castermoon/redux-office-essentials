import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from "../../api/client";

const initialState = {
	posts: [],
	status: 'idle',   //idle表示未开始
	error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await client.get('http://localhost:3000/mock/post.json')
	return response.data
})

export const addNewPost = createAsyncThunk(
	'posts/addNewPost',
	// The payload creator receives the partial `{title, content, user}` object
	async initialPost => {
		// We send the initial data to the fake API server
		const response = await client.post('/fakeApi/posts', initialPost)
		// The response includes the complete post object, including unique ID
		return response.data
	}
)


const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.posts.push(action.payload)
			},
			prepare(title, content,userId) {
				return {
					payload: {
						id: nanoid(),
						date: new Date().toISOString(),
						title,
						content,
						user: userId,
						reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
					}
				}
			}
		},
		postUpdated(state, action) {
			const { id, title, content } = action.payload
			const existingPost = state.posts.find(post => post.id === id)
			if (existingPost) {
				existingPost.title = title
				existingPost.content = content
			}
		},
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload
			const existingPost = state.posts.find(post => post.id === postId)
			if (existingPost) {
				existingPost.reactions[reaction]++
			}
		}
	},
	extraReducers: {
		[fetchPosts.pending.type]: (state) => {
			state.status = 'loading'
		},
		[fetchPosts.fulfilled.type]: (state, action) => {
			state.status = 'succeeded'
			// Add any fetched posts to the array
			state.posts = state.posts.concat(action.payload.posts)
		},
		[fetchPosts.rejected.type]: (state, action) => {
			state.status = 'failed'
			state.error = action.error.message
		},
		[addNewPost.rejected.type]: (state, action) => {
			// We can directly add the new post object to our posts array
			state.posts.push(action.payload)
		},
	}
})

export const { postAdded, postUpdated,reactionAdded } = postsSlice.actions


export default postsSlice.reducer

//获取所有帖子
export const selectAllPosts = state => state.posts.posts

//获取指定ID的帖子
export const selectPostById = (state, postId) =>
	state.posts.posts.find(post => post.id === postId)




