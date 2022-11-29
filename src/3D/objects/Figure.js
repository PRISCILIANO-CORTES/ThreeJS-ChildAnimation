
import { BoxGeometry, Color, ConeGeometry, CylinderBufferGeometry, CylinderGeometry, Group, Mesh, MeshBasicMaterial, MeshLambertMaterial, SphereGeometry } from "three"

const degreesToRadians = (degrees) => {
	return degrees * (Math.PI / 180)
}

const random = (min, max, float = false) => {
	const val = Math.random() * (max - min) + min

	if (float) {
		return val
	}

	return Math.floor(val)
}

export class Figure extends Mesh {
	constructor(params) {
		super();

		this.params = {
			x: 0,
			y: 0,
			z: 0,
			ry: 0,
			...params
		}

		this.group = new Group()
		this.add(this.group)
		
		this.group.position.x = this.params.x
		this.group.position.y = this.params.y
		this.group.position.z = this.params.z
		this.group.rotation.y = this.params.ry

		this.headHue = random(0, 360)
		this.bodyHue = random(0, 360)
		this.headLightness = random(40, 65)
		this.headMaterial = new MeshLambertMaterial({ color: `hsl(${this.headHue}, 30%, ${this.headLightness}%)` })
		this.bodyMaterial = new MeshLambertMaterial({color: 0xffff00})

		this.formHat = document.querySelector('#form-hat')
		this.colorShirt = document.querySelector('#color-shirt');
		this.colorHat = document.querySelector('#color-hat');
		
		this.arms = []
		this.legs = []

		this.initUiListeners();
		this.createHead()
		this.createNeck()
        this.createBody()
		this.createArms()
		this.createLegs()
	}
	
	createHat() {	
		this.hat = new Group();

		const geometry = new ConeGeometry( 1.8, 1.5, 3 );
		this.materialHat = new  MeshLambertMaterial( {color: 0xffff00} );
		const cone = new Mesh( geometry, this.materialHat );

		this.hat.add(cone)
		cone.position.y = 0.8
		
		this.head.add(this.hat)
		this.hat.position.y = 0.5
	}

	createHead() {
		this.head = new Group()
		
		const geometry = new BoxGeometry(1.2, 1.2, 1.2)
		const headMain = new Mesh(geometry, this.headMaterial)
		this.head.add(headMain)
		
		this.group.add(this.head)
		
		this.head.position.y = 1.45
		
		this.createEyes()

		this.createHat()

		this.createNose()
	}

	createNeck() {
		const geometry = new CylinderGeometry(0.4, 0.4, 0.5)
		const neck = new Mesh(geometry, this.headMaterial)
		this.head.add(neck)
		neck.position.y = -0.8
		neck.position.z = 0
	}

	createBody() {
		this.body = new Group()
		const geometry = new BoxGeometry(1, 1.40, 1)
		const bodyMain = new Mesh(geometry, this.bodyMaterial)
		
		this.body.add(bodyMain)
		this.group.add(this.body)
	}

    createArms() {
		const height = 0.90
		
		for(let i = 0; i < 2; i++) {
			this.armGroup = new Group()
			const geometry = new BoxGeometry(0.25, height, 0.25)
			const arm = new Mesh(geometry, this.headMaterial)
			const m = i % 2 === 0 ? 1 : -1
			
			this.armGroup.add(arm)
			
			this.body.add(this.armGroup)
			
			arm.position.y = height * -0.5
			this.armGroup.position.x = m * 0.4
			this.armGroup.position.y = 0.5
			
			this.armGroup.rotation.z = degreesToRadians(30 * m)
			
			this.arms.push(this.armGroup)
		}
	}

	createNose() {
		this.nose = new Group()
		const geometry = new BoxGeometry(0.10, 0.15, 0.30)
		const material = new MeshBasicMaterial({ color: 'black' })
		const noseMain = new Mesh(geometry, material)

		this.nose.add(noseMain)
		noseMain.position.y = 0.12

		this.head.add(this.nose)
		this.nose.position.y = -0.12
		this.nose.position.z = 0.7
	}
	
	createEyes() {
		this.eyes = new Group()
		const geometry = new SphereGeometry(0.15, 12, 8)
		const material = new MeshLambertMaterial({ color: 'black' })
		
		for(let i = 0; i < 2; i++) {
			const eye = new Mesh(geometry, material)
			const m = i % 2 === 0 ? 1 : -1
			
			this.eyes.add(eye)
			eye.position.x = 0.30 * m
		}
		
		this.head.add(this.eyes)
		
		this.eyes.position.y = 0.06
		this.eyes.position.z = 0.7
	}
	
	createLegs() {
		const height = 1.30
		
		for(let i = 0; i < 2; i++) {
			this.legGroup = new Group()
			const geometry = new BoxGeometry(0.25, height, 0.25)
			const leg = new Mesh(geometry, this.headMaterial)
			const l = i % 2 === 0 ? 1 : -1
			
			this.legGroup.add(leg)
			
			this.body.add(this.legGroup)
			
			leg.position.y = height * -0.5
			
			this.legGroup.position.x = l * 0.24
			this.legGroup.position.y = -0.70
		
			this.legGroup.rotation.z = degreesToRadians(30 * l)
			
			this.legs.push(this.legGroup)
		}
	}
	
	bounce() {
		this.group.rotation.y = this.params.ry
		this.group.position.y = this.params.y

		this.arms.forEach((arm, index) => {
			const m = index % 2 === 0 ? 1 : -1
			arm.rotation.z = this.params.armRotation * m
		})

		this.legs.forEach((leg, index) => {
			const l = index % 2 === 0 ? 1 : -1
			leg.rotation.z = this.params.legRotation * l
		})
	}

	initUiListeners() {
		this.colorHat.addEventListener('click', () => {
			this.materialHat.color.set(new Color(Math.random() * 0xffffff).convertSRGBToLinear())
		})

		this.colorShirt.addEventListener('click', () => {
			this.bodyMaterial.color.set(new Color(Math.random() * 0xffffff).convertSRGBToLinear())
		})

		this.formHat.addEventListener('click', () => {
			const hatNew = new Group();
		
			const geometry = new CylinderBufferGeometry( 1.4, 1.2, 1.6 );
			this.materialHat = new  MeshLambertMaterial( {color: 'blue'} );
			const cone = new Mesh( geometry, this.materialHat );

			hatNew.add(cone)
			cone.position.y = 0.8
			
			this.head.add(hatNew)
			hatNew.position.y = 0.5

			this.head.remove(this.hat)
		})
	}
}