import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';


class Diamond {
    constructor(loadingManager) {
        this.group = new Three.Group();
        this.loadingManager = loadingManager;
        this.addDiamond();
        this.group.position.set(Math.random() * (4000 + 4000) - 4000, 0, Math.random() * (4000 + 4000) - 4000);
        this.group.scale.set(5, 5, 5);
    }

    addDiamond() {
        const mtlLoader = new MTLLoader(this.loadingManager);
        mtlLoader.load('../../assets/diamond/diamond.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader(this.loadingManager);
            objLoader.setMaterials(materials);
            objLoader.load('../../assets/diamond/diamond.obj', obj => {
                obj.position.set(0,0,0);
                this.group.add(obj);
            });
        });
    }

    rotate() {
        this.group.rotation.y += 0.03;
    }


}
export default Diamond;