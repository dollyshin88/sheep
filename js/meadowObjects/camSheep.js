import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default class Cloud {
    constructor(type) {
        this.group = new Three.Group();
        // this.group.rotateY(Math.PI/2);

        this.collidedSheep;
        this.collidedItem; 

        this.addCamSheep();
        this.addBox();
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
    addBox() {
        const geometryBox = new Three.IcosahedronGeometry(35,1);
        const materialMeshLambert = new Three.MeshLambertMaterial();
        const box = new Three.Mesh(geometryBox, materialMeshLambert);
        box.position.set(0,35,0);
        box.visible = true;
        box.name = 'box';
        this.group.add(box);
    }
    walkForwardHelper(xrotation, yrotation) {
        

        if (xrotation < 0 && yrotation >= 0 && yrotation <= Math.PI/2) {
            this.group.position.x += 5 * Math.cos(this.group.rotation.y);
            this.group.position.z += 5 * Math.sin(this.group.rotation.y);
        } else if (xrotation < 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x -= 5 * Math.tan(this.group.rotation.y);
            this.group.position.z += 5 * Math.tan(this.group.rotation.y);
        } else if (xrotation === 0 && yrotation >= 0 && yrotation <= Math.PI/2) {
            this.group.position.x -= 5 * Math.cos(this.group.rotation.y);
            this.group.position.z += 5 * Math.sin(this.group.rotation.y);
        } else if (xrotation === 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x -= 5 * Math.cos(this.group.rotation.y);
            this.group.position.z += 5 * Math.sin(this.group.rotation.y);
        } else if (xrotation > 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x += 5 * Math.cos(this.group.rotation.y);
            this.group.position.z += 5 * Math.sin(this.group.rotation.y);
        }
        
    }
    walkBackwardHelper(xrotation, yrotation) {
        if (xrotation < 0 && yrotation >= 0 && yrotation <= Math.PI/2) {
            this.group.position.x -= 5 * Math.cos(this.group.rotation.y);
            this.group.position.z -= 5 * Math.sin(this.group.rotation.y);
        } else if (xrotation < 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x += 5 * Math.tan(this.group.rotation.y);
            this.group.position.z -= 5 * Math.tan(this.group.rotation.y);
        } else if (xrotation === 0 && yrotation >= 0 && yrotation <= Math.PI/2) {
            this.group.position.x += 5 * Math.cos(this.group.rotation.y);
            this.group.position.z -= 5 * Math.sin(this.group.rotation.y);
        } else if (xrotation === 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x += 5 * Math.cos(this.group.rotation.y);
            this.group.position.z -= 5 * Math.sin(this.group.rotation.y);
        } else if (xrotation > 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x -= 5 * Math.cos(this.group.rotation.y);
            this.group.position.z -= 5 * Math.sin(this.group.rotation.y);
        }
    }

    collisionDetect(originPoint, scene, sheeps, items){

        let sheepbox = scene.getObjectByName('box');
        for (var vertexIndex = 0; vertexIndex < sheepbox.geometry.vertices.length; vertexIndex++){
            var localVertex = sheepbox.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(sheepbox.matrix);
            // var directionVector = globalVertex.sub(this.rocketShip.position);
            var directionVector = globalVertex.sub(this.group.position);

            var ray = new Three.Raycaster(
                originPoint, directionVector.clone().normalize(), 70, 85);
            // return collidable list --- maybe save as instance var
            const intersectsSheep = ray.intersectObjects(sheeps, true);
            const intersectsItems = ray.intersectObjects(items, true);

            if (intersectsSheep.length > 0) {
                debugger
                for (let i = 0; i < sheeps.length; i++) {
                    if (intersectsSheep[0].object.parent.parent === sheeps[i]) {
                    this.collidedSheep = sheeps[i];
                    break;
                    }
                }
            }
            if (intersectsItems.length > 0) {
                for (let i = 0; i < items.length; i++) {
                    if (intersectsItems[0].object.parent.parent === items[i]) {
                    this.collidedItem = items[i];
                    break;
                    }
                }
            }
            
            // this.collidedSheep =
            //     ray.intersectObjects(sheeps, true);
            // this.collidedItem =
            //     ray.intersectObjects(items, true);

            
        }
    }
    walk(eventKey, scene, sheeps, items) {
        let originPos = { x: this.group.position.x, y: this.group.position.y, z: this.group.position.z };
        let updatedPositionPoint;
        switch (eventKey) {
            case 'upArrow':
                this.walkForwardHelper(this.group.rotation.x, this.group.rotation.y);
                updatedPositionPoint = new Three.Vector3(this.group.position.x, this.group.position.y, this.group.position.z);

                //check if moving to the new position causes collision
                this.collisionDetect(updatedPositionPoint, scene, sheeps, items);
                if (this.collidedSheep) {
                    //if collided with a sheep, stay put
                    this.group.position.set(originPos.x, originPos.y, originPos.z);
                    console.log('oof!');
                } 
                if (this.collidedItem) {
                    //if collided with an item, eat the item;
                    this.collidedItem.visible = false;
                    console.log('ooo yumm');
                }
                break;
                
            case 'rightArrow':
                this.group.rotateY(-Math.PI/48);
                break;
            case 'downArrow':
                this.walkBackwardHelper(this.group.rotation.x, this.group.rotation.y);

                updatedPositionPoint = new Three.Vector3(this.group.position.x, this.group.position.y, this.group.position.z);
                //check if moving to the new position causes collision
                this.collisionDetect(updatedPositionPoint, scene, sheeps, items);
                if (this.collidedSheep) {
                    //if collided with a sheep, stay put
                    this.group.position.set(originPos.x, originPos.y, originPos.z);
                    console.log('oof!');
                } 
                if (this.collidedItem) {
                    //if collided with an item, eat the item;
                    this.collidedItem.visible = false;
                    console.log('ooo yumm');
                }
                break;
            case 'leftArrow':
                this.group.rotateY(Math.PI/48)
                break;

            case 'none':
                updatedPositionPoint = new Three.Vector3(this.group.position.x, this.group.position.y, this.group.position.z);

                //check if moving to the new position causes collision
                this.collisionDetect(updatedPositionPoint, scene, sheeps, items);
                if (this.collidedSheep) {
                    //if collided with a sheep, stay put
                    this.group.position.y += 50;
                    // setTimeout(()=> {
                    //     this.group.position.y -= 50;
                    // }, 100);
                    console.log('none - oof!');
                } 
                else if (this.collidedItem) {
                    //if collided with an item, eat the item;
                    this.collidedItem.visible = false;
                    console.log('none - ooo yumm');
                }
                else {
                    this.group.position.y = 0;
                }
                break;
            default:
                break;
        }
        this.collidedItem = undefined;
        this.collidedSheep = undefined;

    }



}