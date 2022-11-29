import { WebGLRenderer } from "three";
import { Scene } from "three";
import { PerspectiveCamera } from "three";
import { Vector2 } from "three";
import { Raycaster } from "three";

let mouse = new Vector2();
let raycaster = new Raycaster();
export class MouseEvents {
    
    /** 
     * this class helps you to controller events mouse 
     * 
    */
    constructor(container,renderer = WebGLRenderer ,camera = PerspectiveCamera,scene = Scene){
        this.container = container
        this.camera = camera
        this.scene = scene
        this.renderer = renderer

    }
    _getInteractionMouse(e,callBack){
        const canvasBounds =  this.renderer.domElement.getBoundingClientRect();
        mouse.x = ( ( e.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
        mouse.y = - ( ( e.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
        raycaster.setFromCamera( mouse,this.camera );
        let intersects = raycaster.intersectObjects(this.scene.children,true); 
        if(intersects){
            // intersects[0].object.material.wireframe=true
            // this.scene.onDocumentMouseMove(intersects[0].object)
            callBack(intersects)
        }
    }
    /**
    * @param [callback=1] — return object to mouse pointer.
    */
    onpointermove (callBack=Function){
        this.container.onpointermove = (e) =>{
        e.preventDefault();
        this._getInteractionMouse(e,(intersect)=>callBack(intersect));
        }
    }
    onPointerUp (callBack=Function){
        this.container.onpointerup = (e) =>{
        e.preventDefault();
        this._getInteractionMouse(e,(intersect)=>callBack(intersect));
        }
    }
}