import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';


export default class LeftsideMarker {
    constructor(scene) {
        this.group = new Three.Group();
        this.addMarker();
        this.group.position.set(-3000, 0, 1000);
        this.group.scale.set(5,5,5);
        scene.add(this.group);
    }
    
    addMarker() {
        const mtlLoader = new MTLLoader();
        mtlLoader.load('assets/decals/leftside_shape.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('assets/decals/leftside_shape.obj', obj => {
                this.group.add(obj);
            });
        });
    }
    update(){

    }

}