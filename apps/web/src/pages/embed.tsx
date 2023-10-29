import { CodeHighlightTabs } from '@mantine/code-highlight';
import { ColorPicker, Switch, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Card from 'components/Layout/Card';
import PageTitle from 'components/Layout/PageTitle';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';

const EmbedOptions = [
	{
		property: 'data-username',
		description: `Your lens handle`,
		type: 'string',
		required: true,
	},
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
			<CopyToClipboard text={'#FFC546'} onCopy={() => toast('Code Copied')}>
				<code className="block mb-5 bg-gray-800 rounded text-gray-300 p-2 text-sm">{code}</code>
			</CopyToClipboard>
		</>
	);
};

const DemoScript = ({ code }) => {
	return (
		<>
			<Script type="text/javascript" src="https://sendacoin.to/embed.js" {...code.split(' ')}></Script>
		</>
	);
};

const Embed = () => {
	const [generatedValue, setGeneratedValue] = useState('');

	const form = useForm({
		initialValues: {
			'data-username': 'your_handle.lens',
			'data-button-color': null,
			'data-hide-bubble': null,
			'data-hide-donate-text': null,
			'data-donate-text': null,
			'data-icon': null,
		},
	});

	useEffect(() => {
		const generatedValue = Object.keys(form.values)
			.map((key) => {
				if (form.values[key] !== null) return `${key}="${form.values[key]}"`;
			})
			.join()
			.replace(/,/g, ' ')
			.trim();

		setGeneratedValue(generatedValue);
	}, [form.values]);

	return (
		<Card title="Embed">
			<PageTitle title="Embed Widget" />
			<div className="mt-5">
				<p className="mb-5">Include javascript code on your HTML page</p>

				<CodeHighlightTabs
					code={[
						{
							fileName: 'index.html',
							code: `<script type="text/javascript" src="https://sendacoin.to/embed.js" ${generatedValue} ></script>`,
							language: 'html',
						},
					]}
				/>

				<h5 className="font-medium my-4">Options</h5>

				<Table>
					<Table.Tbody>
						{EmbedOptions.map((option) => (
							<Table.Tr key={option.property}>
								<Table.Td>
									{option.property}
									<span className="border ml-2 px-1 py-.5 text-xs border-gray-400 rounded text-gray-500">
										{option.type}
									</span>
								</Table.Td>
								<Table.Td>
									{option.description}. {'  '} {option.required ? '(required field)' : ''}
								</Table.Td>
								<Table.Td>
									{option.type === 'hex code' ? (
										<ColorPicker
											swatchesPerRow={14}
											format="hex"
											onChange={(val) => form.setFieldValue(option.property, val)}
											swatches={[
												'#25262b',
												'#868e96',
												'#fa5252',
												'#e64980',
												'#be4bdb',
												'#7950f2',
												'#4c6ef5',
												'#228be6',
												'#15aabf',
												'#12b886',
												'#40c057',
												'#82c91e',
												'#fab005',
												'#fd7e14',
											]}
										/>
									) : null}

									{option.type === 'boolean' ? (
										<>
											<Switch
												checked={form.values[option.property]}
												onChange={(e) => form.setFieldValue(option.property, e.target.checked)}
											/>
										</>
									) : null}

									{option.type === 'string' ? (
										<TextInput
											value={form.values[option.property] ?? ''}
											onChange={(e) => form.setFieldValue(option.property, e.target.value)}
										/>
									) : null}
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</div>
			{/* <div className="text-gray-500 mt-5 text-right">Click on the bubble to see widget live demo.</div> */}
			{/* <DemoScript code={generatedValue} /> */}
		</Card>
	);
};

export default Embed;
