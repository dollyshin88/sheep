import * as THREE from 'three';
import Example from './meadowObjects/example';
import Lighting from './meadowObjects/lighting';

// Meadow is the highest level component that is responsible for creating the overall scene
// It creates scene, renderer, camera and all of the objects that should be visible on the scene
function Meadow(canvas) {
    const clock = new THREE.Clock();

    const sceneDemensions = { 
        width: canvas.width,
        height: canvas.height
    }

    this.scene = buildScene();
     this.renderer = buildRender(sceneDemensions);
     this.camera = buildCamera(sceneDemensions);
    const sceneObjects = createSceneObjects(this.scene);
    // const raycaster = new THREE.Raycaster();
    // const mouse = new THREE.Vector2();

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#fff');

        return scene; 
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        // learning note: gamma is the measure of contrast -brightness of the midtone values- produced by a device
        renderer.gammaInput = true;
        renderer.gammaOutput = true; 
        renderer.gammaFactor = 2.2;
        //texture.encoding = THREE.sRGBEncoding
        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width/height;
        const fieldOfView = 55;
        const nearPlane = 1;
        const farPlane = 1000;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(0,0,20);
        return camera;
    }

    function createSceneObjects(scene) {
        
        const sceneObjects = [
            new Example(scene),
            new Lighting(scene)
        ];

        return sceneObjects;
    }

    // Public methods
    this.update = () => {
        // const elapsedTime = clock.getElapsedTime();
        for (let i = 0; i < sceneObjects.length; i++) {
            sceneObjects[i].update();
            this.renderer.render(this.scene, this.camera);
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

    // this.onMouseClick = (event) => {
    //     event.preventDefault();
    //     mouse.x = (event.clientX / window.innerWidth) * 2 -1;
    //     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
    //     raycaster.setFromCamera(mouse, camera);
    //     const intersects = raycaster.intersectObjects(scene.children, true);
        
    //     for(let i=0; i<intersects.length; i++) {
    //         intersects[i].object.material.color.set(0xff0000)
    //     }
    // }
    

   

}

export default Meadow;