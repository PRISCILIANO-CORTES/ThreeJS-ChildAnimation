import { Color } from 'three';
import { Mesh, MeshStandardMaterial,  BoxBufferGeometry, TextureLoader, RepeatWrapping } from 'three';

export class Cube extends Mesh {
	constructor(size,{x,y,z} ) {
		super();
		this.geometry = new BoxBufferGeometry(size, size, size);
		const uploadMaterial = new MeshStandardMaterial({
			color: 'white',
		})
		this.material = uploadMaterial
		this.name =`cube-${size}-${x}-${y}-${z}`
		this.position.x=x
		this.position.y=y
		this.position.z=z
		this.renderOrder = 0;
		
	}
	rotate(){
		this.position.x += 0.01
	}
	defaultColor(){
		this.material.color = new Color("black")	
	}
}

