import Meadow from './Meadow';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const canvas = document.getElementById('canvas');
const meadow = new Meadow(canvas);

bindEventListeners();
document.body.appendChild(meadow.renderer.domElement);
const controls = new OrbitControls(meadow.camera, meadow.renderer.domElement);
controls.addEventListener('change', () => meadow.renderer.render(meadow.scene, meadow.camera));
// controls.minDistance = 100;
// controls.maxDistance = 1500;

render();

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

function render() {
    requestAnimationFrame(render);
    meadow.update(); //updates all children objects in meadow
}


// window.addEventListener('click', meadow.onMouseClick);


