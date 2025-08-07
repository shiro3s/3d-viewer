import { Upload } from "lucide-react";
import React from "react";

import styles from "./style.module.css";
import { useDnd } from "./useDnd";

export const TopPage: React.FC = () => {
	const {
		dropzoneRef,
		handleDragOver,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
    handleChange
	} = useDnd();

	return (
		<div
			className={styles.container}
			ref={dropzoneRef}
			onDragOver={handleDragOver}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<div className={styles.placeholder}>
				<p className={styles.text}>Drag file or folder here</p>
			</div>
			<div>
				<label htmlFor="inputFile" className={styles.label}>
					<input 
            type="file" 
            id="inputFile"
            className={styles.inputFile}
            onChange={handleChange}
          />
					<Upload />
					<span>Choose file</span>
				</label>
			</div>
		</div>
	);
};
