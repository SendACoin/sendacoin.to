import dayjs from 'dayjs';
import { formatImageUrl } from 'libs/helpers';
import ReactMarkdown from 'react-markdown';

const Post = ({ id, image, content, createdAt }) => {
	return (
		<article className="bg-white rounded-lg p-2 mb-1 border">
			{image ? <img className="rounded-lg mb-2" src={formatImageUrl(image)} alt="" /> : null}
			<ReactMarkdown>{content}</ReactMarkdown>

			{createdAt ? <p className="text-sm text-gray-500">{dayjs(createdAt).fromNow()}</p> : null}
		</article>
	);
};

export default Post;
