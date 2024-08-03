
import {PRIMS} from './prims.js' ; 
import {Simu}  from './simu.js' ; 
import {MTH}  from './Mth.js' ; 

class World extends Simu {

	constructor(){
		super() ; 
	}

	requete_http(www, port, requete, foo){
		const entete = "http://" + www + ":" + port + "/" + requete ;
		loadJSON(entete, (res) => {
			const data = JSON.parse(res) ; 
			foo(data) ; 
		}) ;
	} 



	createWorld(data) {
		const scene = this.scene ;
		scene.audioListenerPositionProvider = () => {
			return new BABYLON.Vector3(0, 0, 10);
		  };
		//scene.useRightHandedSystem = true;
		
		const light0 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,1,0), scene);
        	const light1 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,-1,0), scene);
        	light1.intensity = 0.2 ;

        	const light2 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,-1,0), scene);
        	light2.intensity = 0.2 ;

    		const materiau1 = PRIMS.standardMaterial("mat1",{texture:"./assets/240.jpg"},scene) ; 
    		const materiau2 = PRIMS.standardMaterial("mat_sol",{texture:"./assets/marble.jpg",uScale:25,vScale:25},scene);

		const ciel = PRIMS.sky("ciel",  {}, scene) ; 

		const sol = PRIMS.ground("sol", {materiau:materiau2}, scene) ;

   		const mur1 = PRIMS.wall("wall-1",{materiau:materiau1}, scene) ; 
    		mur1.position = new BABYLON.Vector3(0,0,-15) ; 

    	const mur2 = PRIMS.wall("wall-2",{materiau:materiau1}, scene) ; 
    		mur2.rotation.y = Math.PI/2 ;
			mur2.position = new BABYLON.Vector3(-15,0,0) ; 
		const mur3 = PRIMS.wall("wall-3",{materiau:materiau1}, scene) ; 
			mur3.rotation.y = Math.PI/2 ;
			mur3.position = new BABYLON.Vector3(15,0,0) ;
		const mur4 = PRIMS.entree("wall-4",{materiau:materiau1}, scene) ; 
    		mur4.position = new BABYLON.Vector3(0,0,15) ;
		
		const sound = new BABYLON.Sound("test","assets/powerful-emotional-epic-174136.mp3", scene, null, {
			loop: true,
			autoplay: false,
			spatialSound: true,
			maxDistance: 10,
			});
			var sounds = new Map();
			sounds.set("tableau", sound);
			this.camera.sound = sounds;
    	const poster = PRIMS.poster("poster01",{tableau:"./assets/4.jpg"},scene);
    		poster.parent = mur2 ; 
    		poster.position.y = 1.7 ; 
    		poster.position.z = 0.1 ; 
    		poster.rotation.y = Math.PI ; 
		MTH.SoundToMesh(sound, poster);

		const juillet_1880 = PRIMS.poster("poster01",{tableau:"./assets/tableau/juillet_1880.jpg"},scene);
			juillet_1880.parent = mur2 ; 
			juillet_1880.position.y = 1.7 ; 
			juillet_1880.position.z = 0.1 ; 
			juillet_1880.position = new BABYLON.Vector3(5,1.7,0.1) ;
			juillet_1880.rotation.y = Math.PI ; 

    	}

}

export {World}
