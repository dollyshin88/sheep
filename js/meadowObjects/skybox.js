import * as Three from 'three';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';// import { TimelineMax } from 'gsap/all';


function Skybox(scene) {
    const materialArray = [];

    function onLoadCB(loaded) {
        loaded.encoding = Three.sRGBEncoding;
        loaded.flipX = true;
    }

    const texture_ft = new Three.TextureLoader().load('');    
    const texture_bk = new Three.TextureLoader().load('');  
    const texture_up = new Three.TextureLoader().load('');    
    const texture_dn = new Three.TextureLoader().load('../../assets/grassplane.jpg');    
    const texture_rt = new Three.TextureLoader().load('');    
    const texture_lf = new Three.TextureLoader().load('');  
    // texture_up.flipY = true;
    // texture_dn.flipY = true;

    // texture_bk.flipY = true;
    // texture_ft.flipY = true;
    // texture_rt.flipY = true;
    // texture_lf.flipY = true;

    materialArray.push(new Three.MeshBasicMaterial({map: texture_ft}));
    materialArray.push(new Three.MeshBasicMaterial({map: texture_bk}));
    materialArray.push(new Three.MeshBasicMaterial({map: texture_up}));
    materialArray.push(new Three.MeshBasicMaterial({map: texture_dn}));
    materialArray.push(new Three.MeshBasicMaterial({map: texture_rt}));
    materialArray.push(new Three.MeshBasicMaterial({map: texture_lf}));

    for (let i = 0; i < 6; i++) {
        materialArray[i].side = Three.BackSide;
    }

	const geometryBox = new Three.BoxGeometry( 20000, 10000, 20000 );
    const skybox = new Three.Mesh( geometryBox, materialArray );
    skybox.position.set(0,4580,0);
    scene.add(skybox);

    //cube object for testing ================
    // const geometryBox = new Three.BoxGeometry(2, 2, 2);
    // const materialMeshLambert = new Three.MeshLambertMaterial( { color: 0xFF6633 });
    // const box = new Three.Mesh(geometryBox, materialMeshLambert);
    // box.position.set(0,0,0);
    // scene.add(box);
    //========================================


	this.update = function(time) {
		// const scale = Math.sin(time)+2;
        // cube.scale.set(scale, scale, scale);
        
        // const tl = new TimelineMax().delay(.3);
        // tl.to(cube.scale, 1, {x: Math.sin(time), ease: Expo.easeOut});
        // tl.to(cube.scale, 0.5, {x: .5, ease: Expo.easeOut});
        // tl.to(cube.rotation, 0.5, {y: Math.PI*.5, ease: Expo.easeOut});
	}
}

export default Skybox;