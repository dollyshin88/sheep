import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';


class Tree {
    constructor() {
        this.group = new Three.Group();
        this.addForestGroup(-100, -3500, Math.random()*Math.PI);
        this.addForestGroup(-1000, -2000, Math.random() * Math.PI);
        this.addForestGroup(-3200, -1000, Math.random() * Math.PI);
        this.addForestGroup(-3500, 0, Math.random() * Math.PI);
        this.addForestGroup(-3500, 2000, Math.random() * Math.PI);


        this.addForestGroup(-3000, -3000, Math.random()*Math.PI);
        this.addForestGroup(100, -1000, Math.random()*Math.PI);
        this.addForestGroup(1000, -2000, Math.random()*Math.PI);
        this.addForestGroup(3000, -2200, Math.random()*Math.PI);
        this.addForestGroup(4000, 0, Math.random()*Math.PI);
        this.addForestGroup(4000, 1000, Math.random()*Math.PI);
        this.addForestGroup(4000, 2000, Math.random()*Math.PI);
    }
    
    addForestGroup(xoffset, zoffset, yrotation) {
        const mtlLoader = new MTLLoader();
        mtlLoader.load('../../assets/forest_bunch.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('../../assets/forest_bunch.obj', obj => {
                obj.rotateX(-1.5708);
                obj.rotateZ(yrotation);
                obj.scale.set(5, 5, 5);
                obj.position.set(xoffset, 0, zoffset);
                this.group.add(obj);
            });
        });
    }
    
   
    // //cube object for testing ================
    // // const geometryBox = new Three.BoxGeometry(1000,1000,1000);
    // // const materialMeshLambert = new Three.MeshLambertMaterial( { color: 0xFF6633 });
    // // const tree = new Three.Mesh(geometryBox, materialMeshLambert);
    // // tree.position.set(0,-2000,0);
    // // scene.add(tree);
    // //========================================
}
export default Tree;