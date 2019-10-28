import * as Three from 'three';
import Lighting from './meadowObjects/lighting';
import Plane from './meadowObjects/plane';
import Tent from './meadowObjects/tent';
import Zigzag from './meadowObjects/zigzag';
import Balloon from './meadowObjects/balloon';

// Meadow is the highest level component that is responsible for creating the overall scene
// It creates scene, renderer, and camera 

function Meadow(canvas) {
    const sceneDemensions = { 
        width: canvas.width,
        height: canvas.height
    }

    this.scene = buildScene();
    this.renderer = buildRender(sceneDemensions);
    this.camera = buildCamera(sceneDemensions);
    const sceneObjects = createSceneObjects(this.scene);

    function buildScene() {
        const scene = new Three.Scene();
        scene.background = new Three.Color('#96c7ff');
        return scene; 
    }

    function buildRender({ width, height }) {
        const renderer = new Three.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 
        renderer.gammaFactor = 2.2;
        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width/height;
        const fieldOfView = 55;
        const nearPlane = 1;
        const farPlane = 100000;
        const camera = new Three.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        // camera.position.set(0, 500, 4500);
        return camera;
    }

    function createSceneObjects(scene) {
        const sceneObjects = [
            new Lighting(scene),
            new Plane(scene),
            new Tent(scene),
            new Zigzag(scene),
            new Balloon(scene),
        ];
        return sceneObjects;
    }

    // Public methods
    this.update = () => {
        for (let i = 0; i < sceneObjects.length; i++) {
            sceneObjects[i].update();
        }
    };

    this.onWindowResize = () => {
        const { width, height } = canvas;

        sceneDemensions.width = width;
        sceneDemensions.height = height;

        this.camera.aspect = width/height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };
}

export default Meadow;