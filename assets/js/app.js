var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light, controls;
 
var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;
 
function init(){

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);

  let skyMaterialArray = [];
  for (var i = 0; i < 6; i++)
   skyMaterialArray.push( new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('assets/textures/sky.jpg'),
    side: THREE.BackSide
   }));
   let skyGeometry = new THREE.CubeGeometry( 950,900, 1000 );
   let skyMaterial = new THREE.MeshFaceMaterial( skyMaterialArray );
   let skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
   scene.add(skyBox);



  //BOX RIGHT WALL
  textureWall= new THREE.TextureLoader().load( 'assets/textures/wall.jpg' );
  meshWallRight = new THREE.Mesh(
     new THREE.BoxGeometry(10,3,1),
     new THREE.MeshPhongMaterial({map:textureWall, wireframe:USE_WIREFRAME})
  );
  meshWallRight.position.y += 1.5;
  meshWallRight.position.x += 4.6;
  meshWallRight.receiveShadow = true;
  meshWallRight.castShadow = true;
  meshWallRight.rotation.y = 42.4;
  
  scene.add(meshWallRight);


  //BOX LEFT WALL
  textureWall= new THREE.TextureLoader().load( 'assets/textures/wall.jpg' );
  meshWallLeft = new THREE.Mesh(
   new THREE.BoxGeometry(10,3,1),
   new THREE.MeshPhongMaterial({map:textureWall, wireframe:USE_WIREFRAME})
   );
   meshWallLeft.position.y += 1.5;
   meshWallLeft.position.x += -4.5;
   meshWallLeft.receiveShadow = true;
   meshWallLeft.castShadow = true;
   meshWallLeft.rotation.y = 42.4;

   scene.add(meshWallLeft);

   //BOX SOUTH WALL
   textureWall= new THREE.TextureLoader().load( 'assets/textures/wall.jpg' );
   meshWallDown = new THREE.Mesh(
      new THREE.BoxGeometry(10,3,1),
      new THREE.MeshPhongMaterial({map:textureWall, wireframe:USE_WIREFRAME})
      );
      meshWallDown.position.y += 1.5;
      meshWallDown.position.x += 0;
      meshWallDown.position.z += 4.5;
      meshWallDown.receiveShadow = true;
      meshWallDown.castShadow = true;
      meshWallDown.rotation.y = 59.7;
   
      scene.add(meshWallDown);

   //BOX BED
   textureBed= new THREE.TextureLoader().load( 'assets/textures/bedsheet.jpg' );
   meshBed = new THREE.Mesh(
      new THREE.BoxGeometry(2,3,0.4),
      new THREE.MeshPhongMaterial({map:textureBed, wireframe:USE_WIREFRAME})
      );
      meshBed.position.y += 0.2;
      meshBed.position.x += 0;
      meshBed.position.z += -2.5;
      meshBed.receiveShadow = true;
      meshBed.castShadow = true;
      meshBed.rotation.y = 59.7;
      meshBed.rotation.x = 14.1
   
      scene.add(meshBed);

   //BOX DRESSER
   textureChest= new THREE.TextureLoader().load( 'assets/textures/chest.jpg' );
   meshDresser = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,0.5),
      new THREE.MeshPhongMaterial({map:textureChest, wireframe:USE_WIREFRAME})
   );
   meshDresser.position.y += 0.5;
   meshDresser.position.x += -1.9;
   meshDresser.position.z += -3.5;
   meshDresser.receiveShadow = true;
   meshDresser.castShadow = true;
   scene.add(meshDresser);

   //CYCLINDER PILLOW

   meshPillow = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3,0.4,0.3,12),
      new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
   );
   meshPillow.position.y += 0.5;
   meshPillow.position.x += -0.2;
   meshPillow.position.z += -3.6;
   meshPillow.receiveShadow = true;
   meshPillow.castShadow = true;
   scene.add(meshPillow);

   //BOX DOOR
   textureDoor= new THREE.TextureLoader().load( 'assets/textures/newgate.jpg' );
   meshDoor = new THREE.Mesh(
      new THREE.BoxGeometry(0.3,2,3),
      new THREE.MeshPhongMaterial({map:textureDoor, wireframe:USE_WIREFRAME})
   );
   meshDoor.position.y += 1;
   meshDoor.position.x += -4.1;

   // The cube can have shadows cast onto it, and it can cast shadows
   meshDoor.receiveShadow = true;
   meshDoor.castShadow = true;
   scene.add(meshDoor);

   //BOX DOOR OUTSIDE
   textureDoor= new THREE.TextureLoader().load( 'assets/textures/newgate.jpg' );
   meshDoorOutside = new THREE.Mesh(
      new THREE.BoxGeometry(0.3,2,3),
      new THREE.MeshPhongMaterial({map:textureDoor, wireframe:USE_WIREFRAME})
   );
   meshDoorOutside.position.y += 1;
   meshDoorOutside.position.x += -5.1;

   // The cube can have shadows cast onto it, and it can cast shadows
   meshDoorOutside.receiveShadow = true;
   meshDoorOutside.castShadow = true;
   scene.add(meshDoorOutside);
 

   
   //BOX NORTH WALL
   textureWall= new THREE.TextureLoader().load( 'assets/textures/wall.jpg' );
   meshWallUp = new THREE.Mesh(
      new THREE.BoxGeometry(10,3,1),
      new THREE.MeshPhongMaterial({map:textureWall, wireframe:USE_WIREFRAME})
      );
      meshWallUp.position.y += 1.5;
      meshWallUp.position.x += 0;
      meshWallUp.position.z += -4.5;
      meshWallUp.receiveShadow = true;
      meshWallUp.castShadow = true;
      meshWallUp.rotation.y = 59.7;
   
      scene.add(meshWallUp);




   //BOX WINDOW LEFT
   textureWindow = new THREE.TextureLoader().load( 'assets/textures/window.jpg' );
   meshWindowLeft = new THREE.Mesh(
      new THREE.BoxGeometry(1,2.5,4),
      new THREE.MeshPhongMaterial({map:textureWindow, wireframe:USE_WIREFRAME})
   );
   meshWindowLeft.position.y += 1.5;
   meshWindowLeft.position.x += 4.4;
   meshWindowLeft.position.z += -2;
   // The cube can have shadows cast onto it, and it can cast shadows
   meshWindowLeft.receiveShadow = true;
   meshWindowLeft.castShadow = true;
   scene.add(meshWindowLeft);

   //BOX WINDOW RIGHT
   textureWindow = new THREE.TextureLoader().load( 'assets/textures/window.jpg' );
   meshWindowRight = new THREE.Mesh(
      new THREE.BoxGeometry(0.5,2.5,4),
      new THREE.MeshPhongMaterial({map:textureWindow, wireframe:USE_WIREFRAME})
   );
   meshWindowRight.position.y += 1.5;
   meshWindowRight.position.x += 4.1;
   meshWindowRight.position.z += 2;
   
   // The cube can have shadows cast onto it, and it can cast shadows
   meshWindowRight.receiveShadow = true;
   meshWindowRight.castShadow = true;
   scene.add(meshWindowRight);


   //BOX WINDOW LEFT OUT
   textureWindow = new THREE.TextureLoader().load( 'assets/textures/window.jpg' );
   meshWindowLeftOut = new THREE.Mesh(
      new THREE.BoxGeometry(1,2.5,4),
      new THREE.MeshPhongMaterial({map:textureWindow, wireframe:USE_WIREFRAME})
   );
   meshWindowLeftOut.position.y += 1.5;
   meshWindowLeftOut.position.x += 4.7;
   meshWindowLeftOut.position.z += -2;
   // The cube can have shadows cast onto it, and it can cast shadows
   meshWindowLeftOut.receiveShadow = true;
   meshWindowLeftOut.castShadow = true;
   scene.add(meshWindowLeftOut);

   //BOX WINDOW RIGHT OUT
   textureWindow = new THREE.TextureLoader().load( 'assets/textures/window.jpg' );
   meshWindowRightOut = new THREE.Mesh(
      new THREE.BoxGeometry(0.5,2.5,4),
      new THREE.MeshPhongMaterial({map:textureWindow, wireframe:USE_WIREFRAME})
   );
   meshWindowRightOut.position.y += 1.5;
   meshWindowRightOut.position.x += 4.9;
   meshWindowRightOut.position.z += 2;
   
   // The cube can have shadows cast onto it, and it can cast shadows
   meshWindowRightOut.receiveShadow = true;
   meshWindowRightOut.castShadow = true;
   scene.add(meshWindowRightOut);


   //BOX TV
   textureTV = new THREE.TextureLoader().load( 'assets/textures/tv.jpg' );
   meshTV = new THREE.Mesh(
      new THREE.BoxGeometry(5,2.5,0.1),
      new THREE.MeshPhongMaterial({map:textureTV, wireframe:USE_WIREFRAME})
   );
   meshTV.position.y += 1.5;
   meshTV.position.z += 4;

   // The cube can have shadows cast onto it, and it can cast shadows
   meshTV.receiveShadow = true;
   meshTV.castShadow = true;
   scene.add(meshTV);


