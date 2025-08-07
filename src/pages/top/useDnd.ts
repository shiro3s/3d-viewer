import { useCallback, useRef } from "react";

export const useDnd = () => {
	const dropzoneRef = useRef<HTMLDivElement>(null);
	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const files = event.dataTransfer.files;

		const file = files?.[0]
		if (!file) return
		console.log(file);
	}, []);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		const file = files?.[0];
		if (!file) return


	}, [])

	return {
		dropzoneRef,
		handleDragOver,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
		handleChange
	};
};
