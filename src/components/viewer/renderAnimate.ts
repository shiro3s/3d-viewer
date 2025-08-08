import { State } from "./types";

export const renderAnimate = ({
	renderer,
	scene,
	camera,
	controller,
}: State) => {
	const animate = () => {
		if (!renderer || !scene || !camera || !controller) return;

		controller.update();
		renderer.render(scene, camera);
	};

	return {
		animate,
	};
};
