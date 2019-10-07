import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default class Sheep {
    constructor(idx, loadingManager) {
        this.group = new Three.Group();
        this.loadingManager = loadingManager;
        this.vAngle = 0;
        this.sheepNum = idx;
        this.collidedObject;
        this.drawBody();
        this.drawLegs();
        this.addBox();
        const xpos = Math.random()*(2000-1000)+1000;
        const zpos = Math.random() * 2000 + 2000;
        this.zrotation = Math.random() *2*Math.PI;
        this.group.position.set(xpos,-10,zpos);
        this.group.rotateX(-1.5708);
        this.group.rotateZ(this.zrotation);

        this.group.scale.set(1, 1, 1);
  
    }
    addBox() {
        const geometryBox = new Three.IcosahedronGeometry(70, 0);
        const materialMeshLambert = new Three.MeshLambertMaterial();
        const box = new Three.Mesh(geometryBox, materialMeshLambert);
        box.position.set(0,0,55);
        box.visible = false;
        box.name = `sheep-${this.sheepNum}`;
        this.group.add(box);
    }
    drawBody() {

        const mtlLoader = new MTLLoader(this.loadingManager);
        mtlLoader.load('assets/sheep/sheep_body.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader(this.loadingManager);
            objLoader.setMaterials(materials);

            objLoader.load('assets/sheep/sheep_body.obj', obj => {                
                this.group.add(obj);
            });
        });
    }
    
    drawLegs() {
        const mtlLoader = new MTLLoader(this.loadingManager);
        // FRONT RIGHT LEG
        mtlLoader.load('assets/sheep/sheep_leg_right_front.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader(this.loadingManager);
            objLoader.setMaterials(materials);

            objLoader.load('assets/sheep/sheep_leg_right_front.obj', obj => {
                this.frontRightLeg = obj;
                this.frontRightLeg.position.set(0.7, -0.8, 0.5);
                // this.frontRightLeg.translateY(-50);
                this.group.add(this.frontRightLeg);
            });
        });
        // FRONT LEFT LEG
        mtlLoader.load('assets/sheep/front_left_leg_test.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader(this.loadingManager);
            objLoader.setMaterials(materials);

            objLoader.load('assets/sheep/front_left_leg_test.obj', obj => {
                this.frontLeftLeg = obj;
                this.frontLeftLeg.position.set(0.7, 0.8, 0.5);
                this.group.add(this.frontLeftLeg);
            });
        });
        // BACK RIGHT LEG   
        mtlLoader.load('assets/sheep/sheep_leg_right_back.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader(this.loadingManager);
            objLoader.setMaterials(materials);

            objLoader.load('assets/sheep/sheep_leg_right_back.obj', obj => {
                
                this.backRightLeg = obj;
                this.backRightLeg.position.set(0.7, -0.8, -0.5);
                this.group.add(this.backRightLeg);
            });
        });
        // BACK LEFT LEG  
        mtlLoader.load('assets/sheep/sheep_leg_left_back.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader(this.loadingManager);
            objLoader.setMaterials(materials);

            objLoader.load('assets/sheep/sheep_leg_left_back.obj', obj => {
                this.backLeftLeg = obj;
                this.backLeftLeg.position.set(0.7, 0.8, -0.5);
                this.group.add(this.backLeftLeg);
            });
        });
        
    }

    collisionDetect(originPoint, scene, collidables, items) {
        let sheepbox = scene.getObjectByName(`sheep-${this.sheepNum}`);
        for (var vertexIndex = 0; vertexIndex < sheepbox.geometry.vertices.length; vertexIndex++) {
            var localVertex = sheepbox.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(sheepbox.matrix);
            var directionVector = globalVertex.clone().normalize();

            var ray = new Three.Raycaster(
                originPoint, directionVector, 5, 65);
            const intersectsCollidables = ray.intersectObjects(collidables, true);
            // const intersectsItems = ray.intersectObjects(items, true);
            if (intersectsCollidables.length > 0) {
                for (let i = 0; i < collidables.length; i++) {
                    if (intersectsCollidables[0].object.parent.parent === collidables[i] && 
                        collidables[i] !== this.group) {
                        this.collidedObject = collidables[i];
                        break;
                    }
                }
            }
        }
    }


    walk(speed, scene, collidables) {
        this.vAngle += speed;
        this.group.position.y = this.group.position.y + ((1/5)*Math.sin(this.vAngle));
        const xdir = this.group.position.x * Math.cos(this.zrotation);
        const zdir = this.group.position.z * Math.sin(this.zrotation);

        if (Math.sqrt(this.group.position.x*this.group.position.x + this.group.position.z*this.group.position.z) > 4800) {
            // this.zrotation = this.zrotation + Math.PI/2;
            this.group.rotateZ(this.zrotation + Math.PI);
            this.zrotation = this.group.rotation.z;
            this.group.position.x -= 5 * speed * Math.cos(this.zrotation);
            this.group.position.z += 5 * speed * Math.sin(this.zrotation);   
        } else {
            this.group.position.x -= 2 * speed * Math.cos(this.zrotation);
            this.group.position.z += 2 * speed * Math.sin(this.zrotation);
        }
        let updatedPositionPoint = new Three.Vector3(this.group.position.x, this.group.position.y, this.group.position.z);
        this.collisionDetect(updatedPositionPoint, scene, collidables);
        if (this.collidedObject) {
            //move back and turn 45
            this.group.position.x += 50 * speed * Math.cos(this.zrotation);
            this.group.position.z -= 50 * speed * Math.sin(this.zrotation);
            this.group.rotateZ(this.zrotation + Math.PI/12);
            this.zrotation = this.group.rotation.z;
            this.collidedObject = undefined;
        }


        const legMovement = Math.sin(this.vAngle) * Math.PI/3;
        this.frontRightLeg.position.x = 3 * legMovement;
        this.frontRightLeg.position.z = 2 * legMovement;
        this.frontLeftLeg.position.x = -3 * legMovement;
        this.frontLeftLeg.position.z = -2 * legMovement;

        this.backRightLeg.position.x = -3 * legMovement;
        this.backRightLeg.position.z = -2 * legMovement;
        this.backLeftLeg.position.x = 3 * legMovement;
        this.backLeftLeg.position.z = 2 * legMovement;

    }
    speedUpSpace(mouseDown) {
        if (mouseDown) {
            this.walk(0.1);
        } else {
            if (this.group.position.y <= -10.4) return;
            this.walk(0.08);
        }
    }
    clickHandler(){
        this.group.position.y += 10;
    }

}
