import {MTH}  from './Mth.js' ; 

function creerscene(){
	var scn = new BABYLON.scn(engine) ; 
	scn.gravity = new BABYLON.Vector3(0,-9.8,0) ; 
	scn.collisionsEnabled = true ;
	return scn ;
}

function creerCamera(name,options,scn){
	// console.log("creation camera");
	// Création de la caméra
	// =====================

	const camera = new BABYLON.UniversalCamera(name,new BABYLON.Vector3(0,1.9,-8),scn) ;
	//const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scn);
	camera.setTarget(new BABYLON.Vector3(0.0,0.7,0.0)) ; 

    camera.minZ = 0.05 ; 

	camera.checkCollisions = true ;
	camera.ellipsoid = new BABYLON.Vector3(0.5,1.0,0.5) ;
	camera.applyGravity = true ;
	camera.keysUp = [90,38];
	camera.keysDown = [40,83];
	camera.keysLeft = [81,37];
	camera.keysRight = [68,39];
	camera.inertia = 0.01;
	camera.angularSensibility  = 1000; 
	camera.speed = 2;
	let speed = 1;
	camera.sound;

	window.addEventListener('keydown',function(event){
		if (event.keyCode==32){
			camera.position.y += speed;
		}
        }
      );

	  window.addEventListener('click', function (event) {
        var pickResult = scn.pick(event.clientX, event.clientY);
        if (pickResult.hit) {
            if (pickResult.pickedMesh.type === "amer") {
                var pos = pickResult.pickedMesh.getAbsolutePosition();
                // var forward = new BABYLON.Vector3(0, 0, 1);

				// var rotation = pickResult.pickedMesh.rotation;
				// var rotationMatrix = BABYLON.Matrix.RotationYawPitchRoll(rotation.y, rotation.x, rotation.z);
				// forward = BABYLON.Vector3.TransformCoordinates(forward, rotationMatrix);

                // // Inverser la direction pour toujours être devant le tableau
                // forward.scaleInPlace(-1);

                // // Positionner la caméra à 1.5m devant le tableau
                // var newPos = pos.add(forward.scale(3));

                // camera.position = newPos;
                // camera.position.y = 1.9; // Ajuste la hauteur de la caméra

                // // Faire regarder la caméra vers le tableau

				camera.position.x = pos.x;
				camera.position.z = pos.z-2;
				camera.setTarget(pos);
				
            }
        }
    });

	// window.addEventListener('click',function(event){
	// 	var pickResult=scn.pick(event.clientX, event.clientY);
	// 	if (pickResult.hit){
	// 		if(camera.sound.has(pickResult.pickedMesh.type)){
	// 			console.log("test_sound");
	// 			camera.sound.get(pickResult.pickedMesh.type).play();
	// 			}	
	// 		}		  
	// 	});
		return camera
}

function creerReticule(nom, opts, scn){
	const reticule = BABYLON.MeshBuilder.CreateSphere("reticule", {segments:4, diameter:0.0025}, scn);
	const retMat   = new BABYLON.StandardMaterial("reticuleMat", scn);
	retMat.emissiveColor = BABYLON.Color3.Red();
	retMat.specularColor = BABYLON.Color3.Black();
    	retMat.diffuseColor  = BABYLON.Color3.Black();
	reticule.material = retMat ; 
	reticule.isPickable = false;
	reticule.position.z = 0.3;  
	
	return reticule;
}

function creerCiel(nom,options,scn){
    const skyMaterial = new BABYLON.StandardMaterial("mat_skybox", scn);
    skyMaterial.backFaceCulling = false ;
    skyMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/skybox/skybox", scn);
    skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
    skyMaterial.specularColor = new BABYLON.Color3(0,0,0);

    const skyBox = BABYLON.Mesh.CreateBox("skybox",100,scn);
    skyBox.material = skyMaterial ;

    return skyBox ;
}

