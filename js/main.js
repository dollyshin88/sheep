import Meadow from './Meadow';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const canvas = document.getElementById('canvas');
const meadow = new Meadow(canvas);
import Sky from './meadowObjects/sky';
import Sheep from './meadowObjects/sheep';
import Cloud from './meadowObjects/cloud';
import Tree from './meadowObjects/tree';
// import sheep from './meadowObjects/sheep';
let spaceDown;
let sheeps = []
let sky;
let night = false;
let trees;
const toggleBtn = document.querySelector('.toggle');
toggleBtn.addEventListener('click', toggleNight);

function init() {
    bindEventListeners();
    document.body.appendChild(meadow.renderer.domElement);
    const controls = new OrbitControls(meadow.camera, meadow.renderer.domElement);
    controls.addEventListener('change', () => meadow.renderer.render(meadow.scene, meadow.camera));
    controls.minDistance = 500;
    controls.maxDistance = 5700;

    //==================
    document.body.onkeypress = onspaceDown;
    document.body.onkeyup = onMouseUp;

        document.addEventListener('touchstart', onTouchStart);
        document.addEventListener('touchend', onTouchEnd);
    //===================   
    drawSheep(3);
    drawSky();
    drawCloud();
    drawTrees();
}

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
    const cloud1 = new Cloud('cloud_type1');
    const cloud2 = new Cloud('cloud_type2');
    const cloud3 = new Cloud('cloud_type3');
    const cloud4 = new Cloud('cloud_type2');
    const cloud5 = new Cloud('cloud_type1');
    const cloud6 = new Cloud('cloud_type3');
    meadow.scene.add(cloud1.group);
    meadow.scene.add(cloud2.group);
    meadow.scene.add(cloud3.group);
    meadow.scene.add(cloud4.group);
    meadow.scene.add(cloud5.group);
    meadow.scene.add(cloud6.group);

}

function drawSheep(num) {
    for (let i = 0; i < num; i++) {
        const newSheep = new Sheep();
        sheeps.push(newSheep);
        meadow.scene.add(newSheep.group);
    }

    // meadow.scene.add(sheep1.group);
    // meadow.scene.add(sheep2.group);
    // meadow.scene.add(sheep3.group);
}
function onspaceDown(event) {
    if (event.keyCode === 32) spaceDown = true;
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

function onMouseUp() {
    spaceDown = false;
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
    sheeps.forEach(sheep => sheep.walk(Math.random()*4));
    sheeps.forEach(sheep => sheep.speedUpSpace(spaceDown));

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

window.scene = meadow.scene;
init();
animate();


// window.addEventListener('click', meadow.onMouseClick);


