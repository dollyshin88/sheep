import * as Three from 'three';

function Plane (scene) {
    const geometry = new Three.PlaneGeometry( 30000,30000, 3000 );

    // const mat = new Three.TextureLoader().load('../../assets/grassplane.jpg',          texture => {
    //         const material = new Three.MeshBasicMaterial( { map: texture });
    //     });
    const texture = new Three.TextureLoader().load('../../assets/grassplane.jpg');
    const material = new Three.MeshBasicMaterial({map: texture});
    material.side = Three.DoubleSide;
    const plane = new Three.Mesh( geometry, material );
    plane.position.set(0,0,0);
    plane.rotateX(-1.5708);
    scene.add( plane );

    this.update = function() {

    }
}
export default Plane;