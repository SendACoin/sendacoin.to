import toast from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Card from 'components/Layout/Card';
import { Table } from '@mantine/core';
import PageTitle from 'components/Layout/PageTitle';

const EmbedOptions = [
	{
		property: 'data-button-color',
		description: `Set the colour of the widget button. Eg: #333`,
		type: 'hex code',
	},
	{
		property: 'data-hide-bubble',
		description: `Hide the widget bubble`,
		type: 'boolean',
	},
	{
		property: 'data-hide-donate-text',
		description: `Hide the donate text`,
		type: 'boolean',
	},
	{
		property: 'data-donate-text',
		description: `Text for the donation button`,
		type: 'string',
	},
	{
		property: 'data-icon',
		description: `Icon on the widget. You can specify crypto currency symbol. Eg: ETH`,
		type: 'string',
	},
];

export const CodeBlock = ({ code }) => {
	return (
		<>
			<CopyToClipboard text={'#FFC546'} onCopy={() => toast.success('Code Copied')}>
				<code className="block mb-5 bg-gray-800 rounded text-gray-300 p-2 text-sm">{code}</code>
			</CopyToClipboard>
		</>
	);
};

const Embed = () => {
	return (
		<Card title="Embed">
			<PageTitle title="Embed Widget" />
			<div className="mt-5">
				<p className="mb-5">Include javascript code on your HTML page</p>
				<CodeBlock
					code={`<script type="text/javascript" src="https://sendacoin.to/embed.js" data-username="Your_Lens_Handle"></script>`}
				></CodeBlock>

				<h5 className="font-medium mb-4">Options</h5>

				<Table striped>
					<tbody>
						{EmbedOptions.map((option) => (
							<tr key={option.property}>
								<td>
									{option.property}
									<span className="border ml-2 px-1 py-.5 text-xs border-gray-400 rounded text-gray-500">
										{option.type}
									</span>
								</td>
								<td>{option.description}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</Card>
	);
};

export default Embed;
