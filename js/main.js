import Meadow from './Meadow';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const canvas = document.getElementById('canvas');
const meadow = new Meadow(canvas);
import Sky from './meadowObjects/sky';
import Sheep from './meadowObjects/sheep';
import Cloud from './meadowObjects/cloud';
// import sheep from './meadowObjects/sheep';
let mouseDown;
let sheep;
let sky;
let cloud;
let night = false;

const toggleBtn = document.querySelector('.toggle');
toggleBtn.addEventListener('click', toggleNight);

function init() {
    bindEventListeners();
    document.body.appendChild(meadow.renderer.domElement);
    const controls = new OrbitControls(meadow.camera, meadow.renderer.domElement);
    controls.addEventListener('change', () => meadow.renderer.render(meadow.scene, meadow.camera));
    // controls.minDistance = 100;
    // controls.maxDistance = 1500;

    //==================
    document.body.onkeypress = onMouseDown;
    document.body.onkeyup = onMouseUp;
        // document.addEventListener('mousedown', onMouseDown);
        // document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchstart', onTouchStart);
        document.addEventListener('touchend', onTouchEnd);
    //===================   
    drawSheep();
    drawSky();
    drawCloud();
}
function drawSky() {
    sky = new Sky();
    sky.showNightSky(night);
    meadow.scene.add(sky.group);
}
function drawCloud() {
    cloud = new Cloud();
    meadow.scene.add(cloud.group);
}

function drawSheep() {
    sheep = new Sheep(rad);
    // sheep.group.translateY(200);
    meadow.scene.add(sheep.group);
}
function onMouseDown(event) {
    if (event.keyCode === 32) mouseDown = true;
}
function onTouchStart(event) {
    const targetClass = event.target.classList[0];
    if (targetClass === 'toggle' || targetClass === 'toggle-music') return;
    event.preventDefault();
    mouseDown = true;
}
function toggleNight() {
    night = !night;

    // toggleBtn.classList.toggle('toggle-night');
    // world.classList.toggle('world-night');

    sky.showNightSky(night);
}

function onMouseUp() {
    mouseDown = false;
}
function onTouchEnd(event) {
    const targetClass = event.target.classList[0];
    if (targetClass === 'toggle' || targetClass === 'toggle-music') return;
    event.preventDefault();
    mouseDown = false;
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
    
    sheep.jumpOnMouseDown(mouseDown);
    if (sheep.group.position.y > 0.4) cloud.bend();

    sky.moveSky();
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


init();
animate();
window.scene = meadow.scene;

// window.addEventListener('click', meadow.onMouseClick);


