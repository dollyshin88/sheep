import * as Three from 'three';

export default class Cloud {
    constructor() {
        this.group = new Three.Group();
        this.group.position.y = 8000;
        this.group.scale.set(1000,1000,1000);

        this.material = new Three.MeshStandardMaterial({
            color: 0xacb3fb,
            roughness: 1,
            shading: Three.FlatShading
        });

        this.vAngle = 0;

        this.drawParts();

        this.group.traverse((part) => {
            part.castShadow = true;
            part.receiveShadow = true;
        });
    }
    drawParts() {
        const partGeometry = new Three.IcosahedronGeometry(1, 0);
        this.upperPart = new Three.Mesh(partGeometry, this.material);
        this.group.add(this.upperPart);

        this.leftPart = this.upperPart.clone();
        this.leftPart.position.set(-1.2, -0.3, 0);
        this.leftPart.scale.set(0.8, 0.8, 0.8);
        this.group.add(this.leftPart);

        this.rightPart = this.leftPart.clone();
        this.rightPart.position.x = -this.leftPart.position.x;
        this.group.add(this.rightPart);

        this.frontPart = this.leftPart.clone();
        this.frontPart.position.set(0, -0.4, 0.9);
        this.frontPart.scale.set(0.7, 0.7, 0.7);
        this.group.add(this.frontPart);

        this.backPart = this.frontPart.clone();
        this.backPart.position.z = -this.frontPart.position.z;
        this.group.add(this.backPart);
    }
    bend() {
        this.vAngle += 0.08;

        this.upperPart.position.y = -Math.cos(this.vAngle) * 0.12;
        this.leftPart.position.y = -Math.cos(this.vAngle) * 0.1 - 0.3;
        this.rightPart.position.y = -Math.cos(this.vAngle) * 0.1 - 0.3;
        this.frontPart.position.y = -Math.cos(this.vAngle) * 0.08 - 0.3;
        this.backPart.position.y = -Math.cos(this.vAngle) * 0.08 - 0.3;
    }
}