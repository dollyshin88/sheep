import * as Three from 'three';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { MtlObjBridge } from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge';

function Tree(scene) {

    
    // const mtlLoader = new MTLLoader();
    // mtlLoader.load('../../assets/Tree_V10_Final.mtl', mtlParseResult => {
    //     mtlParseResult.preload();
    //     const objLoader = new OBJLoader2();
    //     const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    //     // debugger
    //     objLoader.addMaterials(materials);
        
    //     objLoader.load('../../assets/Tree_V10_Final.obj', obj => {
    //         obj.position.set(0,-5000,0);
    //         obj.scale.set(50,50,50);
    //         // debugger
    //         scene.add(obj);
    //     });

    // });

    // //cube object for testing ================
    // // const geometryBox = new Three.BoxGeometry(1000,1000,1000);
    // // const materialMeshLambert = new Three.MeshLambertMaterial( { color: 0xFF6633 });
    // // const tree = new Three.Mesh(geometryBox, materialMeshLambert);
    // // tree.position.set(0,-2000,0);
    // // scene.add(tree);
    // //========================================



    // this.update = () => {

    // }
}

export default Tree;