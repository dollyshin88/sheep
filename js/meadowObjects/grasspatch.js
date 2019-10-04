import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default class Grasspatch{
    constructor(x, y, z) {
        this.group = new Three.Group();
        this.addGrassPatch(x, y, z);
    }

    addGrassPatch(x, y, z) {
        const mtlLoader = new MTLLoader();
            mtlLoader.load('../../assets/grass/grasspatch.mtl', materials => {
                materials.preload();
                const objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load('../../assets/grass/grasspatch.obj', obj => {
                    // obj.rotateX(-1.5708);
                    // obj.rotateZ(yrotation);
                    // obj.scale.set(5, 5, 5);
                    // obj.position.set(xoffset, 0, zoffset);
                    obj.position.set(x, y, z);
                    obj.scale.set(6, 6, 6);
                    this.group.add(obj);
                });
        });

    }
}

