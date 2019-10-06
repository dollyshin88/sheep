import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default class Item{
    constructor(type, loadingManager) {
        this.group = new Three.Group();
        this.addItem(type);
        this.addBox();
        this.loadingManager = loadingManager;
    }
    
    addBox() {
        const geometryBox = new Three.BoxGeometry(20,20,20);
        const materialMeshLambert = new Three.MeshLambertMaterial();
        const box = new Three.Mesh(geometryBox, materialMeshLambert);
        box.position.set(0,8,0);
        // box.visible = false;
        this.group.add(box);
    }
 
    addItem(type) {
        const mtlLoader = new MTLLoader(this.loadingManager);
        if (type === 'apple') {
            mtlLoader.load('../../assets/items/apple.mtl', materials => {
                materials.preload();
                const objLoader = new OBJLoader(this.loadingManager);
                objLoader.setMaterials(materials);
                objLoader.load('../../assets/items/apple.obj', obj => {

                    obj.position.set(Math.random()*(3000+3000)-3000, 0, Math.random()*(3000+2000)-2000);
                    obj.scale.set(0.5, 0.5, 0.5);
                    this.group.add(obj);
                });
            });
        }

        if (type === 'banana') {
            mtlLoader.load('../../assets/items/banana.mtl', materials => {
                materials.preload();
                const objLoader = new OBJLoader(this.loadingManager);
                objLoader.setMaterials(materials);
                objLoader.load('../../assets/items/banana.obj', obj => {

                    obj.position.set(Math.random()*(3000+3000)-3000, 0, Math.random()*(3000+2000)-2000);
                    obj.scale.set(0.5, 0.5, 0.5);
                    this.group.add(obj);
                });
            });
        }

        if (type === 'redMushroom') {
            mtlLoader.load('../../assets/items/red_mushroom.mtl', materials => {
                materials.preload();
                const objLoader = new OBJLoader(this.loadingManager);
                objLoader.setMaterials(materials);
                objLoader.load('../../assets/items/red_mushroom.obj', obj => {

                    obj.position.set(Math.random()*(3000+3000)-3000, 0, Math.random()*(3000+2000)-2000);
                    obj.scale.set(0.5, 0.5, 0.5);
                    this.group.add(obj);
                });
            });
        }

        if (type === 'yellowMushroom') {
            mtlLoader.load('../../assets/items/yellow_mushroom.mtl', materials => {
                materials.preload();
                const objLoader = new OBJLoader(this.loadingManager);
                objLoader.setMaterials(materials);
                objLoader.load('../../assets/items/yellow_mushroom.obj', obj => {

                    obj.position.set(Math.random()*(3000+3000)-3000, 0, Math.random()*(3000+2000)-2000);
                    obj.scale.set(0.7, 0.7, 0.7);
                    this.group.add(obj);
                });
            });
        }

    }
}

