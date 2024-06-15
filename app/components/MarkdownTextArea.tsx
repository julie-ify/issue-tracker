'use client';
import React, { useMemo } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import type { SimpleMDEReactProps } from 'react-simplemde-editor';

const MarkdownTextArea = () => {
	const autofocusNoSpellcheckerOptions = useMemo(() => {
		return {
			spellChecker: false,
		} as SimpleMDEReactProps['options'];
	}, []);

	return (
		<SimpleMDE
			options={autofocusNoSpellcheckerOptions}
			placeholder="Description"
		/>
	);
};

export default MarkdownTextArea;
