import PageTitle from 'components/Layout/PageTitle';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
	const [post, setPost] = useState(null);
	const router = useRouter();
	const postId = router.query.postId;

	useEffect(() => {
		if (postId) {
			console.log(`https://arweave.net/${postId}`);
			fetch(`https://arweave.net/${postId}`)
				.then((res) => res.json())
				.then((res) => setPost(res));
		}
	}, [postId]);

	if (post === null) return null;

	return (
		<>
			<div className="mx-auto max-w-screen-lg px-1 md:px-4 sm:px-6 relative pb-10">
				<PageTitle title={post.content.title} />
				<h1 className="text-gray-900 mb-2 font-medium text-3xl pt-5 pb-5">{post.content.title}</h1>

				<div className="text-xl leading-10 blog_post font-medium">
					<ReactMarkdown>{post.content.body}</ReactMarkdown>
				</div>
			</div>
		</>
	);
};

export default BlogPost;