function creerSol(name,options,scn){
	options = options || {} ;
	const width    = options.largeur    || 100.0 ; 
	const height   = options.profondeur || width ;  

	const subdivisions = Math.round(width / 100) ;  

	let materiau = options.materiau || null ;
	
	const sol = BABYLON.MeshBuilder.CreateGround(name,{width, height,subdivisions},scn) ;
	
	if(materiau){
		sol.material = materiau ; 
	} else {
		materiau = new BABYLON.StandardMaterial("materiau-defaut-" + name, scn) ; 
		materiau.diffuseTexture = new BABYLON.Texture('./assets/materiau/grass.jpg',scn); 
		sol.material = materiau ; 
	} ;

	sol.checkCollisions = true ;
	
	return sol ; 
	
}

function creerPrairie(name,options,scn){
	let sol = BABYLON.Mesh.CreateGround(name,220.0,220.0,2.0,scn) ;
	sol.checkCollisions = true ;
	sol.material = new BABYLON.StandardMaterial("blanc",scn) ;
	// sol.material.diffuseColor  = new BABYLON.Color3(1.0,0,0) ;
	sol.material.diffuseTexture = new BABYLON.Texture('./assets/materiau/grass.jpg',scn);
	sol.material.specularTexture = new BABYLON.Texture('./assets/materiau/grass.jpg',scn);
	sol.material.emissiveTexture = new BABYLON.Texture('./assets/materiau/grass.jpg',scn);
	sol.material.ambientTexture = new BABYLON.Texture('./assets/materiau/grass.jpg',scn);
	sol.material.diffuseTexture.uScale = 10.0;
	sol.material.diffuseTexture.vScale = 10.0;
	sol.material.specularTexture.uScale = 10.0;
	sol.material.specularTexture.vScale = 10.0;
	sol.material.emissiveTexture.uScale = 10.0;
	sol.material.emissiveTexture.vScale = 10.0;
	sol.material.ambientTexture.uScale = 10.0;
	sol.material.ambientTexture.vScale = 10.0;
	sol.receiveShadows = true;
	sol.metadata = {"type": 'ground'}
	return sol
}

function creerMateriauStandard(nom,options,scn){
	let couleur = options.couleur || null ; 
	let texture = options.texture || null ; 
	let uScale  = options.uScale  || 1.0 ; 
	let vScale  = options.vScale  || 1.0 ; 

	let materiau = new BABYLON.StandardMaterial(nom,scn) ; 
	if(couleur != null) materiau.diffuseColor = couleur ; 
	if(texture!= null){
		materiau.diffuseTexture = new BABYLON.Texture(texture,scn) ; 
		materiau.diffuseTexture.uScale = uScale ; 
		materiau.diffuseTexture.vScale = vScale ; 
	}
	return materiau ; 
}

