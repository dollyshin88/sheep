import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';


export default class Balloon {
    constructor(scene) {
        this.group = new Three.Group();
        this.addBalloon();
        this.group.position.set(2000, 0, -4000);
        this.group.scale.set(4,4,4);
        scene.add(this.group);
    }
    
    addBalloon() {
        const mtlLoader = new MTLLoader();
        mtlLoader.load('assets/balloon/balloon.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('assets/balloon/balloon.obj', obj => {
                this.group.add(obj);
            });
        });
    }
    update(){

    }

}