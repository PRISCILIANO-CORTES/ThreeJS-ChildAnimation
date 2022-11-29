import gsap from 'gsap';
import { AmbientLight, BoxGeometry, FogExp2, Mesh, MeshPhongMaterial } from "three";
import { Color } from "three";
import { DirectionalLight } from "three";
import { DirectionalLightHelper } from "three";
import { Scene } from "three";
import { MouseEvents } from "../controls/mouseEvents";
import { Cube } from "../objects/Cube";
import {Figure} from "../objects/Figure";
import { Ground } from "../objects/Ground";

export class MainScene extends Scene {
    constructor(container,renderer,camera){
        super();
        this.container = container
        this.lastMesh = null
        this.renderer = renderer
        this.camera = camera
        this.background = new Color("#fdb4bf")
        // this.fog = new Fog( 0x282828, 10, 50 );
        this.initObjects()
        //this.mouseControls()
        this.light()        
        //this.renderAnimations()
    }
    initObjects(){

        this.figure = new Figure();

        const degreesToRadians = (degrees) => {
            return degrees * (Math.PI / 180)
        }

        gsap.set(this.figure.params, {
            y: -1.5
        })
        
        gsap.to(this.figure.params, {
            ry: degreesToRadians(360),
            repeat: -1,
            duration: 30
        })
        
        gsap.to(this.figure.params, {
            y: 0,
            armRotation: degreesToRadians(90),
            legRotation: degreesToRadians(90),
            repeat: -1,
            yoyo: true,
            duration: 0.5
        })
        
        gsap.ticker.add(() => {
            this.figure.bounce();
        })

        this.add(this.figure)
        // this.cube = new Cube(2,{x:0,y:1,z:0})z
        // for (let index = -30; index < 30; index+=3) {
        //     for (let y = -30; y < 30; y+=3) {
        //         this.add(this.cubes = new Cube(2,{x:index,y:1,z:y}))     
                
        //         this.cubes.castShadow = true
        //         this.cubes.receiveShadow = true
        //     }            
        // }
        // this.ground = new Ground()
        // this.add(this.ground)

        // this.geo = new BoxGeometry(70, 70, 1, 20, 20, 1)
		// this.mat = new MeshPhongMaterial({color: 'yellow'});
		// this.floor = new Mesh(this.geo, this.mat);

		// this.floor.rotation.x = -90 * Math.PI / 180;
		// this.floor.receiveShadow = true;
		// this.add(this.floor);
    }
    light(){
        this.lightAmbient = new AmbientLight(0x9eaeff, 0.5)
        //this.add(lightAmbient)

        this.lightDirectional = new DirectionalLight(0xffffff, 0.8)
        this.lightDirectional.position.set(5, 5, 5)
        this.add(this.lightAmbient, this.lightDirectional)

        // Move the light source towards us


        // this.ambient = new AmbientLight(0x404040,1)
        // this.directional = new DirectionalLight( 0xffffff, 1 );
        // this.directional.position.set(12,16,8)

        // this.directional = new DirectionalLight( 0xffffff, 1);

		// this.directional.castShadow = true;
		// this.directional.shadow.mapSize.width = 2048;
		// this.directional.shadow.mapSize.height = 2048;
		// this.directional.position.set(500, 1500, 1000);
		// this.directional.shadow.camera.far = 2500;
		// this.directional.shadow.camera.left = -1000;
		// this.directional.shadow.camera.right = 1000;
		// this.directional.shadow.camera.top = 1000;
		// this.directional.shadow.camera.bottom = -1000;
		// this.directional.shadow.darkness = 0.2;

        // const ambientLight = new AmbientLight(0x666666);
		// const fog = new FogExp2(0x9db3b5, 0.002);

        // this.add(fog, ambientLight);

        // this.add(this.directional)        

        // const helper = new DirectionalLightHelper( this.directional, 5 );
        // this.add( helper );
    }
    // mouseControls(){
    //     this.mouseEvents = new MouseEvents(this.container,this.renderer,this.camera,this)
    //     this.mouseEvents.onpointermove((intersects)=>{
    //         // console.log(intersect.object.name)
    //         if(intersects.length>0 && intersects[0].object.name.substring(0,3) === 'cub' ){
    //             if(intersects[0].object != this.lastMesh){
    //                 if(this.lastMesh){
    //                     this.lastMesh.scale.set(1,1,1)
    //                     this.lastMesh.defaultColor()
    //                 }
    //                 this.lastMesh= intersects[0].object
    //                 this.lastMesh.scale.set(1.04,1.04,1.04)
    //                 this.lastMesh.material.color = new Color("#88dd22")
    //             }
    //         }
    //         else{
    //             if(this.lastMesh){
    //                 this.lastMesh.scale.set(1,1,1)
    //                 this.lastMesh.defaultColor()
    //             }
    //             this.lastMesh=null
    //         }
    //     })
    //     this.mouseEvents.onPointerUp((intersects)=>{
    //         console.log(intersects[0].object.name)
    //     })
    // }

    renderAnimations(){
    }
    
}