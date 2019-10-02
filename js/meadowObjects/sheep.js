import * as Three from 'three';

export default class Sheep {
    constructor(rad) {
        this.group = new Three.Group();
        

        this.woolMaterial = new Three.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 1,
            shading: Three.FlatShading
        });
        this.skinMaterial = new Three.MeshStandardMaterial({
            color: 0xffaf8b,
            roughness: 1,
            shading: Three.FlatShading
        });
        this.darkMaterial = new Three.MeshStandardMaterial({
            color: 0x4b4553,
            roughness: 1,
            shading: Three.FlatShading
        });

        this.vAngle = 0;

        this.drawBody(rad);
        this.drawHead(rad);
        this.drawLegs(rad);
        // scene.add(this);
        
        this.group.position.set(0,360,0);
        this.group.rotateY(1.5708);
        this.group.scale.set(200,200,200);
        
    }
    drawBody(rad) {
        const bodyGeometry = new Three.IcosahedronGeometry(1.7, 0);
        const body = new Three.Mesh(bodyGeometry, this.woolMaterial);
        body.castShadow = true;
        body.receiveShadow = true;
        this.group.add(body);
    }
    drawHead(rad) {
        const head = new Three.Group();
        head.position.set(0, 0.65, 1.6);
        head.rotation.x = rad(-20);
        this.group.add(head);

        const foreheadGeometry = new Three.BoxGeometry(0.7, 0.6, 0.7);
        const forehead = new Three.Mesh(foreheadGeometry, this.skinMaterial);
        forehead.castShadow = true;
        forehead.receiveShadow = true;
        forehead.position.y = -0.15;
        head.add(forehead);

        const faceGeometry = new Three.CylinderGeometry(0.5, 0.15, 0.4, 4, 1);
        const face = new Three.Mesh(faceGeometry, this.skinMaterial);
        face.castShadow = true;
        face.receiveShadow = true;
        face.position.y = -0.65;
        face.rotation.y = rad(45);
        head.add(face);

        const woolGeometry = new Three.BoxGeometry(0.84, 0.46, 0.9);
        const wool = new Three.Mesh(woolGeometry, this.woolMaterial);
        wool.position.set(0, 0.12, 0.07);
        wool.rotation.x = rad(20);
        head.add(wool);

        const rightEyeGeometry = new Three.CylinderGeometry(0.08, 0.1, 0.06, 6);
        const rightEye = new Three.Mesh(rightEyeGeometry, this.darkMaterial);
        rightEye.castShadow = true;
        rightEye.receiveShadow = true;
        rightEye.position.set(0.35, -0.48, 0.33);
        rightEye.rotation.set(rad(130.8), 0, rad(-45));
        head.add(rightEye);

        const leftEye = rightEye.clone();
        leftEye.position.x = -rightEye.position.x;
        leftEye.rotation.z = -rightEye.rotation.z;
        head.add(leftEye);

        const rightEarGeometry = new Three.BoxGeometry(0.12, 0.5, 0.3);
        rightEarGeometry.translate(0, -0.25, 0);
        this.rightEar = new Three.Mesh(rightEarGeometry, this.skinMaterial);
        this.rightEar.castShadow = true;
        this.rightEar.receiveShadow = true;
        this.rightEar.position.set(0.35, -0.12, -0.07);
        this.rightEar.rotation.set(rad(20), 0, rad(50));
        head.add(this.rightEar);

        this.leftEar = this.rightEar.clone();
        this.leftEar.position.x = -this.rightEar.position.x;
        this.leftEar.rotation.z = -this.rightEar.rotation.z;
        head.add(this.leftEar);
    }
    drawLegs(rad) {
        const legGeometry = new Three.CylinderGeometry(0.3, 0.15, 1, 4);
        legGeometry.translate(0, -0.5, 0);
        this.frontRightLeg = new Three.Mesh(legGeometry, this.darkMaterial);
        this.frontRightLeg.castShadow = true;
        this.frontRightLeg.receiveShadow = true;
        this.frontRightLeg.position.set(0.7, -0.8, 0.5);
        this.frontRightLeg.rotation.x = rad(-12);
        this.group.add(this.frontRightLeg);

        this.frontLeftLeg = this.frontRightLeg.clone();
        this.frontLeftLeg.position.x = -this.frontRightLeg.position.x;
        this.frontLeftLeg.rotation.z = -this.frontRightLeg.rotation.z;
        this.group.add(this.frontLeftLeg);

        this.backRightLeg = this.frontRightLeg.clone();
        this.backRightLeg.position.z = -this.frontRightLeg.position.z;
        this.backRightLeg.rotation.x = -this.frontRightLeg.rotation.x;
        this.group.add(this.backRightLeg);

        this.backLeftLeg = this.frontLeftLeg.clone();
        this.backLeftLeg.position.z = -this.frontLeftLeg.position.z;
        this.backLeftLeg.rotation.x = -this.frontLeftLeg.rotation.x;
        this.group.add(this.backLeftLeg);
    }
    jump(speed) {
        this.vAngle += speed;
        this.group.position.y = Math.sin(this.vAngle) + 360.38;
        this.group.position.x += 5;
        //+ 1.38
        const legRotation = Math.sin(this.vAngle) * Math.PI / 6 ;

        this.frontRightLeg.rotation.x = legRotation;
        this.backRightLeg.rotation.x = legRotation;
        this.frontLeftLeg.rotation.x = -legRotation;
        this.backLeftLeg.rotation.x = -legRotation;

        const earRotation = Math.sin(this.vAngle) * Math.PI / 3 + 1.5;

        this.rightEar.rotation.z = earRotation;
        this.leftEar.rotation.z = -earRotation;
    }
    jumpOnMouseDown(mouseDown) {
        if (mouseDown) {
            this.jump(0.05);
        } else {
            if (this.group.position.y <= 360.4) return;
            this.jump(0.08);
        }
    }

}