//FLOOR
 textureFloor = new THREE.TextureLoader().load( 'assets/textures/wood.jpg' );
  meshFloor = new THREE.Mesh(
     new THREE.PlaneGeometry(10,10, 10,10),
     new THREE.MeshPhongMaterial({map:textureFloor, wireframe:USE_WIREFRAME})
     
  );
  meshFloor.rotation.x -= Math.PI / 2;
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);

  //FLOOR Outside
 textureFloorOutside = new THREE.TextureLoader().load( 'assets/textures/newgrass.jpg' );
 meshFloorOutside = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100, 100,100),
    new THREE.MeshPhongMaterial({map:textureFloorOutside, wireframe:USE_WIREFRAME})
    
 );
 meshFloorOutside.rotation.x -= Math.PI / 2;

 meshFloorOutside.position.y += -0.1;
 meshFloorOutside.receiveShadow = true;
 scene.add(meshFloorOutside);

   //RED CARPET 
   textureCarpet = new THREE.TextureLoader().load( 'assets/textures/cobble.jpg' );
   meshCarpet = new THREE.Mesh(
      new THREE.BoxGeometry(5,2.5,0.1),
      new THREE.MeshPhongMaterial({map:textureCarpet, wireframe:USE_WIREFRAME})
   );
   meshCarpet.position.y += 0;
   meshCarpet.position.x += -7.8;
   meshCarpet.rotation.x += 11;

   // The cube can have shadows cast onto it, and it can cast shadows
   meshCarpet.receiveShadow = true;
   meshCarpet.castShadow = true;
   scene.add(meshCarpet);
 
 

 





































  // LIGHTS (ESSENTIAL FOR EACH OBJECT)
  ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
 
  light = new THREE.PointLight(0xffffff, 0.8, 18);
  light.position.set(9,6,-1);
  light.castShadow = true;

  // Will not light anything closer than 0.1 units or further than 25 units
  
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  scene.add(light);

  let spotLight = new THREE.SpotLight( 0xFFFFFF, 0.2);
  spotLight.position.set( 7, 200, 30 );
  spotLight.target.position.set( 10, -350, -55 );
  spotLight.castShadow = true;
  spotLight.position.z = 1005;
  spotLight.position.x = 340;
  scene.add( spotLight.target );
  scene.add( spotLight );
  //Set up shadow properties for the spotLight
  spotLight.shadow.mapSize.width = 112; // default
  spotLight.shadow.mapSize.height = 212; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 1500; // default
 




  camera.position.set(0, player.height, -4);
  camera.lookAt(new THREE.Vector3(0,player.height,0));
 
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1280, 720);

 
  // Enable Shadows in the Renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
 
  document.body.appendChild(renderer.domElement);
  
   controls = new THREE.OrbitControls (camera);
  animate();
  
}











function animate(){
  requestAnimationFrame(animate);
  controls.update();
  
 
  if(keyboard[87]){ // W key
     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[83]){ // S key
     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[65]){ // A key
     camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
  }
  if(keyboard[68]){ // D key
     camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
  }
 
  if(keyboard[37]){ // left arrow key
     camera.rotation.y -= player.turnSpeed;
  }
  if(keyboard[39]){ // right arrow key
     camera.rotation.y += player.turnSpeed;
  }
 
  renderer.render(scene, camera);
}
 
function keyDown(event){
  keyboard[event.keyCode] = true;
}
 
function keyUp(event){
  keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;

