function detectView(scene) {
  var pickResult=scene.pick(event.clientX, event.clientY);
  if (pickResult.hit){
    if(pickResult.pickedMesh.sound)
        pickResult.pickedMesh.sound.play();
    }
  }

  function SoundToMesh(sound, transformNode){
    const children = transformNode.getChildren();
    sound.attachToMesh(children[0]);
    sound.setDirectionalCone(90, 180, 0);
    sound.setLocalDirectionToMesh(new BABYLON.Vector3(0, 0, -1));
  }

  export async function chargerJSON(){
    const rawData = await axios.get("./json_files/monde.json");
    return rawData.data;
  }
  

  const MTH = {
    "detectView":detectView,
    "SoundToMesh":SoundToMesh,
    "loadJSON":chargerJSON
    }
    
    export {MTH} ; 