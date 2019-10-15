import Meadow from './Meadow';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Sky from './meadowObjects/sky';
import Sheep from './meadowObjects/sheep';
import CamSheep from './meadowObjects/camSheep';
import Cloud from './meadowObjects/cloud';
import Tree from './meadowObjects/tree';
import GrassPatch from './meadowObjects/grasspatch';
import Item from './meadowObjects/items';
import Diamond from './meadowObjects/diamond';

const canvas = document.getElementById('canvas');
const meadow = new Meadow(canvas);
let eventKey;
let sheeps = [];
let sheepGroups = [];
let camSheep;
let grassPatches = [];
let clouds = [];
let items = [];
let itemGroups = [];
let sky;
let trees;
let collidables = [];
let diamonds = [];
let diamondGroups = [];
let RESOURCES_LOADED = false;
let loadingManager;
let loadingObject = new Three.Group(); 

//========= FOR LOADING SCREEN =======//
const mtlLoader = new MTLLoader();
mtlLoader.load('assets/loading/loading.mtl', materials => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load('assets/loading/loading.obj', obj => {
        obj.position.set(0,0,0);
        obj.scale.set(0.5,0.5,0.5);
        obj.rotateX(Math.PI);
        obj.rotateY(Math.PI);
        loadingObject.add(obj);
        loadingObject.position.set(0,0,0);
    });
});

const loadingScreen =  {
    scene: new Three.Scene(),
    camera: new Three.PerspectiveCamera(55, canvas.width/canvas.height, 0.1, 1000),
    obj: loadingObject
};

//===== INITIALIZE ======//
function init() {
    bindEventListeners();
    document.body.appendChild(meadow.renderer.domElement);
    const controls = new OrbitControls(meadow.camera, meadow.renderer.domElement);
    controls.addEventListener('change', () => meadow.renderer.render(meadow.scene, meadow.camera));
    controls.minDistance = 1;
    controls.maxDistance = 10000;
    
    //======loading screen======//
    loadingScreen.obj.position.set(0,0,5);
    loadingScreen.camera.position.set(0,0,100);
    loadingScreen.scene.add(loadingScreen.obj);
    // lighting for the loading screen
    const directLight1 = new Three.DirectionalLight(0xffd798, 0.9);
    directLight1.castShadow = true;
    directLight1.position.set(9.5, 50, 50);
    loadingScreen.scene.add(directLight1);
    // initialize loading manager and set callbacks for onProgress and onLoad
    loadingManager = new Three.LoadingManager();
        loadingManager.onProgress = (item, loaded, total) => {
            console.log(item, loaded, total);
        };
        loadingManager.onLoad = () => {
            console.log('all resources loaded');
            RESOURCES_LOADED = true;
            screenPrep();
        };

    //=======event listeners=======//
    document.body.onkeypress = onKeyDown;
    document.body.onkeyup = onKeyUp;
    document.addEventListener('mousedown', onSheepClick);
    
    //draw objects and load to the scene 
    drawSheep(10);
    drawSky();
    drawCloud();
    drawTrees();
    drawCamSheep();
    drawGrassPatches(100);
    drawDiamonds(5);
    drawItems({apple: 10, banana: 10, redMushroom: 10, yellowMushroom: 10});
    collidables = sheepGroups.slice();
    collidables.push(trees.group);
}

// set up the game screen with audio controller and welcome message
function screenPrep() {
    const audioControl = document.getElementById('audio-control');
    audioControl.classList.remove('hidden');
    const msgContainer = document.getElementById('message-wrap');
    msgContainer.classList.remove('hidden');
    const messages = [
        'Welcome to the Sheep\'s Meadow.', 
        'Just relax and roam around...', 
        'and occasionally...',
        '"Bahhhh"',
        'Oh and...',
        'play some music if able.',
        '(top right corner ^)',
        ''];
    message(messages);
    function message(messages) {
        if (messages.length === 0) {
            const msgContainer = document.getElementById('message-wrap');
            msgContainer.classList.add('hidden');
            return;
        };
        setTimeout(() => {
            const messagePlaceholder = document.getElementById('message');
            messagePlaceholder.innerHTML = messages[0];
            message(messages.slice(1));
        }, 3000);
    }
}

//==============JUMPING SHEEP ON CLICK================//
const raycaster = new Three.Raycaster();
const mouse = new Three.Vector2();

function onSheepClick(e) {
    e.preventDefault();
    mouse.x = (e.clientX / meadow.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY /meadow.renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, meadow.camera);
    var intersects = raycaster.intersectObjects(sheepGroups, true); 
    if (intersects.length > 0) {
        for (let i = 0; i < sheepGroups.length; i++) {
            if (intersects[0].object.parent.parent === sheepGroups[i]) {
                sheepJumpUpHandler(sheepGroups[i]);
            }
        }
    }
}
function sheepJumpUpHandler(obj) {
    obj.position.y += 50;
    const audio = document.querySelector(`audio[data-key="click"]`);
    audio.play();
    setTimeout(()=> {
        obj.position.y -= 50;
    }, 100);
}

