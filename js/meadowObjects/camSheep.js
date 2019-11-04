import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default class Cloud {
    constructor(loadingManager) {
        this.group = new Three.Group();
        // this.group.rotateY(-Math.PI/2);

        this.collidedObject;
        this.collidedItem; 
        this.collidedDiamond;
        this.loadingManager = loadingManager;
        this.addCamSheep();
        this.addBox();
        this.group.name = 'camSheep';
        this.collectedDiamonds = 0;
        this.collectedFood = 0;
    }

    addCamSheep() {
        const mtlLoader = new MTLLoader(this.loadingManager);
        mtlLoader.load(`assets/sheep/camSheep_simple.mtl`, materials => {
            materials.preload();
            const objLoader = new OBJLoader(this.loadingManager);
            objLoader.setMaterials(materials);
            objLoader.load(`assets/sheep/camSheep_simple.obj`, obj => {
                
                this.group.add(obj);
            });
        });
    }
    addBox() {
        const geometryBox = new Three.IcosahedronGeometry(70,1);
        const materialMeshLambert = new Three.MeshLambertMaterial();
        const box = new Three.Mesh(geometryBox, materialMeshLambert);
        box.position.set(0,45,10);
        box.rotateY(Math.PI/2);
        box.visible = false;
        box.name = 'box';
        this.group.add(box);
    }

    walkForwardHelper(xrotation, yrotation) {
        if (xrotation < 0 && yrotation >= 0 && yrotation <= Math.PI/2) {
            this.group.position.x += 7 * Math.cos(this.group.rotation.y);
            this.group.position.z += 7 * Math.sin(this.group.rotation.y);
        } else if (xrotation < 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x += 7 * Math.cos(-this.group.rotation.y);
            this.group.position.z -= 7 * Math.sin(-this.group.rotation.y);
        } else if (xrotation === 0 && yrotation >= 0 && yrotation <= Math.PI/2) {
            this.group.position.x -= 7 * Math.cos(this.group.rotation.y);
            this.group.position.z += 7 * Math.sin(this.group.rotation.y);
        } else if (xrotation === 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x -= 7 * Math.cos(this.group.rotation.y);
            this.group.position.z += 7 * Math.sin(this.group.rotation.y);
        } else if (xrotation > 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x += 7 * Math.cos(this.group.rotation.y);
            this.group.position.z += 7 * Math.sin(this.group.rotation.y);
        }
    }

    walkBackwardHelper(xrotation, yrotation) {
        if (xrotation < 0 && yrotation >= 0 && yrotation <= Math.PI/2) {
            this.group.position.x -= 7 * Math.cos(this.group.rotation.y);
            this.group.position.z -= 7 * Math.sin(this.group.rotation.y);
        } else if (xrotation < 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x -= 7 * Math.cos(-this.group.rotation.y);
            this.group.position.z += 7 * Math.sin(-this.group.rotation.y);
        } else if (xrotation === 0 && yrotation >= 0 && yrotation <= Math.PI/2) {
            this.group.position.x += 7 * Math.cos(this.group.rotation.y);
            this.group.position.z -= 7 * Math.sin(this.group.rotation.y);
        } else if (xrotation === 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x += 7 * Math.cos(this.group.rotation.y);
            this.group.position.z -= 7 * Math.sin(this.group.rotation.y);
        } else if (xrotation > 0 && yrotation >= -Math.PI/2 && yrotation < 0) {
            this.group.position.x -= 7 * Math.cos(this.group.rotation.y);
            this.group.position.z -= 7 * Math.sin(this.group.rotation.y);
        }
    }

    collisionDetect(originPoint, scene, collidables, items, diamonds){
        let sheepbox = scene.getObjectByName('box');
        for (var vertexIndex = 0; vertexIndex < sheepbox.geometry.vertices.length; vertexIndex++){
            var localVertex = sheepbox.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(sheepbox.matrix);
            var directionVector = globalVertex.clone().normalize();

            var ray = new Three.Raycaster(
                originPoint, directionVector, 5, 65);
            const intersectsCollidables = ray.intersectObjects(collidables, true);
            const intersectsItems = ray.intersectObjects(items, true);
            const intersectsDiamonds = ray.intersectObjects(diamonds, true);

            if (intersectsCollidables.length > 0) {
                for (let i = 0; i < collidables.length; i++) {
                    if (intersectsCollidables[0].object.parent.parent === collidables[i]) {
                        this.collidedObject = collidables[i];
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

            if (intersectsDiamonds.length > 0) {
                for (let i = 0; i < items.length; i++) {
                    if (intersectsDiamonds[0].object.parent.parent === diamonds[i]) {
                    this.collidedDiamond = diamonds[i];
                    break;
                    }
                }
            }
        }
    }
    walk(eventKey, scene, collidables, items, diamonds) {
        
        let updatedPositionPoint;
        switch (eventKey) {
            case 'upArrow':
                this.walkForwardHelper(this.group.rotation.x, this.group.rotation.y);
                updatedPositionPoint = new Three.Vector3(this.group.position.x, this.group.position.y, this.group.position.z);

                //check if moving to the new position causes collision
                this.collisionDetect(updatedPositionPoint, scene, collidables, items, diamonds);
                if (this.collidedObject) {
                    //if collided with a sheep, make sound and backoff
                    const audio = document.querySelector(`audio[data-key="oof"]`);
                    audio.play();
                    this.screenMessage('oof!', 1000);
                    this.walkBackwardHelper(this.group.rotation.x, this.group.rotation.y);
                } 
                if (this.collidedItem) {
                    //if collided with an item, eat the item;
                    const audio = document.querySelector(`audio[data-key="chomp"]`);
                    audio.play();
                    this.collidedItem.visible = false;
                    this.collectedFood += 1;
                    this.screenMessage('yum', 1000);
                }
                if (this.collidedDiamond) {
                    const audio = document.querySelector(`audio[data-key="ping"]`);
                    audio.play();
                    this.collectedDiamonds += 1;
                    this.collectDiamond(10, this.collidedDiamond);
                    this.screenMessage('ooo diamond', 1000);
                    
                }
                break;
                
            case 'rightArrow':
                this.group.rotateY(-Math.PI/48);
                break;
            case 'downArrow':
                this.walkBackwardHelper(this.group.rotation.x, this.group.rotation.y);

                updatedPositionPoint = new Three.Vector3(this.group.position.x, this.group.position.y, this.group.position.z);
                //check if moving to the new position causes collision
                this.collisionDetect(updatedPositionPoint, scene, collidables, items, diamonds);
                if (this.collidedObject) {
                    //if collided with a sheep, move forward 
                    // console.log('down-oof!');
                    this.walkForwardHelper(this.group.rotation.x, this.group.rotation.y);
                } 
                if (this.collidedItem) {
                    //if collided with an item, eat the item;
                    const audio = document.querySelector(`audio[data-key="chomp"]`);
                    audio.play();
                    this.collidedItem.visible = false;
                    // console.log('down-ooo yumm');
                }
                break;
            case 'leftArrow':
                this.group.rotateY(Math.PI/48);
                break;

            case 'none':
                updatedPositionPoint = new Three.Vector3(this.group.position.x, this.group.position.y, this.group.position.z);

                //check if moving to the new position causes collision
                this.collisionDetect(updatedPositionPoint, scene, collidables, items, diamonds);
                if (this.collidedObject) {
                    //if collided with a sheep, move back
                    // console.log('none - oof!');
                    this.walkBackwardHelper(this.group.rotation.x, this.group.rotation.y);
                } 
                else if (this.collidedItem) {
                    //if collided with an item, eat the item;
                    const audio = document.querySelector(`audio[data-key="chomp"]`);
                    audio.play();
                    this.collidedItem.visible = false;
                    // console.log('none - ooo yumm');
                }
                break;
            default:
                break;
        }
        this.collidedItem = undefined;
        this.collidedObject = undefined;
        this.collidedDiamond = undefined;
    }

    collectDiamond(interval, diamond) {
        diamond.position.y = 100;
        if (interval === 0) {
            diamond.visible = false;
            return;
        } else {
            setTimeout(() => {
                // diamond.position.y += 5;
                diamond.rotateY(10);
                this.collectDiamond(interval-1, diamond);
            }, 0);
        }
    }

    screenMessage(message, time) {
        const msgContainer = document.getElementById('message-wrap');
        msgContainer.classList.remove('hidden');
        const messagePlaceholder = document.getElementById('message');
        messagePlaceholder.innerHTML = message;

        setTimeout(() => {
            const msgContainer = document.getElementById('message-wrap');
            msgContainer.classList.add('hidden');
        }, time);
    }
}