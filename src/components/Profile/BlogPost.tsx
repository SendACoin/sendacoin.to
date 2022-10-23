import { createClient } from '@urql/core';
import dayjs from 'dayjs';
import { GetBlogPost } from 'graphql/queries';
import { isEmpty } from 'libs/helpers';
import { useEffect, useState } from 'react';

const client = createClient({
	url: 'https://arweave.net/graphql',
});

const Post = ({ postId }) => {
	const [post, setPost] = useState(null);

	useEffect(() => {
		if (postId) {
			fetch(`https://arweave.net/${postId}`)
				.then((res) => res.json())
				.then((res) => setPost(res));
		}
	}, [postId]);

	if (post === null) return null;

	return (
		<div className="border bg-white rounded-lg p-2">
			<p className="text-gray-900 mb-2">{post.content.title}</p>
			<p className="text-sm text-gray-500">{post.content.body}</p>
		</div>
	);
};

const BlogPost = ({ address }) => {
	const [posts, setPosts] = useState([]);

	client
		.query(GetBlogPost, { address: [address] })
		.toPromise()
		.then((result) => {
			setPosts(result.data.transactions.edges);
		});

	return (
		<div>
			{isEmpty(posts) ? <p className="text-gray-500 text-center text-sm">No blog posts found!</p> : null}
			{posts.map((post) => (
				<Post key={post.node.id} postId={post.node.id} />
			))}
		</div>
	);
};

export default BlogPost;
