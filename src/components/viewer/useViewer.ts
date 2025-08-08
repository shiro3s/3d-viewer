import { useEffect, useRef } from "react";
import {
	AmbientLight,
	Box3,
	Color,
	Group,
	HemisphereLight,
	LinearToneMapping,
	LoadingManager,
	Object3DEventMap,
	PerspectiveCamera,
	PMREMGenerator,
	Scene,
	Texture,
	Vector3,
	WebGLRenderer,
} from "three";
import {
	GLTFLoader,
	OrbitControls,
	RoomEnvironment,
} from "three/examples/jsm/Addons.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

type Args = {
	file: File;
};

const fov = (0.8 * 180) / Math.PI;
const MANAGER = new LoadingManager();

type State = {
	aspect: number;
	camera: PerspectiveCamera | null;
	scene: Scene | null;
	renderer: WebGLRenderer | null;
	pmremGenerator: PMREMGenerator | null;
	controller: OrbitControls | null;
	neutralEnvironment: Texture | null;
};

export const useViewer = ({ file }: Args) => {
	const viewerRef = useRef<HTMLCanvasElement>(null);

	const stateRef = useRef<State>({
		aspect: 0,
		camera: null,
		scene: null,
		renderer: null,
		pmremGenerator: null,
		controller: null,
		neutralEnvironment: null,
	});

	useEffect(() => {
		const el = viewerRef.current;
		if (!el) return;

		const loadModel = (file: File) => {
			const fileURL = URL.createObjectURL(file);
			return new Promise<Group<Object3DEventMap>>((resolve, reject) => {
				const loader = new GLTFLoader(MANAGER)
					.setCrossOrigin("anonymous")
					.setMeshoptDecoder(MeshoptDecoder);

				loader.load(
					fileURL,
					(gltf) => {
						const model = gltf.scene || gltf.scenes?.[0];

						URL.revokeObjectURL(fileURL);
						resolve(model);
					},
					undefined,
					reject,
				);
			});
		};

		const { clientWidth, clientHeight } = el;

		stateRef.current.scene = new Scene();
		stateRef.current.scene.background = new Color("#191919");

		stateRef.current.aspect = clientWidth / clientHeight;
		stateRef.current.camera = new PerspectiveCamera(
			fov,
			stateRef.current.aspect,
			0.01,
			1000,
		);
		stateRef.current.scene.add(stateRef.current.camera);

		stateRef.current.renderer = new WebGLRenderer({
			antialias: true,
			canvas: el,
		});
		stateRef.current.renderer.shadowMap.enabled = true;
		stateRef.current.renderer.setSize(clientWidth, clientHeight);
		stateRef.current.renderer.setClearColor(0xccc);
		stateRef.current.renderer.setPixelRatio(window.devicePixelRatio);

		stateRef.current.pmremGenerator = new PMREMGenerator(
			stateRef.current.renderer,
		);
		stateRef.current.pmremGenerator.compileEquirectangularShader();
		stateRef.current.neutralEnvironment =
			stateRef.current.pmremGenerator.fromScene(new RoomEnvironment()).texture;

		stateRef.current.controller = new OrbitControls(
			stateRef.current.camera,
			stateRef.current.renderer.domElement,
		);
		stateRef.current.controller.screenSpacePanning = true;

		stateRef.current.renderer.toneMapping = LinearToneMapping;
		stateRef.current.renderer.toneMappingExposure = 2 ** 0.0;

    stateRef.current.scene.environment = stateRef.current.neutralEnvironment

		const hemiLight = new HemisphereLight();
		stateRef.current.scene.add(hemiLight);

		const ambientLight = new AmbientLight(0xffffff, 0.3);
		stateRef.current.scene.add(ambientLight);

		loadModel(file).then((model) => {
			model.updateMatrixWorld();

      console.log(model);

			const box = new Box3().setFromObject(model);
			const size = box.getSize(new Vector3()).length();
			const center = box.getCenter(new Vector3());

			stateRef.current.controller?.reset();

			model.position.x -= center.x;
			model.position.y -= center.y;
			model.position.z -= center.z;

			if (stateRef.current.controller)
				stateRef.current.controller.maxDistance = size * 10;

			if (stateRef.current.camera) {
				stateRef.current.camera.near = size / 100;
				stateRef.current.camera.far = size * 100;
				stateRef.current.camera.updateProjectionMatrix();

				stateRef.current.camera.position.copy(center);
				stateRef.current.camera.position.x += size / 2.0;
				stateRef.current.camera.position.y += size / 5.0;
				stateRef.current.camera.position.z += size / 2.0;
				stateRef.current.camera.lookAt(center);
			}

			stateRef.current.scene?.add(model);
		});

		const animate = () => {
			const { renderer, scene, camera, controller } = stateRef.current;
			if (!renderer || !scene || !camera || !controller) return;

			controller.update();
			renderer.render(scene, camera);
		};

		stateRef.current.renderer.setAnimationLoop(animate);
	}, [file]);

	return {
		viewerRef,
	};
};