//===============DRAWING FUNCTIONS==================//
function drawItems(option) {
    for (let i = 0; i < option.apple; i++) {
        let newApple = new Item('apple', loadingManager);
        items.push(newApple);
    }
    for (let i = 0; i < option.banana; i++) {
        let newBanana = new Item('banana', loadingManager);
        items.push(newBanana);
    }
    for (let i = 0; i < option.redMushroom; i++) {
        let newRedMushroom = new Item('redMushroom', loadingManager);
        items.push(newRedMushroom);
    }
    for (let i = 0; i < option.yellowMushroom; i++) {
        let newYellowMushroom = new Item('yellowMushroom', loadingManager);
        items.push(newYellowMushroom);
    }
    items.forEach(item => {
        itemGroups.push(item.group);
        meadow.scene.add(item.group);
    });
}

function drawCamSheep() {
    camSheep = new CamSheep(loadingManager);
    meadow.camera.position.set(-20,100,10);
    meadow.camera.rotateY(Math.PI/2);
    camSheep.group.position.set(0, 0, 100);
    camSheep.group.add(meadow.camera);
    meadow.scene.add(camSheep.group);
}

function drawGrassPatches(num) {
    for (let i = 0; i < num; i++) {
        //TODO: Move the position arguments into the class component
        grassPatches.push(
            new GrassPatch(Math.random()*(3000+3000)-3000, 
            0, 
            Math.random()*(3000+2000)-2000), 
            loadingManager
            );
    }
    grassPatches.forEach(grass => meadow.scene.add(grass.group));
};

function drawTrees() {
    trees = new Tree(loadingManager);
    meadow.scene.add(trees.group);

};

function drawSky() {
    sky = new Sky();
    meadow.scene.add(sky.group);
}

function drawCloud(loadingManager) {
    //TODO: Refactor to pass an array of cloud types and iterate
    clouds.push(new Cloud('cloud_type1', loadingManager));
    clouds.push(new Cloud('cloud_type2', loadingManager));
    clouds.push(new Cloud('cloud_type3', loadingManager));
    clouds.push(new Cloud('cloud_type2', loadingManager));
    clouds.push(new Cloud('cloud_type1', loadingManager));
    clouds.push(new Cloud('cloud_type3', loadingManager));
    clouds.forEach(cloud => meadow.scene.add(cloud.group));
}

function drawSheep(num) {
    for (let i = 0; i < num; i++) {
        const newSheep = new Sheep(i, loadingManager);
        sheeps.push(newSheep);
        sheepGroups.push(newSheep.group);
        meadow.scene.add(newSheep.group);
    }
}

function drawDiamonds(num) {
    for (let i = 0; i < num; i++) {
        const newDiamond = new Diamond(loadingManager);
        diamonds.push(newDiamond);
        diamondGroups.push(newDiamond.group);
    }
    diamondGroups.forEach(dia => meadow.scene.add(dia));
}

//==========EVENT LISTENER CALLBACKS ==============//
function onKeyDown(event) {
    if (event.code === 'KeyQ') {
        eventKey = 'bah'
        playMeh(event);
        };
    if (event.code === 'KeyW') eventKey = 'upArrow';
    if (event.code === 'KeyD') eventKey = 'rightArrow';
    if (event.code === 'KeyS') eventKey = 'downArrow';
    if (event.code === 'KeyA') eventKey = 'leftArrow';
    if (event.code === 'KeyR') {
        eventKey = 'cam'
        repositionCam();
    };
}

function repositionCam() {
    meadow.camera.position.set(-20,100,10);
    meadow.camera.rotation.set(0, 1.5707963267948966, 0);
}

function onKeyUp() {
    eventKey = 'none';
}

function playMeh(event) {
    const audio = document.querySelector(`audio[data-key="${event.code}"]`);
    audio.play();
}

function bindEventListeners(){
    window.onresize = resizeCanvas;
    resizeCanvas();
}

function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    meadow.onWindowResize();
}

//==========RENDERING================//
function animate() {
    if (RESOURCES_LOADED === false ) {
       requestAnimationFrame(animate);
       meadow.renderer.render(loadingScreen.scene, loadingScreen.camera);
       return; 
    }
    requestAnimationFrame(animate);
    render();
}

function render() {
    meadow.update();
    meadow.renderer.render(meadow.scene, meadow.camera);
    sheeps.forEach(sheep => sheep.walk(Math.random()*0.3, meadow.scene, collidables));
    // sheeps.forEach(sheep => sheep.speedUpSpace(spaceDown));
    camSheep.walk(eventKey, meadow.scene, collidables, itemGroups);
    sky.moveSky();
    diamonds.forEach(dia => dia.rotate());
}

init();
animate();




