import {
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export type State = {
	camera: PerspectiveCamera | null;
	scene: Scene | null;
	renderer: WebGLRenderer | null;
	controller: OrbitControls | null;
};
