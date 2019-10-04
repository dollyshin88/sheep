import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default class Cloud {
    constructor(type) {
        this.group = new Three.Group();
        // this.group.position.set(0,0,0);
        this.group.rotateY(Math.PI/2);

        this.addCamSheep();
    
    }
    addCamSheep() {
        const mtlLoader = new MTLLoader();
        mtlLoader.load(`../../assets/sheep/camSheep.mtl`, materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(`../../assets/sheep/camSheep.obj`, obj => {
                
                this.group.add(obj);
            });
        });
    }
    walk(eventKey) {
        switch (eventKey) {
            case 'upArrow':
                console.log(this.group.position);
                this.group.position.x -= 5 * Math.cos(this.group.rotation.y);
                this.group.position.z += 5 * Math.sin(this.group.rotation.y);
                console.log(this.group.position);
                break;
            case 'rightArrow':
                console.log(this.group.rotation.y);
                this.group.rotateY(-Math.PI/32);
                console.log(this.group.rotation.y);
                // this.group.position.x -= 5 * Math.cos(this.group.rotation.y);
                // this.group.position.z += 5 * Math.sin(this.group.rotation.y);
                break;
            case 'downArrow':
                this.group.position.x += 5 * Math.cos(this.group.rotation.y);
                this.group.position.z -= 5 * Math.sin(this.group.rotation.y);
                break;
            case 'leftArrow':
                this.group.rotateY(Math.PI/32)
                // this.group.position.x -= 5 * Math.cos(this.group.rotation.y);
                // this.group.position.z += 5 * Math.sin(this.group.rotation.y);
                break;

            default:
                break;
        }

    }



}