import * as Three from 'three';

function Plane (scene) {
    const geometry = new Three.CircleGeometry(5000,100);
    const material = new Three.MeshLambertMaterial({ color: 0x113614 });
    material.side = Three.DoubleSide;
    const plane = new Three.Mesh( geometry, material );
    plane.position.set(0,0,0);
    plane.rotateX(-1.5708);
    scene.add( plane );

    this.update = function() {

    }
}
export default Plane;