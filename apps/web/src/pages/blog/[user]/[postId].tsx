import PageTitle from 'components/Layout/PageTitle';
import { ethers } from 'ethers';
import { shortenAddress } from 'libs/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
	const [post, setPost] = useState(null);
	const router = useRouter();
	const postId = router.query.postId;

	useEffect(() => {
		if (postId) {
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
				<h1 className="text-gray-900 font-medium text-3xl pt-5">{post.content.title}</h1>
				<div className="mb-2 text-sm text-gray-500 mt-2">
					by{' '}
					{ethers.utils.isAddress(router.query.user as string)
						? shortenAddress(router.query.user)
						: router.query.user}
				</div>
				<div className="text-xl leading-10 blog_post font-medium mb-10">
					<ReactMarkdown>{post.content.body}</ReactMarkdown>
				</div>

				<Link
					href={`/${router.query.user}`}
					passHref
					className="text-gray-500 block mt-5 pt-3 text-sm cursor-pointer hover:text-gray-900 border-t w-full"
				>
					Back to profile
				</Link>
			</div>
		</>
	);
};

export default BlogPost;
