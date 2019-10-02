import * as Three from 'three';

export default class Sky {
    constructor() {
        this.group = new Three.Group();
        this.group.position.set(0, 10000, 0)
        this.group.scale.set(250,250,250);
        this.daySky = new Three.Group();
        this.nightSky = new Three.Group();

        this.group.add(this.daySky);
        this.group.add(this.nightSky);

        this.colors = {
            day: [0xFFFFFF, 0xEFD2DA, 0xC1EDED, 0xCCC9DE],
            night: [0x5DC7B5, 0xF8007E, 0xFFC363, 0xCDAAFD, 0xDDD7FE],
        };

        this.drawSky('day');
        this.drawSky('night');
        this.drawNightLights();
    }
    drawSky(phase) {
        for (let i = 0; i < 30; i++) {
            const geometry = new Three.IcosahedronGeometry(0.4, 0);
            const material = new Three.MeshStandardMaterial({
                color: this.colors[phase][Math.floor(Math.random() * this.colors[phase].length)],
                roughness: 1,
                shading: Three.FlatShading
            });
            const mesh = new Three.Mesh(geometry, material);

            mesh.position.set((Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30);
            if (phase === 'day') {
                this.daySky.add(mesh);
            } else {
                this.nightSky.add(mesh);
            }
        }
    }
    drawNightLights() {
        const geometry = new Three.SphereGeometry(0.1, 5, 5);
        const material = new Three.MeshStandardMaterial({
            color: 0xFF51B6,
            roughness: 1,
            shading: Three.FlatShading
        });

        for (let i = 0; i < 3; i++) {
            const light = new Three.PointLight(0xF55889, 2, 30);
            const mesh = new Three.Mesh(geometry, material);
            light.add(mesh);

            light.position.set((Math.random() - 2) * 6,
                (Math.random() - 2) * 6,
                (Math.random() - 2) * 6);
            light.updateMatrix();
            light.matrixAutoUpdate = false;

            this.nightSky.add(light);
        }
    }
    showNightSky(condition) {
        if (condition) {
            this.daySky.position.set(100, 100, 100);
            this.nightSky.position.set(0, 0, 0);
        } else {
            this.daySky.position.set(0, 0, 0);
            this.nightSky.position.set(100, 100, 100);
        }
    }
    moveSky() {
        this.group.rotation.x += 0.001;
        this.group.rotation.y -= 0.004;
    }
}