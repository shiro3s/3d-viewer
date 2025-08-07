import React from "react";

import { useViewer } from "./useViewer";

export const Viewer: React.FC = () => {
	const { viewerRef } = useViewer();

	return <div ref={viewerRef} />;
};
