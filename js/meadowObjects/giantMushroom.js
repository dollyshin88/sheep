import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';


class GiantMushroom {
    constructor(loadingManager) {
        this.group = new Three.Group();
        this.loadingManager = loadingManager;
        this.addGiantMushroom();
        this.group.scale.set(10, 10, 10);
        this.group.position.set(-2000, 0, 4000);
    }

    addGiantMushroom() {
        const mtlLoader = new MTLLoader(this.loadingManager);
        mtlLoader.load('assets/giant_mushroom/giant_mushroom.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader(this.loadingManager);
            objLoader.setMaterials(materials);
            objLoader.load('assets/giant_mushroom/giant_mushroom.obj', obj => {
                obj.position.set(0,0,0);
                this.group.add(obj);
            });
        });
    }

}
export default GiantMushroom;