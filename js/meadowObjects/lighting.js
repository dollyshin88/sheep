import * as THREE from 'three';

function Lighting(scene) {

    // const light = new THREE.PointLight(0xffffff, 1, 300);
    // light.position.set(0, 10, 20);
    // scene.add( light );


    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
    scene.add(light);

    const directLight1 = new THREE.DirectionalLight(0xffd798, 0.8);
    directLight1.castShadow = true;
    directLight1.position.set(9.5, -5008.2, 8.3);
    scene.add(directLight1);

    const directLight2 = new THREE.DirectionalLight(0xc9ceff, 0.5);
    directLight2.castShadow = true;
    directLight2.position.set(-15.8, -5005.2, 8);
    scene.add(directLight2);

    this.update = () => {

    }
}

export default Lighting;