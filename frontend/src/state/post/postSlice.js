// import { createSlice } from '@reduxjs/toolkit';
// import { fetchPosts } from './postApi';

// export const postsSlice = createSlice({
// 	name: 'posts',
// 	initialState: {
// 		posts: [],
// 		status: 'idle',
// 		error: null,
// 		alert: 'default',
// 	},
// 	reducers: {
// 		// synchronous requests made to the store are handled HERE!
// 	},
// 	extraReducers(builder) {
// 		// asynchronous requests made to the store are handled HERE!
// 		builder
// 			.addCase(fetchPosts.pending, (state, action) => {
// 				state.status = 'loading';
// 			})
// 			.addCase(fetchPosts.fulfilled, (state, action) => {
// 				state.status = 'succeeded';
// 				state.alert = 'Posted Loaded';
// 				state.posts = state.posts.concat(action.payload);
// 			})
// 			.addCase(fetchPosts.rejected, (state, action) => {
// 				state.status = 'failed';
// 				state.alert = 'Failed to Load Posts';
// 				state.error = action.payload;
// 			});
// 	},
// });

// export default postsSlice.reducer;

// Import the `RTK` Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our single API slice object
export const apiSlice = createApi({
	// We can add a single tag called 'Post' to our API slice that will let us automatically refetch our getPosts endpoint any time we add a new post:
	// The cache reducer expects to be added at `state.api` (already default - this is optional)
	reducerPath: 'api',
	// All of our requests will have URLs starting with '/fakeApi'
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com',
	}),
	tagTypes: ['Post'],
	// The "endpoints" represent operations and requests for this server
	endpoints: builder => ({
		// The `getPosts` endpoint is a "query" operation that returns data
		getPosts: builder.query({
			query: () => '/posts',
			providesTags: (result = [], error, arg) => [
				'Post',
				...result.map(({ id }) => ({ type: 'Post', id })),
			],
		}),
		getPost: builder.query({
			query: postId => `/posts/${postId}`,
			providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
		}),
		addNewPost: builder.mutation({
			query: initialPost => ({
				url: '/posts',
				method: 'POST',
				body: initialPost,
			}),
			invalidatesTags: ['Post'],
		}),
		editPost: builder.mutation({
			query: post => ({
				url: `posts/${post.id}`,
				method: 'PATCH',
				body: post,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: 'Post', id: arg.id },
			],
		}),
	}),
});

// Export the auto-generated hook for the `getPost` query endpoint
export const {
	useGetPostsQuery,
	useGetPostQuery,
	useAddNewPostMutation,
	useEditPostMutation,
} = apiSlice;
