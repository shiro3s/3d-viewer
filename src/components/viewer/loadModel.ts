import { Group, LoadingManager, Object3DEventMap } from "three";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const MANAGER = new LoadingManager();
const DRACO_LOADER = new DRACOLoader(MANAGER).setDecoderPath("./draco/");

export const loadModel = (file: File) => {
	const fileURL = URL.createObjectURL(file);

	return new Promise<Group<Object3DEventMap>>((resolve, reject) => {
		const loader = new GLTFLoader(MANAGER)
			.setCrossOrigin("anonymous")
			.setDRACOLoader(DRACO_LOADER)
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
