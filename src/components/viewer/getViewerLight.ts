import { AmbientLight, HemisphereLight } from "three";


export const getViewerLight = () => {
	const hemiLight = new HemisphereLight();

	const ambientLight = new AmbientLight();

	return {
		hemiLight,
		ambientLight,
	};
};
