
import {PRIMS}     from './prims.js' ; 
import {Visu}      from './visu.js' ;
import {SafeArray} from './safeArray.js' ;  
import {ActorManager} from './ecs/actorManager.js' ; 
import {COMPS} from './ecs/component.js';
class Simu extends Visu {

	constructor(){
		super() ; 
		this.directory = {} ; 
		this.entities = new SafeArray() ; 
		this.actorManager = new ActorManager({},this);
		this.triggerDistance = 5; // Distance à laquelle déclencher une action
        this.monitoredMeshes = []; // Liste des meshes à surveiller
	}

	createActor(name, TypeActor, data){
		const actor = this.actorManager.createActor(name,TypeActor,data);
		return actor;
	}

	removeActor(anActor){
		this.actorManager.removeActor(anActor) ; 
	}

	getActor(name){
		return this.actorManager.getActor(name) ; 

	} 

	go(){
			const that = this;
			this.engine.runRenderLoop(()=>{
				const dt = that.engine.getDeltaTime()/1000.0;
				that.clock += dt ; 
				that.actorManager.update(dt);
				that.scene.render();
			});
	}

	createWorld(data) {} // Méthode abstraite
	
	createEntity(name, Type, data){
		const entity = new Type(data) ;
		this.directory[name] = entity ;  
		this.entities.add(entity) ; 
		return entity ; 
	}
	
	removeEntity(entity){
		delete this.directory[name] ; 
		this.entities.remove(entity) ; 
	}
	
	findEntity(name){return this.directory[name] || null ; }
}

export {Simu}


