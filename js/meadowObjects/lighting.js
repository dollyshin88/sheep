import * as THREE from 'three';

function Lighting(scene) {

    const light = new THREE.PointLight(0xffffff, 1, 300);
    light.position.set(0, 10, 20);
    scene.add( light );

    this.update = () => {

    }
}

export default Lighting;