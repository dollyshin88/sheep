import Meadow from './Meadow';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const canvas = document.getElementById('canvas');
const meadow = new Meadow(canvas);
import Sky from './meadowObjects/sky';
import Sheep from './meadowObjects/sheep';
import CamSheep from './meadowObjects/camSheep';
import Cloud from './meadowObjects/cloud';
import Tree from './meadowObjects/tree';
import GrassPatch from './meadowObjects/grasspatch';
// import sheep from './meadowObjects/sheep';
let eventKey;
let sheeps = [];
let sheepGroups = [];
let camSheep;
let grassPatches = [];
let clouds = [];
let sky;
let night = false;
let trees;
const toggleBtn = document.querySelector('.toggle');
toggleBtn.addEventListener('click', toggleNight);
//===


//===
function init() {
    bindEventListeners();
    document.body.appendChild(meadow.renderer.domElement);
    const controls = new OrbitControls(meadow.camera, meadow.renderer.domElement);
    controls.addEventListener('change', () => meadow.renderer.render(meadow.scene, meadow.camera));
    controls.minDistance = 1;
    controls.maxDistance = 8700;

    //==================
    document.body.onkeypress = onKeyDown;
    document.body.onkeyup = onKeyUp;
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('mousedown', onSheepClick);
    // meadow.renderer.domElement.addEventListener('click', onSheepClick, true);
    
    //===================   
    // drawSheep(10);
    drawSky();
    drawCloud();
    drawTrees();
    drawCamSheep();
    // drawGrassPatches();
}

//==============JUMPING SHEEP ON CLICK================
const raycaster = new Three.Raycaster();
const mouse = new Three.Vector2();

function onSheepClick(e) {
    e.preventDefault();
    mouse.x = (e.clientX / meadow.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY /meadow.renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, meadow.camera);
    var intersects = raycaster.intersectObjects(sheepGroups, true); //array
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
    setTimeout(()=> {
        obj.position.y -= 50;
    }, 100);
}

//===============DRAWING FUNCTIONS==================//
function drawCamSheep() {
    camSheep = new CamSheep();
    // camera pos (front/back, height, lef/right)
    meadow.camera.position.set(110,200,0);
    meadow.camera.rotateY(Math.PI/2)
    meadow.camera.rotateX(-Math.PI/12);
    // meadow.camera.lookAt(500,50,0);
    // meadow.camera.position.set(0,2000, 9000)
    camSheep.group.position.set(0, 0, 100);
    camSheep.group.add(meadow.camera);
    // meadow.camera.add(camSheep.group);
    // meadow.scene.add(meadow.camera);
    meadow.scene.add(camSheep.group);
}
function drawGrassPatches() {
    for (let i = 0; i < 12; i++) {
        grassPatches.push(
                new GrassPatch(Math.random()*(2000+2000)-2000, 
                0, 
                Math.random()*(2000-1000)+1000)
                );
        
    }
    grassPatches.forEach(grass => meadow.scene.add(grass.group));
};

function drawTrees() {
    trees = new Tree();
    meadow.scene.add(trees.group);

};
function drawSky() {
    sky = new Sky();
    sky.showNightSky(night);
    meadow.scene.add(sky.group);
}
function drawCloud() {
    clouds.push(new Cloud('cloud_type1'));
    clouds.push(new Cloud('cloud_type2'));
    clouds.push(new Cloud('cloud_type3'));
    clouds.push(new Cloud('cloud_type2'));
    clouds.push(new Cloud('cloud_type1'));
    clouds.push(new Cloud('cloud_type3'));
    clouds.forEach(cloud => meadow.scene.add(cloud.group));
}

function drawSheep(num) {
    for (let i = 0; i < num; i++) {
        const newSheep = new Sheep();

        sheeps.push(newSheep);
        sheepGroups.push(newSheep.group);
        meadow.scene.add(newSheep.group);
    }
}

//==========EVENT LISTENER CALLBACKS ==============
function onKeyDown(event) {

    if (event.keyCode === 32) {
        eventKey = 'space'
        playMeh(event);
        };
    if (event.code === 'KeyW') eventKey = 'upArrow';
    if (event.code === 'KeyD') eventKey = 'rightArrow';
    if (event.code === 'KeyS') eventKey = 'downArrow';
    if (event.code === 'KeyA') eventKey = 'leftArrow';

}

function onKeyUp() {
    eventKey = 'none';
}
function playMeh(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    audio.play();
}

function onTouchStart(event) {
    const targetClass = event.target.classList[0];
    if (targetClass === 'toggle' || targetClass === 'toggle-music') return;
    event.preventDefault();
    spaceDown = true;
}
function toggleNight() {
    night = !night;

    // toggleBtn.classList.toggle('toggle-night');
    // world.classList.toggle('world-night');

    sky.showNightSky(night);
}

function onTouchEnd(event) {
    const targetClass = event.target.classList[0];
    if (targetClass === 'toggle' || targetClass === 'toggle-music') return;
    event.preventDefault();
    spaceDown = false;
}

function rad(degrees) {
    return degrees * (Math.PI / 180);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    meadow.update();
    sheeps.forEach(sheep => sheep.walk(Math.random()*0.3));
    // sheeps.forEach(sheep => sheep.speedUpSpace(spaceDown));
    camSheep.walk(eventKey);
    sky.moveSky();
    meadow.renderer.render(meadow.scene, meadow.camera);
}
//=========================
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
window.camera = meadow.camera;
window.scene = meadow.scene;

init();
animate();

   


// window.addEventListener('click', meadow.onMouseClick);