function creerPuitpetrole(nom,opts,scn){
	
	let options  = opts || {} ;
	var group = new BABYLON.TransformNode("group-"+nom)

	//creation du materiau pour le puit
	var materiau = new BABYLON.StandardMaterial("materiauMetalique", scn);
	materiau.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
	var noiseTexture = new BABYLON.NoiseProceduralTexture("perlin", 256, scn);
	noiseTexture.brightness = 0.5;
	noiseTexture.octaves = 8;
	materiau.diffuseTexture = noiseTexture;
	materiau.specularColor = new BABYLON.Color3(0.8, 0.8, 0.8);
	materiau.specularPower = 64;


	// Créez les maillages
	const upperArm = BABYLON.MeshBuilder.CreateBox("upperArm", { height: 4, width: 0.2, depth: 0.5 }, scn);
	const lowerArm = BABYLON.MeshBuilder.CreateBox("lowerArm", { height: 3, width: 0.2, depth: 0.5 }, scn);
	const weight = BABYLON.MeshBuilder.CreateBox("weight", { height: 2, width: 0.2, depth: 0.4 }, scn);
	const link = BABYLON.MeshBuilder.CreateBox("weight", { height: 2.5, width: 0.2, depth: 0.2 }, scn);
	const rot =BABYLON.MeshBuilder.CreateBox("rot", { height: 1.5, width: 0.3, depth: 2.92 }, scn);
	rot.parent=group;
	rot.material=materiau;
	upperArm.parent = group ;
	upperArm.material=materiau;
	lowerArm.parent = group ;
	lowerArm.material=materiau;
	weight.parent = group ;
	weight.material=materiau;
	link.parent = group ;
	link.material=materiau;
	// Positionnez les maillages
	upperArm.setParent(lowerArm);
	upperArm.position.y = 1.5; // Le haut du bras commence à 1 unité au-dessus de l'origine
	upperArm.rotation.x= Math.PI/2
	lowerArm.position.y = 1.5; // L'avant-bras commence à 1 unité en dessous du haut du bras
	rot.position.z=2.1;
	rot.position.y=0.75;

	weight.setParent(upperArm);
	weight.position.y=-2;
	weight.position.z=-0.1;
	link.setParent(upperArm);
	link.position.y=3;
	link.position.z=0;
	//lowerArm.setPivotPoint(new BABYLON.Vector3(0, 1, 0));
	upperArm.setPivotPoint(new BABYLON.Vector3(0, 0, 0));
	link.setPivotPoint(new BABYLON.Vector3(0, -1.25, 0));
	// Créez le squelette
	const skeleton = new BABYLON.Skeleton("skeleton", "skeletonId", scn);

	// Créez les os
	const upperArmBone = new BABYLON.Bone("upperArmBone", skeleton, null, BABYLON.Matrix.Translation(0, 2, 0));
	const lowerArmBone = new BABYLON.Bone("lowerArmBone", skeleton, upperArmBone, BABYLON.Matrix.Translation(0, 4, 0));
	const linkBone = new BABYLON.Bone("linkBone", skeleton, upperArmBone, BABYLON.Matrix.Translation(0, 0, 0));

	// Lie les maillages aux os
	upperArmBone.linkTransformNode(upperArm);
	lowerArmBone.linkTransformNode(lowerArm); 
	linkBone.linkTransformNode(link); 

	
	// Animation
	const upperAnimation = new BABYLON.Animation("testAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	const upperKeys = [];
	upperKeys.push({ frame: 0, value: Math.PI / 2 });
	upperKeys.push({ frame: 15, value: Math.PI / 3 });
	upperKeys.push({ frame: 30, value: Math.PI / 2});
	upperKeys.push({ frame: 45, value: 2*Math.PI / 3 });
	upperKeys.push({ frame: 60, value: Math.PI / 2});
	upperAnimation.setKeys(upperKeys);

	const linkAnimation = new BABYLON.Animation("linkAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	const linkKeys = [];
	linkKeys.push({ frame: 0, value: Math.PI/4});
	linkKeys.push({ frame: 20, value: 2*Math.PI/3 });
	linkKeys.push({ frame: 40, value: Math.PI/2 });
	linkKeys.push({ frame: 60, value: Math.PI/4});
	
	linkAnimation.setKeys(linkKeys);

	const testAnimation2 = new BABYLON.Animation("testAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	const testKeys2 = [];
	testKeys2.push({ frame: 0, value: Math.PI / 4 });
	testKeys2.push({ frame: 30, value: 0 });
	testKeys2.push({ frame: 60, value: -Math.PI / 4 });
	testAnimation2.setKeys(testKeys2);

	upperArm.animations.push(upperAnimation);
	link.animations.push(linkAnimation);
	//lowerArm.animations.push(testAnimation2);
	scn.beginAnimation(upperArm, 0, 60, true);
	scn.beginAnimation(link, 0, 60, true);
	return group ;
}

function porteAutomatique(nom, opts, scn) {
    
    let options = opts || {};
        var group = new BABYLON.TransformNode("group-" + nom, scn);

        // Création du matériau pour la porte
		
        var materiau = new BABYLON.StandardMaterial("materiauPorte", scn);
		var texture = new BABYLON.Texture("./assets/porte.png", scn); // Remplacez "path/to/porte.png" par le chemin correct
		materiau.diffuseTexture = texture;

        // Création de la porte
        const porte = BABYLON.MeshBuilder.CreateBox(nom, {
            height: options.height || 3,
            width: options.width || 2.5,
            depth: options.depth || 0.1
        }, scn);
        porte.position = new BABYLON.Vector3(options.x || 0, options.y || 1, options.z || 0);
        porte.material = materiau;
        porte.parent = group;
		porte.checkCollisions=true;
        // Animation d'ouverture et de fermeture
        const openPosition = options.openPosition || porte.position.add(new BABYLON.Vector3(2, 0, 0));
		const closedPosition = porte.position.clone();

		const openAnimation = () => {
			BABYLON.Animation.CreateAndStartAnimation("openAnimation", porte, "position", 30, 15, porte.position, openPosition, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		};

		const closeAnimation = () => {
			BABYLON.Animation.CreateAndStartAnimation("closeAnimation", porte, "position", 30, 15, porte.position, closedPosition, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		};

		// Détecter la proximité pour ouvrir/fermer la porte
		scn.registerBeforeRender(() => {
			const distance = BABYLON.Vector3.Distance(scn.activeCamera.position, porte.getAbsolutePosition());
			if (distance < options.activationDistance && !porte.isOpen) {
				porte.isOpen = true;
				openAnimation();
			} else if (distance >= options.activationDistance && porte.isOpen) {
				porte.isOpen = false;
				closeAnimation();
			}
		});

				return group;	
		}


function creerSphere(nom,opts,scn){

	let options  = opts || {} ; 
	let diametre = opts.diametre || 1.0 ; 
	let materiau = opts.materiau || null ; 
	
	if(materiau == null){
		materiau = new BABYLON.StandardMaterial("blanc",scn) ;
		materiau.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0) ; 
	}

	let sph = BABYLON.Mesh.CreateSphere(nom,16,diametre,scn) ;
	sph.material              = materiau
	sph.type = "amer";

	return sph;

}

function creerBoite(nom, opts, scn){
	let options  = opts || {} ; 
	let width    = opts.largeur    || 1.0 ; 
	let height   = opts.hauteur   || 1.0 ; 
	let depth    = opts.profondeur    || 1.0 ; 
	let materiau = opts.materiau || null ; 
	
	if(materiau == null){
		materiau = new BABYLON.StandardMaterial("blanc",scn) ;
		materiau.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0) ; 

	}

	let box      = BABYLON.MeshBuilder.CreateBox(nom,{width,height,depth},scn) ;
	box.material = materiau

	return box;
}

function creerPoster(nom,opts,scn){

	
	let options = opts.opts || {} ; 
	let hauteur = options["hauteur"] || 1.0 ; 
	let largeur = options["largeur"] || 1.0 ; 	
	let textureName = options["tableau"] || "";
	let sound =  options["musique"]
	let descript = options["descript"] || "";
	console.log(nom);
	console.log(textureName);
	var group = new BABYLON.TransformNode("group-"+nom)
	var tableau1 = BABYLON.MeshBuilder.CreatePlane("tableau-" + nom, {width:largeur,height:hauteur}, scn);
	var verso = BABYLON.MeshBuilder.CreatePlane("verso-" + nom, {width:largeur,height:hauteur}, scn);
	tableau1.parent = group ; 
	tableau1.position.z = -0.01 ; 
	verso.parent = group ; 
	verso.rotation.y = Math.PI ;
	
	tableau1.type = "tableau";
	verso.type = "tableau";

	var mat = new BABYLON.StandardMaterial("tex-tableau-" + nom, scn);
	mat.diffuseTexture = new BABYLON.Texture(textureName, scn);
	mat.diffuseTexture.uScale=-1;
	tableau1.material = mat;
	tableau1.checkCollisions = true;
	const music = new BABYLON.Sound("Music", sound, scn, null, {
		loop: true,
		autoplay: true,
		spatialSound: true,
   		maxDistance: 5 // distance maximale d'écoute
	  });
	MTH.SoundToMesh(music, group);

	let descpition = document.createElement('div');
    descpition.innerText = descript;
	descpition.style.position = 'absolute';
	descpition.style.color = 'white';
	descpition.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	descpition.style.padding = '30px';
	descpition.style.display = 'none';
	descpition.style.fontSize = '25px';
	document.body.appendChild(descpition);

	// Ajout des observables pour l'interaction
	tableau1.onPointerOverObservable = new BABYLON.Observable();
	tableau1.onPointerOutObservable = new BABYLON.Observable();
	tableau1.onClickObservable = new BABYLON.Observable();  // Ajout de l'observable pour le clic

	tableau1.actionManager = new BABYLON.ActionManager(scn);
	tableau1.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function () {
			tableau1.onPointerOverObservable.notifyObservers();
		})
	);
	tableau1.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function () {
			tableau1.onPointerOutObservable.notifyObservers();
		})
	);
	tableau1.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
			tableau1.onClickObservable.notifyObservers();
		})
	);
	tableau1.onPointerOverObservable.add(function () {
		var distance = BABYLON.Vector3.Distance(scn.activeCamera.position, tableau1.getAbsolutePosition());
		if (distance < 6) {
			setTimeout(2000);
			descpition.style.display = 'block';
			descpition.style.left = '30px';
			descpition.style.top = '20px';
		}
	});

	tableau1.onPointerOutObservable.add(function () {
		descpition.style.display = 'none';
		// Arrêter la lecture si elle est en cours
		window.speechSynthesis.cancel();
	});
	return group ;
}	

