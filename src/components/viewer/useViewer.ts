import { useEffect, useRef } from "react";

import { getViewerState } from "./getViewerState";
import { loadModel } from "./loadModel";
import { renderAnimate } from "./renderAnimate";
import { setModelPosition } from "./setModelPosition";
import { State } from "./types";

type Args = {
	file: File;
};

export const useViewer = ({ file }: Args) => {
	const viewerRef = useRef<HTMLCanvasElement>(null);
	const stateRef = useRef<State>({
		camera: null,
		scene: null,
		renderer: null,
		controller: null,
	});

	useEffect(() => {
		const el = viewerRef.current;

		if (el) {
			stateRef.current = getViewerState(el);
			const { animate } = renderAnimate(stateRef.current);

			loadModel(file)
				.then((model) => {
					setModelPosition(model, stateRef.current);
				})
				.catch((err) => {
					console.log(err);
				});

			stateRef.current.renderer?.setAnimationLoop(animate);

			const handleResize = () => {
				stateRef.current.camera?.updateProjectionMatrix();
			};

			el.addEventListener("resize", handleResize);
			return () => {
				el.removeEventListener("resize", handleResize);
			};
		}
	}, [file]);

	return {
		viewerRef,
	};
};
