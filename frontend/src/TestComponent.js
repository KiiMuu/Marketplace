// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPosts } from './state/post/postApi';
import { useGetPostsQuery } from './state/post/postSlice';

const TestComponent = () => {
	// const dispatch = useDispatch();
	// const { status, error, alert, posts } = useSelector(state => state.post);

	// useEffect(() => {
	// 	if (status === 'idle') {
	// 		dispatch(fetchPosts());
	// 	}
	// }, [status, dispatch]);

	// let content;

	// if (status === 'loading') {
	// 	content = 'loading...';
	// } else if (status === 'succeeded') {
	// 	content = posts.map(post => <div key={post.id}>{post.title}</div>);
	// } else if (status === 'failed') {
	// 	content = <div>{error}</div>;
	// }

	const {
		data: posts,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetPostsQuery();

	let content;

	if (isLoading) {
		content = 'loading';
	} else if (isSuccess) {
		content = posts.map(post => <div key={post.id}>{post.title}</div>);
	} else if (isError) {
		content = <div>{error.toString()}</div>;
	}

	return (
		<section>
			<span>{alert}</span>
			<h2>Posts</h2>
			{content}
		</section>
	);
};

export default TestComponent;
