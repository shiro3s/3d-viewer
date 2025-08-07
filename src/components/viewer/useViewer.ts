import { useEffect, useRef } from "react";
import { Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";

type Args = {
	file: File;
};

const fov = (0.8 * 180) / Math.PI;

type State = {
	aspect: number;
	camera: PerspectiveCamera | null;
	scene: Scene | null;
	renderer: WebGLRenderer | null;
};

export const useViewer = ({ file }: Args) => {
	const viewerRef = useRef<HTMLCanvasElement>(null);

	const stateRef = useRef<State>({
		aspect: 0,
		camera: null,
		scene: null,
		renderer: null,
	});

	useEffect(() => {
		const el = viewerRef.current;
		if (!el) return;

    const {clientWidth, clientHeight} = el

    stateRef.current.scene = new Scene()
    stateRef.current.scene.background = new Color("#191919");

    stateRef.current.aspect = clientWidth/ clientHeight;
    stateRef.current.camera = new PerspectiveCamera(fov, stateRef.current.aspect, 0.01, 1000)
    stateRef.current.scene.add(stateRef.current.camera);

		stateRef.current.renderer = new WebGLRenderer({
			antialias: true,
			canvas: el,
		});
    stateRef.current.renderer.shadowMap.enabled = true;
    stateRef.current.renderer.setSize(clientWidth, clientHeight)
		stateRef.current.renderer.setClearColor(0xccc);
		stateRef.current.renderer.setPixelRatio(window.devicePixelRatio);

    const animate = () => {
      const {renderer, scene, camera} = stateRef.current
      if (!renderer || !scene || !camera) return
      
      renderer.render(scene, camera)
    }
    
    stateRef.current.renderer.setAnimationLoop(animate);
	}, []);

	return {
		viewerRef,
	};
};
