import * as Three from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default class Sheep {
    constructor() {
        this.group = new Three.Group();
        this.vAngle = 0;

        this.drawBody();
        this.drawLegs();
        const xpos = Math.random()*1000;
        const zpos = Math.random() * 2000 + 2000;
        this.zrotation = Math.random() *2*Math.PI;
        this.group.position.set(xpos,-10,zpos);
        this.group.rotateX(-1.5708);
        this.group.rotateZ(this.zrotation);

        this.group.scale.set(1, 1, 1);
        
    }
    drawBody() {

        const mtlLoader = new MTLLoader();
        mtlLoader.load('../../assets/sheep/sheep_body.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.load('../../assets/sheep/sheep_body.obj', obj => {                
                this.group.add(obj);
            });
        });
    }
    
    drawLegs() {
        const mtlLoader = new MTLLoader();
        // FRONT RIGHT LEG
        mtlLoader.load('../../assets/sheep/sheep_leg_right_front.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.load('../../assets/sheep/sheep_leg_right_front.obj', obj => {
                this.frontRightLeg = obj;
                this.frontRightLeg.position.set(0.7, -0.8, 0.5);
                // this.frontRightLeg.translateY(-50);
                this.group.add(this.frontRightLeg);
            });
        });
        // FRONT LEFT LEG
        mtlLoader.load('../../assets/sheep/front_left_leg_test.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.load('../../assets/sheep/front_left_leg_test.obj', obj => {
                this.frontLeftLeg = obj;
                this.frontLeftLeg.position.set(0.7, 0.8, 0.5);
                this.group.add(this.frontLeftLeg);
            });
        });
        // BACK RIGHT LEG   
        mtlLoader.load('../../assets/sheep/sheep_leg_right_back.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.load('../../assets/sheep/sheep_leg_right_back.obj', obj => {
                
                this.backRightLeg = obj;
                this.backRightLeg.position.set(0.7, -0.8, -0.5);
                this.group.add(this.backRightLeg);
            });
        });
        // BACK LEFT LEG  
        mtlLoader.load('../../assets/sheep/sheep_leg_left_back.mtl', materials => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.load('../../assets/sheep/sheep_leg_left_back.obj', obj => {
                this.backLeftLeg = obj;
                this.backLeftLeg.position.set(0.7, 0.8, -0.5);
                this.group.add(this.backLeftLeg);
            });
        });
        
    }
    walk(speed) {
        this.vAngle += speed;
        this.group.position.y = Math.sin(this.vAngle) -10.38;
        const xdir = this.group.position.x * Math.cos(this.zrotation);
        const zdir = this.group.position.z * Math.sin(this.zrotation);
        if (Math.sqrt(xdir*xdir + zdir*zdir) > 3001) {
            // this.zrotation = this.zrotation + Math.PI/2;
            this.group.rotateZ(this.zrotation + Math.PI / 2);
            this.zrotation = this.group.rotation.z;
            this.group.position.x += 2 * speed * Math.cos(this.zrotation);
            this.group.position.z -= 2 * speed * Math.sin(this.zrotation);
            
        } else {
            this.group.position.x -= 2 * speed * Math.cos(this.zrotation);
            this.group.position.z += 2 * speed * Math.sin(this.zrotation);

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

}
