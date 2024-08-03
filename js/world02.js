import {PRIMS} from './prims.js' ; 
import {Simu}  from './simu.js' ; 
import {ACTORS} from './ecs/actor.js';
import {COMPS} from './ecs/component.js';
import {MTH}  from './Mth.js' ; 

	class World extends Simu {

		constructor(){
			super() ; 
		}



		createWorld(data) {
			const scene = this.scene ;
			//materiau bois
			const canvas = document.getElementById("renderCanvas");
			const engine = new BABYLON.Engine(canvas, true);
			const materiau1 = PRIMS.standardMaterial("mat1",{texture:"./assets/materiau/240.jpg"},scene) ;

			const light0 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,1,0), scene);
			
			const sol01 = PRIMS.meadow("sol01", {materiau:materiau1}, scene) ;
			//creation et positionnement du sol
			const sol = this.createActor("sol",ACTORS.actor,{});
			sol.add(COMPS.wall,{hauteur:30,largeur:30,epaisseur:0.2,materiau:materiau1});
			sol.add(COMPS.rotation,{x:Math.PI/2 });
			sol.add(COMPS.position,{y:-0.005});

			const amer1 = this.createActor("amer1",ACTORS.actor,{});
			amer1.add(COMPS.sphere,{});
			amer1.add(COMPS.position,{x:7,y:2,z:8})

			const amer2 = this.createActor("amer2",ACTORS.actor,{});
			amer1.add(COMPS.sphere,{});
			amer1.add(COMPS.position,{x:-7,y:2,z:8})

			const cloison_ext_1 = this.createActor("cloison_ext_1",ACTORS.actor,{});
			cloison_ext_1.add(COMPS.wallDoor,{hauteur:10,largeur:30,epaisseur:0.2,materiau:materiau1});
			const cloison_ext_2 = this.createActor("cloison_ext_2",ACTORS.actor,{});
			cloison_ext_2.add(COMPS.wall,{hauteur:10,largeur:30,epaisseur:0.2,materiau:materiau1});
			const cloison_ext_3 = this.createActor("cloison_ext_3",ACTORS.actor,{});
			cloison_ext_3.add(COMPS.wall,{hauteur:10,largeur:30,epaisseur:0.2,materiau:materiau1});
			const cloison_ext_4 = this.createActor("cloison_ext_4",ACTORS.actor,{});
			cloison_ext_4.add(COMPS.wall,{hauteur:10,largeur:30,epaisseur:0.2,materiau:materiau1});

			cloison_ext_2.add(COMPS.rotation,{y:Math.PI/2});
			cloison_ext_2.add(COMPS.position,{x:15,z:15});
			cloison_ext_3.add(COMPS.position,{z:30});
			cloison_ext_4.add(COMPS.rotation,{y:Math.PI/2});
			cloison_ext_4.add(COMPS.position,{x:-15,z:15});
		
			//création et positionnement du plafond
			const plafond = this.createActor("plafond",ACTORS.actor,{});
			plafond.add(COMPS.wall,{hauteur:30,largeur:30,epaisseur:0.2,materiau:materiau1});
			plafond.add(COMPS.rotation,{x:Math.PI/2});
			plafond.add(COMPS.position,{y:10});

			//création et positionnement des cloisons interieurs
			const cloison_int_1 = this.createActor("cloison_int_1",ACTORS.actor,{});
			cloison_int_1.add(COMPS.wallDoor,{hauteur:10,largeur:30,epaisseur:0.2,materiau:materiau1});
			cloison_int_1.add(COMPS.position,{z:15});
			
			const plafond_int = this.createActor("plafond_int",ACTORS.actor,{});
			plafond_int.add(COMPS.mezzanine,{hauteur:15,largeur:30,epaisseur:0.2,materiau:materiau1});
			plafond_int.add(COMPS.rotation,{x:Math.PI/2});
			plafond_int.add(COMPS.position,{y:5,z:15});
			
			//création et positionnement des cloisons interieurs
			const cloison_int_2 = this.createActor("cloison_int_2",ACTORS.actor,{});
			cloison_int_2.add(COMPS.wallDoor,{hauteur:5,largeur:15,epaisseur:0.2,materiau:materiau1});
			const cloison_int_3 = this.createActor("cloison_int_3",ACTORS.actor,{});
			cloison_int_3.add(COMPS.wallDoor,{hauteur:5,largeur:15,epaisseur:0.2,materiau:materiau1});

			cloison_int_2.add(COMPS.rotation,{y:Math.PI/2});
			cloison_int_2.add(COMPS.position,{x:-5,z:22.5});
			cloison_int_3.add(COMPS.rotation,{y:Math.PI/2});
			cloison_int_3.add(COMPS.position,{x:5,z:22.5});

			//création et positionnement de l'escalier
			const escalier = this.createActor("escalier",ACTORS.actor,{});
			escalier.add(COMPS.escalier,{});
			escalier.add(COMPS.position,{x:-2,y:0,z:28});

			// creattion des portes automatiques:
			const door1 = this.createActor("porteAuto1",ACTORS.actor,{});
			door1.add(COMPS.porteAuto,{});

			const door2 = this.createActor("porteAuto2",ACTORS.actor,{});
			door2.add(COMPS.porteAuto,{});
			door2.add(COMPS.position,{z:15});

			const door3 = this.createActor("porteAuto3",ACTORS.actor,{});
			door3.add(COMPS.porteAuto,{});
			door3.add(COMPS.position,{x:5,z:22.5});
			door3.add(COMPS.rotation,{y:Math.PI/2});

			const door4 = this.createActor("porteAuto4",ACTORS.actor,{});
			door4.add(COMPS.porteAuto,{});
			door4.add(COMPS.position,{x:-5,z:22.5});
			door4.add(COMPS.rotation,{y:Math.PI/2});

			const puit_de_petrole1 = this.createActor("puit_de_petrole",ACTORS.actor,{});
			puit_de_petrole1.add(COMPS.petrole,{})
			puit_de_petrole1.add(COMPS.position,{x:10,y:5,z:23});

			const puit_de_petrole2 = this.createActor("puit_de_petrole",ACTORS.actor,{});
			puit_de_petrole2.add(COMPS.petrole,{})
			puit_de_petrole2.add(COMPS.position,{x:-10,y:5,z:23});

		//creation tableau

		async function init() {
			try {
				var fileData = await MTH.loadJSON("./json_files/monde.json");
				for (var cle in fileData) {
					const elt = fileData[cle];
					const typeActor = ACTORS[elt.type];
					const dataActor = elt.data;
					const composants = elt.composants;
					const actor = this.createActor(cle, typeActor, dataActor);
					for (var comp of composants) {
						const typeComp = COMPS[comp.type];
						const dataComp = comp.data;
						actor.add(typeComp, dataComp);
						if(dataComp.parent){
							actor.add(COMPS.anchoredTo,{parent:dataComp.parent});
							actor.add(COMPS.position,{x:dataComp.position.x, y:dataComp.position.y, z:dataComp.position.z});
						}
						if(dataComp.rotation==true){
							actor.add(COMPS.rotation,{y:Math.PI});
						}
					}
				}
			} catch (error) {
				console.error('Erreur lors du chargement du JSON:', error);
			}
		}
		
		// Utilisation de la fonction fléchée pour préserver le contexte `this`
		const initFunction = async () => {
			await init.call(this);
		};
		
		// Appeler la fonction init
		initFunction();
			BABYLON.SceneLoader.ImportMesh("", "assets/", "LibertStatue.obj", scene, function (meshes) {
				// Positionnez le modèle importé si nécessaire
				meshes.forEach(mesh => {
					mesh.position = new BABYLON.Vector3(12, 0, 8);
					mesh.rotation = new BABYLON.Vector3(0, -1.57, 0);
					mesh.scaling = new BABYLON.Vector3(6.5, 6.5, 6.5);
				});
			});
			engine.runRenderLoop(() => {
				scene.render();
			});
		}
	}

	export {World}
