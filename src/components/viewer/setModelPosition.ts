import { Box3, Group, Object3DEventMap, Vector3 } from "three";
import { State } from "./types";

export const setModelPosition = (
	model: Group<Object3DEventMap>,
	state: State,
) => {
	model.updateMatrixWorld();
	const box = new Box3().setFromObject(model);
	const size = box.getSize(new Vector3()).length();
	const center = box.getCenter(new Vector3());

	state.controller?.reset();

	model.position.x -= center.x;
	model.position.y -= center.y;
	model.position.z -= center.z;

	if (state.controller) state.controller.maxDistance = size * 10;

	if (state.camera) {
		state.camera.near = size / 100;
		state.camera.far = size * 100;
		state.camera.updateProjectionMatrix();

		state.camera.position.copy(center);
		state.camera.position.x = 0.3;
		state.camera.position.y += size / 6.0;
		state.camera.position.z += size / 2.0;
		state.camera.lookAt(center);
	}

  state.controller?.saveState()
	state.scene?.add(model);
};
