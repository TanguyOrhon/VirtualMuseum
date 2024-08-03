
import {PRIMS} from '../prims.js' ; 

class Component {
	
	constructor(data, actor){
		this.actor = actor;
	}
	
	register(dt){
		this.actor.components.push(this);
	}
	
	update(dt){}
}

class AnchoredTo extends Component {

	constructor(data, actor){
		super(data, actor) ;
		const nomParent = data.parent || null ;
		
		if(nomParent != null){
		
			const parent = actor.sim.getActor(nomParent) ; 
			
			if(parent != null){
				if(actor.object3d && parent.object3d){
					actor.object3d.parent = parent.object3d ; 
				}
			}
		}
	}
}

class AddParent extends Component {

	constructor(data, actor){
		super(data, actor) ;	
		this.actor.object3d.parent = data.object3d; 
		}
}


class Position extends Component {

	constructor(data, actor){
		super(data, actor);
        	const x = data.x || 0.0 ; 
        	const y = data.y || 0.0 ; 
        	const z = data.z || 0.0 ; 

        	if(this.actor.object3d != null){
	    		this.actor.position.set(x,y,z) ; 
            		this.actor.object3d.position.set(x,y,z) ; 
        	}
	}
}

class Rotation extends Component {

	constructor(data, actor){
		super(data, actor);
		
		const x = data.x || 0.0 ; 
        	const y = data.y || 0.0 ; 
        	const z = data.z || 0.0 ; 

        	if(this.actor.object3d != null){
	    		this.actor.rotation.set(x,y,z) ; 
            		this.actor.object3d.rotation.set(x,y,z) ; 
        	}
	}
}

class Poster extends Component {

	constructor(data, actor){
		super(data, actor);
        	const poster = PRIMS.poster(data.name, data, this.actor.sim.scene);
			
        	this.actor.object3d = poster;
	}
}

class Sphere extends Component {

	constructor(data, actor){
		super(data, actor);
		const diametre = data.diameter || 1.0 ;  
		const m = actor.sim.assets[data.material] || null ;
        	const sph = PRIMS.sphere(data.name,{diametre:diametre, materiau:m},this.actor.sim.scene) ; 
        	this.actor.object3d = sph ; 
	}
}

class Box extends Component {

	constructor(data, actor){
		super(data, actor);
		const l = data.width    || 1.0 ;
		const h = data.height   || 1.0 ;
		const e = data.depth    || 1.0 ;   
        	const m = actor.sim.assets[data.material] || null ;  

        	const box = PRIMS.boite(data.name,{hauteur:h, largeur:l, epaisseur:e, 		materiau:m},this.actor.sim.scene) ; 
        	this.actor.object3d = box ; 
	}
}

class Wall extends Component {

	constructor(data, actor){
		super(data, actor);
		const l = data.largeur  || 1.0 ;
		const h = data.hauteur || 1.0 ;
		const e = data.epaisseur  || 1.0 ;    
		const m = data.materiau || null ;
        	const wall = PRIMS.wall(data.name,{hauteur:h, largeur:l, epaisseur:e,"materiau":m},this.actor.sim.scene) ; 
        	this.actor.object3d = wall ; 
	}
}

class MezzanineDoor extends Component {
	constructor(data, actor){
		super(data, actor);


		const l = data.largeur  || 3.0 ;
		const h = data.hauteur || 5.0 ;
		const e = data.epaisseur  || 0.1 ;    
		const m = data.materiau || null ;

		const groupe=PRIMS.mezzanine(data.name,{largeur:l,hauteur:h,epaisseur:e,materiau:m},this.actor.sim.scene)

		this.actor.object3d = groupe ; 
	}
}



class WallDoor extends Component {
	constructor(data, actor){
		super(data, actor);


		const l = data.largeur  || 3.0 ;
		const h = data.hauteur || 5.0 ;
		const e = data.epaisseur  || 0.1 ;    
		const m = data.materiau || null ;

		const groupe=PRIMS.wallDoor(data.name,{largeur:l,hauteur:h,epaisseur:e,materiau:m},this.actor.sim.scene);

		this.actor.object3d = groupe ; 
	}
}