function creerCloisonmezzanine(nom,opts,scn){
	
	let options   = opts || {} ; 
	let hauteur   = options.hauteur || 3.0 ; 
	let largeur   = options.largeur || 5.0 ; 
	let epaisseur = options.epaisseur || 0.1 ;

	let materiau   = options.materiau || new BABYLON.StandardMaterial("materiau-pos"+nom,scn); 

    	let groupe = new BABYLON.TransformNode("groupe-"+nom) ; 

	let cloison = BABYLON.MeshBuilder.CreateBox(nom,{width:largeur,height:hauteur,depth:epaisseur},scn) ;
	let porte = BABYLON.MeshBuilder.CreateBox(nom,{width:7,height:2,depth:epaisseur},scn);
	
	porte.position.set(1.5,(hauteur-2)/2,0);
	cloison=creuser(cloison,porte);
	cloison.material = materiau ; 
	cloison.parent = groupe ; 
	cloison.position.y = hauteur / 2.0 ; 

    	cloison.checkCollisions = true ;

    return groupe ;  
}

function creerCloisonPorte(nom,opts,scn){
	
	let options   = opts || {} ; 
	let hauteur   = options.hauteur || 3.0 ; 
	let largeur   = options.largeur || 5.0 ; 
	let epaisseur = options.epaisseur || 0.1 ;

	let materiau   = options.materiau || new BABYLON.StandardMaterial("materiau-pos"+nom,scn); 

    let groupe = new BABYLON.TransformNode("groupe-"+nom) ; 

	let cloison = BABYLON.MeshBuilder.CreateBox(nom,{width:largeur,height:hauteur,depth:epaisseur},scn) ;
	let porte = BABYLON.MeshBuilder.CreateBox(nom,{width:2.5,height:2.5,depth:epaisseur},scn);

	porte.position.y=-(hauteur-2.5)/2;
	cloison=creuser(cloison,porte);
	cloison.material = materiau ; 
	cloison.parent = groupe ; 
	cloison.position.y = hauteur / 2.0 ; 



    cloison.checkCollisions = true ;

    return groupe ;  
}

