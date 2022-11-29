
import { MeshBasicMaterial, } from "three";
import { MeshStandardMaterial } from "three";
import { RepeatWrapping } from "three";
import { TextureLoader } from "three";
import { PlaneGeometry } from "three";
import { Mesh } from "three";
import img from '../../assets/images/groundtex.jpg'

export class Ground extends Mesh{

    constructor(){
        super( 
            new PlaneGeometry( 250, 250,10 ), 
            new MeshBasicMaterial( { color: 0x282828} )
             );
             this.rotation.x = - Math.PI / 2;
             let mapDB =   new TextureLoader();
			mapDB.load(img,(textureMap)=>{
                textureMap.wrapS = RepeatWrapping;
				textureMap.wrapT = RepeatWrapping;
                textureMap.repeat.set(40,40 );
                const uploadMaterial = new MeshStandardMaterial({
                    color: 0x777777,
                    map:textureMap,
                })
				this.material = uploadMaterial
			})
            this.name="ground"
            
    }
}