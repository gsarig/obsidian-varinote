import React from 'react';

// Define the Notice component
const Notice = ({ message, visible }: { message: string; visible: boolean }) => (
	<div className={`notice ${visible ? 'show' : ''}`}>
		{message}
	</div>
);

export default Notice;