function escalier(nom,scn){
	var path = [];
	path.push(new BABYLON.Vector3(0, 0, 0)); // Point de départ de l'escalier
	path.push(new BABYLON.Vector3(0, 0, 2)); // Hauteur de l'escalier

// Définir les paramètres de l'extrusion
	var shape = [

 		new BABYLON.Vector3(5, 0, 0),
		new BABYLON.Vector3(5, 0.5, 0),
		new BABYLON.Vector3(4.5, 0.5, 0),
		new BABYLON.Vector3(4.5, 1, 0),
		new BABYLON.Vector3(4, 1, 0),
		new BABYLON.Vector3(4, 1.5, 0),
		new BABYLON.Vector3(3.5, 1.5, 0),
		new BABYLON.Vector3(3.5, 2, 0),
		new BABYLON.Vector3(3, 2, 0),
		new BABYLON.Vector3(3, 2.5, 0),
		new BABYLON.Vector3(2.5, 2.5, 0),
		new BABYLON.Vector3(2.5, 3, 0),
		new BABYLON.Vector3(2, 3, 0),
		new BABYLON.Vector3(2, 3.5, 0),
		new BABYLON.Vector3(1.5, 3.5, 0),
		new BABYLON.Vector3(1.5, 4, 0),
		new BABYLON.Vector3(1, 4, 0),
		new BABYLON.Vector3(1, 4.5, 0),
		new BABYLON.Vector3(0.5, 4.5, 0),
		new BABYLON.Vector3(0.5, 5, 0),
		new BABYLON.Vector3(0, 5, 0) 
	
	];

	// Création de l'objet en extrudant la forme le long du chemin
	var stairOptions = {
		shape: shape,
		path: path,
		scaleFunction: function(i, distance) {
			return new BABYLON.Vector3(1, 1, 1); // Pas de mise à l'échelle sur la forme
		},
		sideOrientation: BABYLON.Mesh.DOUBLESIDE
	};

	var stair = BABYLON.MeshBuilder.ExtrudeShape("stair", stairOptions, scn);
	stair.checkCollisions = true ;
	
	return stair
}

