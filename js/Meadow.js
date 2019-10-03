import * as Three from 'three';
import Skybox from './meadowObjects/skybox';
import Lighting from './meadowObjects/lighting';
import Plane from './meadowObjects/plane';
// import Tree from './meadowObjects/tree';
// import Sheep from './meadowObjects/sheep';
// Meadow is the highest level component that is responsible for creating the overall scene
// It creates scene, renderer, camera and all of the objects that should be visible on the scene
function Meadow(canvas) {
    const clock = new Three.Clock();

    const sceneDemensions = { 
        width: canvas.width,
        height: canvas.height
    }

    this.scene = buildScene();
     this.renderer = buildRender(sceneDemensions);
     this.camera = buildCamera(sceneDemensions);
    const sceneObjects = createSceneObjects(this.scene);
    // const raycaster = new Three.Raycaster();
    // const mouse = new Three.Vector2();

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
        // learning note: gamma is the measure of contrast -brightness of the midtone values- produced by a device
        renderer.gammaInput = true;
        renderer.gammaOutput = true; 
        renderer.gammaFactor = 2.2;
        //texture.encoding = Three.sRGBEncoding
        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width/height;
        const fieldOfView = 55;
        const nearPlane = 1;
        const farPlane = 100000;
        const camera = new Three.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(0, 500, 5500);
        return camera;
    }

    function createSceneObjects(scene) {
        // const sheep = new Sheep(scene);
        // scene.add(sheep.group);
        const sceneObjects = [
            // new Skybox(scene),
            new Lighting(scene),
            new Plane(scene),
            // new Tree(scene)
        ];

        return sceneObjects;
    }

    // Public methods
    this.update = () => {
        // const elapsedTime = clock.getElapsedTime();
        
        for (let i = 0; i < sceneObjects.length; i++) {
            
            sceneObjects[i].update();
            // this.renderer.render(this.scene, this.camera);
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