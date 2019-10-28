import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';


export default class Zigzag {
    constructor(scene) {
        this.group = new Three.Group();
        this.addZigzag();
        this.group.position.set(3000, 0, 1000);
        this.group.scale.set(1,1,1);
        this.group.rotateX(-Math.PI/2);
        scene.add(this.group);
    }
    
    addZigzag() {
        const mtlLoader = new MTLLoader();
        mtlLoader.load('assets/zigzag/zigzag.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('assets/zigzag/zigzag.obj', obj => {
                this.group.add(obj);
            });
        });
    }
    update(){

    }

}