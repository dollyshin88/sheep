import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default class Cloud {
    constructor(type, loadingManager) {
        this.group = new Three.Group();
        this.loadingManager = loadingManager;

        this.cloud = this.addCloud(
            (Math.random() * (5000 - (-5000)) -5000), 
            Math.random() * (3000 - (-3000)) -3000, 
            type
        );
    }
    addCloud(xoffset, zoffset, type) {
        const mtlLoader = new MTLLoader(this.loadingManager);
        mtlLoader.load(`assets/cloud/${type}.mtl`, materials => {
            materials.preload();
            const objLoader = new OBJLoader(this.loadingManager);
            objLoader.setMaterials(materials);
            objLoader.load(`assets/cloud/${type}.obj`, obj => {
                obj.rotateX(-1.5708);
                obj.position.set(xoffset, 1500, zoffset);
                obj.scale.set(10,10,10);
                this.group.add(obj);
            });
        });
    }
}