class Door extends Component {
	constructor(data, actor){
		super(data, actor);


		const l = data.largeur  || 3.0 ;
		const h = data.hauteur || 5.0 ;
		const e = data.epaisseur  || 0.1 ;    
		const m = data.materiau || null ;

		const groupe=PRIMS.porte(data.name,{largeur:l,hauteur:h,epaisseur:e,materiau:m},this.actor.sim.scene);

		this.actor.object3d = groupe ; 
	}
}

class Escalier extends Component {
	constructor(data,actor){
		super(data, actor);
		const esc=PRIMS.stairs("escalier",this.actor.sim.scene);
		this.actor.object3d = esc ;
	}
}
class PorteAuto extends Component {
	constructor(data,actor){
		super(data, actor);
		const groupe=PRIMS.porteAuto("porte_automatique",{activationDistance:5},this.actor.sim.scene);
		this.actor.object3d = groupe ;
	}
}

class Petrole extends Component {
	constructor(data,actor){
		super(data,actor);
		const groupe=PRIMS.petrole(data.name,{},this.actor.sim.scene)
		this.actor.object3d = groupe ; 
	}
}

class Cartel extends Component {

	constructor(data, actor){
		super(data, actor);

        this.register(300);

        this.sim = actor.sim ; 

        this.titre = data.titre || "" ; 
        this.descript = data.descript || "" ; 
        this.timer = 0;
        this.setUp = false ; 
        this.visible = false ; 

        this.rect = new BABYLON.GUI.Rectangle ; 
        this.rect.adaptWidthToChildren = true ; 
        this.rect.adaptHeightToChildren = true ;
        this.rect.paddingLeft  = "-10px";
        this.rect.paddingRight = "-10px";
        this.rect.height = "40px";
        this.rect.cornerRadius = 40 ; 
        this.rect.background = "green" ; 
        this.rect.alpha = 1 ;
        this.rect.linkOffsetY = 100 ; 
		console.log(data);
        const gui = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(data.door2.object3d,200,250,false) ; 
        gui.addControl(this.rect) ;

        this.label = new BABYLON.GUI.TextBlock() ; 
        this.label.text = this.titre ; 
        this.label.resizeToFit = true ;
        this.label.color = "black" ;
        this.label.alpha = 1 ; 
        this.rect.addControl(this.label) ; 

        this.gui_affiche = false ; 
        this.gui_description = false ; 
		//print("cartel loaded");
		console.log("Cartel initialized with the following properties:");
        console.log("Title:", this.titre);
        console.log("Description:", this.descript);
        console.log("Actor object:", this.actor.object3d);
        console.log("GUI attached to mesh:", this.actor.object3d);

        // Ensure the actor's mesh is visible
        if (this.actor.object3d && !this.actor.object3d.isVisible) {
            this.actor.object3d.isVisible = true;
        }

        // Verify GUI setup
        console.log("GUI setup complete:", gui);
        console.log("Rectangle:", this.rect);
        console.log("Label:", this.label);
	}

    update(dt){
        //console.log("UPDATE");
        if(this.setUp == false){
            this.rect.linkWithMesh(this.actor.object3d);
            this.setUp = true ; 
            console.log(this.actor.name + "-OUPS") ; 
        }

        if(this.actor.focus){
            this.rect.alpha = 1 ; 
            this.label.alpha = 1
        } else {
            this.rect.alpha = 0 ; 
            this.label.alpha = 0 ; 
        }
    }
}

class Titre extends Component {

