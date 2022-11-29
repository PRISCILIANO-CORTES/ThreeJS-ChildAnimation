import { sRGBEncoding } from "three";
import { WebGLRenderer } from "three";
import { PerspectiveCamera } from "three";
import { MainScene } from "./scene/mainScene";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { PCFSoftShadowMap } from "three";

export class App{
    constructor(container){
        this.container = container;
        this.camera = new PerspectiveCamera(75,
            this.container.clientWidth/this.container.clientHeight,
            0.1,
            1000
            )
        // this.camera.position.y = 45     
        // this.camera.position.x = 0
        this.camera.position.z = 5
        this.renderer = new WebGLRenderer({antialias: true})
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.outputEncoding = sRGBEncoding
        this.renderer.physicallyCorrectLights = true
        this.renderer.shadowMap.enabled = true;

        this.container.appendChild(this.renderer.domElement)
        
        this.control = new OrbitControls(this.camera,this.container)
        this.control.rotateSpeed=0.4
        this.control.dampingFactor = 0.5
        this.mainScene = new MainScene(this.container,this.renderer,this.camera)
        this.onResized();
        this.render();
    }

    onResized(){
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
    }

    render(){
        this.renderer.render(this.mainScene,this.camera)
        this.mainScene.renderAnimations();

        this.control.update();
        this.renderer.setAnimationLoop(() => this.render());
    }
}