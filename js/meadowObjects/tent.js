import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';


export default class Tent {
    constructor(scene) {
        this.group = new Three.Group();
        this.addTent();
        this.group.position.set(-3000, 0, 1000);
        this.group.scale.set(5,5,5);
        scene.add(this.group);
    }
    
    addTent() {
        const mtlLoader = new MTLLoader();
        mtlLoader.load('assets/tent/tent.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('assets/tent/tent.obj', obj => {
                this.group.add(obj);
            });
        });
    }
    update(){

    }

}