import * as Three from 'three';

export default class Sky {
    constructor() {
        this.group = new Three.Group();
        this.group.position.set(0, 2000, 0);
        this.group.scale.set(100,100,100);
        // this.daySky = new Three.Group();
        this.nightSky = new Three.Group();

        // this.group.add(this.daySky);
        this.group.add(this.nightSky);

        // this.colors = {
        //     day: [0xFFFFFF, 0xEFD2DA, 0xC1EDED, 0xCCC9DE],
        //     night: [0x5DC7B5, 0xF8007E, 0xFFC363, 0xCDAAFD, 0xDDD7FE],
        // };
        this.colors = [0x5DC7B5, 0xF8007E, 0xFFC363, 0xCDAAFD, 0xDDD7FE];

        // this.drawSky('day');
        this.drawSky();
        // this.drawNightLights();
        
    }
    drawSky() {
        for (let i = 0; i < 20; i++) {
            const geometry = new Three.IcosahedronGeometry(0.4, 0);
            const material = new Three.MeshStandardMaterial({
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                roughness: 1,
                shading: Three.FlatShading
            });
            const mesh = new Three.Mesh(geometry, material);
            mesh.scale.set(0.6,0.6,0.6);
            mesh.position.set((Math.random() - 0.5) * 90,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 90);
            
            this.nightSky.add(mesh);
   
        }
    }
    
    
    moveSky() {
        this.group.rotation.x += 0.0007;
        this.group.rotation.y -= 0.002;
    }
}