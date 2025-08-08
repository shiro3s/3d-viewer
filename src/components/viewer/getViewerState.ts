import {
	Color,
	LinearToneMapping,
	PerspectiveCamera,
	PMREMGenerator,
	Scene,
	WebGLRenderer,
} from "three";
import { OrbitControls, RoomEnvironment } from "three/examples/jsm/Addons.js";

const fov = (0.8 * 180) / Math.PI;

export const getViewerState = (el: HTMLCanvasElement) => {
	const { clientWidth, clientHeight } = el;
	const aspect = clientWidth / clientHeight;

	// camera
	const camera = new PerspectiveCamera(fov, aspect, 0.01, 1000);

	// renderer
	const renderer = new WebGLRenderer({ antialias: true, canvas: el });
	renderer.setClearColor("#ccc");
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.toneMapping = LinearToneMapping;
	renderer.toneMappingExposure = 2;

	// controller
	const controller = new OrbitControls(camera, renderer.domElement);
	controller.screenSpacePanning = true;

	// pmremGenerator
	const pmremGenerator = new PMREMGenerator(renderer);
	pmremGenerator.compileEquirectangularShader();

	// neutralEnvironment
	const neutralEnvironment = pmremGenerator.fromScene(
		new RoomEnvironment(),
	).texture;

	// scene
	const scene = new Scene();
	scene.background = new Color("#191919");
	scene.environment = neutralEnvironment;

	return {
		scene,
		camera,
		renderer,
		controller,
	};
};