	constructor(data, actor){
		super(data, actor);


        this.register();

        this.sim = actor.sim ; 

        const scene = this.sim.scene ;
        const nom = data.titre ; 

        this.plane = BABYLON.Mesh.CreatePlane("plane-"+nom);
        if(actor.object3d){this.plane.parent = actor.object3d;}
        plane.position.y = -0.1 ; 
        plane.visibility = 0 ;
        plane.isPickable = false ; 
        const header = BABYLON.GUI.Button.CreateSimpleButton(nom, nom) ; 
        header.width = "200px" ; 
        header.height = "40px" ;
        header.color  = "black" ; 
        header.fontSize = 18 ;
        header.background = "white" ; 
        header.isVisible = true ; 
        this.sim.gui.addControl(header) ; 
        header.linkWithMesh(plane) ; 
        
    

    }

}

class LookAt extends Component {

	constructor(data, actor){
		super(data, actor);
		this.register() ; 
	}

    update(dt){
        this.actor.object3d.lookAt(this.actor.sim.camera.position) ; 
    }
}


class Repulsion extends Component {

	constructor(data, actor){
		super(data, actor) ; 
		this.register() ; 
		this.f = new BABYLON.Vector3(0,0,0) ;
		this.A = new BABYLON.Vector3(0,0,0) ; // Position de ce vecteur
		this.B = new BABYLON.Vector3(0,0,0) ;
	}
	
	update(dt){
		this.A.copyFrom(this.actor.position) ; 
		this.actor.sim.actorManager.actors.forEach((b)=>{
			this.B.copyFrom(b.position) ; 
			this.B.subtractToRef(this.A, this.f) ;
			const d = this.f.length() ; 
			if(d<10){
				this.f.normalize() ; 
				this.f.scaleInPlace(-1) ; 
				this.f.y = 0 ; 
				this.actor.applyForce(this.f) ;
			} 
		}) ; 
	
	}
}

class Frottement extends Component {

	constructor(data, actor){
		super(data, actor) ; 
		this.register() ; 
		this.f = new BABYLON.Vector3(0,0,0) ; 
		this.k = data.k || 0.5 ; 
	}
	
	update(dt){
		this.f.copyFrom(this.actor.velocity) ; 
		this.f.scaleInPlace(-this.k) ;
		this.actor.applyForce(this.f) ;  	
	}
}

class Attraction extends Component {

	// data : 
	//	d0 			type : float, default : 1.0, 	distance between the attractor and the target point
	//	attractorName 		type : string, default : null	name of the attractor actor 

	constructor (data, actor){
		super(data, actor) ; 
		this.register() ;
		
		console.log("CREATION ATTRACTEUR") ; 
		
		const attractorName = data.attractedBy || null ; 
		
		this.target 	= new BABYLON.Vector3(0,0,0) ; 
		this.maPosition = this.actor.position.clone() ; 
		
		this.d0 = data.d0 || 1.0 ; 
		
		this.vd = new BABYLON.Vector3(0,0,0) ;  // Desired velocity
		
		this.force = new BABYLON.Vector3(0,0,0) ; 
		
		
		if(attractorName){
			this.attractor = actor.sim.actorManager.getActor(attractorName) || null ; 			
		}		 
	}
	
	update(dt){

		if(this.attractor){
			// Calcul du point cible 

			this.force.copyFrom(this.attractor.position) ; 
			this.force.subtractInPlace(this.actor.position) ; 
			
			const d = this.force.length() ; 
			
			if(d > 1){
				this.force.normalize() ; 
			}
			
			this.actor.applyForce(this.force) ; 
			
		}	
		
	
	}
}

const COMPS = {
	anchoredTo : AnchoredTo,
    titre      :  Titre,
    cartel     :  Cartel, 
	position   : Position,
	rotation   : Rotation,
	poster     : Poster,
	petrole	   : Petrole,
	porteAuto  : PorteAuto,
	sphere     : Sphere, 
	box        : Box,
	wall       : Wall,
	wallDoor   : WallDoor,
	mezzanine  : MezzanineDoor,
	escalier   : Escalier,
	lookAt 	   : LookAt,
	frottement : Frottement, 
	repulsion  : Repulsion, 
    attraction : Attraction,
	component  : Component
};

export {COMPS};
