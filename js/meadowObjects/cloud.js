import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default class Cloud {
    constructor(type) {
        this.group = new Three.Group();
        // this.group.position.y = 900;
        // this.group.scale.set(1, 1, 1);

        // const cloudType = ['cloud_type1', 'cloud_type2', 'cloud_type3'];
        this.cloud = this.addCloud(
            (Math.random() * (5000 - (-5000)) -5000), 
            Math.random() * (3000 - (-3000)) -3000, 
            type
        );
        

        // this.group.traverse((part) => {
        //     part.castShadow = true;
        //     part.receiveShadow = true;
        // });
    }
    addCloud(xoffset, zoffset, type) {
        const mtlLoader = new MTLLoader();
        mtlLoader.load(`../../assets/cloud/${type}.mtl`, materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(`../../assets/cloud/${type}.obj`, obj => {
                obj.rotateX(-1.5708);
                obj.position.set(xoffset, 1500, zoffset);
                obj.scale.set(10,10,10);
                this.group.add(obj);
            });
        });
    }

    // bend() {
    //     this.vAngle += 0.08;

    //     this.upperPart.position.y = -Math.cos(this.vAngle) * 0.12;
    //     this.leftPart.position.y = -Math.cos(this.vAngle) * 0.1 - 0.3;
    //     this.rightPart.position.y = -Math.cos(this.vAngle) * 0.1 - 0.3;
    //     this.frontPart.position.y = -Math.cos(this.vAngle) * 0.08 - 0.3;
    //     this.backPart.position.y = -Math.cos(this.vAngle) * 0.08 - 0.3;
    // }
}