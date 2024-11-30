import React, {useState, useCallback} from 'react';
import Notice from './Notice';
import {getLabel} from '../utils/getLabel';

// Utility function to copy text to clipboard
const copyToClipboard = (text: string, showNotice: (message: string) => void) => {
	navigator.clipboard.writeText(text).then(() => {
		showNotice(getLabel('copied'));
	});
};

// Define the CodeBlock component
const CodeBlock = ({code}: { code: string }) => {
	const [noticeVisible, setNoticeVisible] = useState(false);
	const [noticeMessage, setNoticeMessage] = useState('');

	// Memoize the showNotice function to prevent unnecessary re-creates
	const showNotice = useCallback((message: string) => {
		setNoticeMessage(message);
		setNoticeVisible(true);
		setTimeout(() => {
			setNoticeVisible(false);
		}, 2000); // Display the notice for 2 seconds
	}, []);

	return (
		<div className="varinote-codeblock">
			<Notice message={noticeMessage} visible={noticeVisible}/>
			<button
				className="varinote-copy-button"
				onClick={() => copyToClipboard(code, showNotice)}>
				{getLabel('copy')}
			</button>
			<pre>
				<code>{code}</code>
			</pre>
		</div>
	);
};

export default CodeBlock;
