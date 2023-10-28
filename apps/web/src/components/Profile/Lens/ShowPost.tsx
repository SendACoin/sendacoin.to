import { useQuery } from 'urql';
import { GetPosts } from 'graphql/queries';
import React, { useEffect, useState } from 'react';
import { isEmpty } from 'libs/helpers';
import Post from '../PostCard';

const ShowPost = ({ id }) => {
	const [posts, setPost] = useState([]);
	const [result] = useQuery({
		query: GetPosts,
		variables: {
			id: id,
			limit: 10,
		},
	});

	useEffect(() => {
		if (result && result.data && result.data.publications) {
			setPost(result.data.publications.items);
		}
	}, [result]);

	return (
		<>
			{isEmpty(posts) ? (
				<p className="text-gray-500 text-center text-sm">user doesn{"'"}t have a post yet!</p>
			) : null}

			{posts.map((post) => (
				<Post
					key={post.id}
					id={post.id}
					image={post.metadata?.media[0]?.original?.url}
					content={post.metadata.content}
					createdAt={post.createdAt}
				/>
			))}
		</>
	);
};

export default ShowPost;