function creerCloison(nom,opts,scn){
	
	let options   = opts || {} ; 
	let hauteur   = options.hauteur || 3.0 ; 
	let largeur   = options.largeur || 30.0 ; 
	let epaisseur = options.epaisseur || 0.1 ;

	let materiau   = options.materiau || new BABYLON.StandardMaterial("materiau-pos"+nom,scn); 

    let groupe = new BABYLON.TransformNode("groupe-"+nom) ; 

	let cloison = BABYLON.MeshBuilder.CreateBox(nom,{width:largeur,height:hauteur,depth:epaisseur},scn) ;
	cloison.material = materiau ; 
	cloison.parent = groupe ; 
	cloison.position.y = hauteur / 2.0 ; 
    cloison.checkCollisions = true ;
    return groupe ;  
}

function creuser(mesh0, mesh1){
    const csg0 = BABYLON.CSG.FromMesh(mesh0);
    const csg1 = BABYLON.CSG.FromMesh(mesh1) ; 
    csg0.subtractInPlace(csg1); // Soustrait csg1 dans csg0
    const csgMesh = csg0.toMesh() ; // Transforme un objet en mesh et le met dans la scn
    mesh0.dispose() ; // Supprime le mesh
    mesh1.dispose() ; 
    return csgMesh ;  
}

function creerEntree(nom,opts,scn){
	
	let options   = opts || {} ; 
	let hauteur   = options.hauteur || 5.0 ; 
	let largeur   = options.largeur || 30.0 ; 
	let epaisseur = options.epaisseur || 0.1 ;

	let hauteur_porte   = options.hauteur || 2.5 ; 
	let largeur_porte   = options.largeur || 2.5 ; 
	let epaisseur_porte = options.epaisseur || 0.1 ;

	

	let materiau   = options.materiau || new BABYLON.StandardMaterial("materiau-pos"+nom,scn); 
    let groupe = new BABYLON.TransformNode("groupe-"+nom) ; 
	let cloison = BABYLON.MeshBuilder.CreateBox(nom,{width:largeur,height:hauteur,depth:epaisseur},scn) ;
	let porte = BABYLON.MeshBuilder.CreateBox(nom,{width:largeur_porte,height:hauteur_porte,depth:epaisseur_porte},scn) ;
	porte.position.y = -(hauteur - hauteur_porte)/2 ;
	cloison = creuser(cloison, porte);
	cloison.material = materiau ; 
	cloison.parent = groupe ; 
	cloison.position.y = hauteur / 2.0 ; 
    cloison.checkCollisions = true ;

/*	let porte = BABYLON.MeshBuilder.CreateBox(nom,{width:2.0,height:2.0,depth:epaisseur},scn) ;
 	porte.material = materiau ; 
	porte.parent = groupe ; 
	porte.position.y = 2.0 / 2.0 ; 
    porte.checkCollisions = true ;

	const mur = creuser(cloison, porte);

    mur.parent = groupe ;  */

    return groupe ;  
}

const PRIMS = {
"camera":creerCamera,
"reticule":creerReticule,
"wall":creerCloison,
"wallDoor":creerCloisonPorte,
"mezzanine":creerCloisonmezzanine,
"sphere":creerSphere,
"box":creerBoite,
"poster":creerPoster,
"standardMaterial":creerMateriauStandard,
"meadow":creerPrairie,
"ground":creerSol,
"sky":creerCiel,
"creuser" : creuser,
"entree" : creerEntree,
"stairs" : escalier,
"petrole" : creerPuitpetrole,
"porteAuto" : porteAutomatique
}

export {PRIMS} ; 
