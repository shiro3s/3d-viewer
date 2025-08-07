import React from "react";
import styles from "./style.module.css";
import { useViewer } from "./useViewer";

interface Props {
	file: File;
}

export const Viewer: React.FC<Props> = ({ file }) => {
	const { viewerRef } = useViewer({ file });

	return <canvas ref={viewerRef} className={styles.container} />;
};
