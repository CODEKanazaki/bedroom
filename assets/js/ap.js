let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

let keyboard = {};
let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };

// //CYLINDER GEOMETRY
const radiusTop = 4;
const radiusBottom = 4;
const height = 50;
const radialSegments = 12;
const geometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments);

// CYLINDER RIGHT GEOMETRY
const rightRadiusTop = 4;
const rightRadiusBottom = 4;
const rightHeight = 50;
const rightRadialSegments = 12;
const cylinderGeometry = new THREE.CylinderBufferGeometry(rightRadiusTop, rightRadiusBottom, rightHeight, rightRadialSegments);

// CUBE BED GEOMETRY
const wallWidth = 50;
const wallHeight = 90;
const wallDepth = 10;
const wallGeometry = new THREE.BoxBufferGeometry(wallWidth, wallHeight, wallDepth);

//CONE ROOF LEFT GEOMETRY
const roofRadius = 6;
const roofHeight = 20;
const roofSegments = 16;
const roofGeometry = new THREE.ConeBufferGeometry(roofRadius, roofHeight, roofSegments);

//CONE ROOF RIGHT GEOMETRY
const roofRightRadius = 6;
const roofRightHeight = 20;
const roofRightSegments = 16;
const roofRightGeometry = new THREE.ConeBufferGeometry(roofRightRadius, roofRightHeight, roofRightSegments);


// CUBE CHEST GEOMETRY
const gateWidth = 100;
const gateHeight = 100;
const gateDepth = 100;
const gateGeometry = new THREE.BoxBufferGeometry(gateWidth, gateHeight, gateDepth);

// CUBE door GEOMETRY
const doorWidth = 1000;
const doorHeight = 100;
const doorDepth = 100;
const doorGeometry = new THREE.BoxBufferGeometry(doorWidth, doorHeight, doorDepth);



//TEXTURES AND MATERIALS
let texture = new THREE.TextureLoader().load( 'assets/textures/oldbrick.jpg' );
let TextureFloor = new THREE.TextureLoader().load( 'assets/textures/wood.jpg' );
let textureGate = new THREE.TextureLoader().load( 'assets/textures/newgate.jpg');
let pathpic = new THREE.TextureLoader().load( 'assets/textures/cobble.jpg');
let woodFloor = new THREE.MeshBasicMaterial( { map: TextureFloor } );
let brick = new THREE.MeshBasicMaterial( { map: texture } );
let pathbBrick = new THREE.MeshBasicMaterial( { map: pathpic } );
let bed = new THREE.TextureLoader().load( 'assets/textures/bed.jpg');
let bedtexture = new THREE.MeshBasicMaterial( { map: bed } );
let texturechest = new THREE.TextureLoader().load( 'assets/textures/chest.jpg' );
let minechest = new THREE.MeshBasicMaterial( { map: texturechest } );
let entrance = new THREE.TextureLoader().load( 'assets/textures/gate.jpg');
let mydoor = new THREE.MeshBasicMaterial( { map: entrance } );


//LAND 
let plane = new THREE.PlaneGeometry(500, 500, 2, 2);
plane.receiveShadow = true;
let planeFront = new THREE.PlaneGeometry(440, 200, 2, 2);
planeFront.receiveShadow = true;
let planeLeft= new THREE.PlaneGeometry(330, 200, 2, 2); 
planeLeft.receiveShadow = true;


//BUILDINGS
let castleLeftBrick = new THREE.Mesh( geometry); 
let floor = new THREE.Mesh( plane, woodFloor);
let door = new THREE.Mesh(planeFront, woodFloor);
let bedrock = new THREE.Mesh(wallGeometry,bedtexture);
let wallLeft = new THREE.Mesh(planeLeft,woodFloor);
let chest = new THREE.Mesh(gateGeometry,minechest);
let ree = new THREE.Mesh(doorGeometry,entrance);


scene.add( floor );
scene.add( door );
scene.add( bedrock );
scene.add( wallLeft);
scene.add( chest );
scene.add ( ree );


camera.position.z = 100;
let renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function animate() {
   requestAnimationFrame( animate );
   
   controls = new THREE.OrbitControls(camera);

   //FLOOR
   floor.rotation.x = 231;
   floor.position.y = -40;
   floor.position.z = -50;


   //WALL LEFT
   wallLeft.position.x = -190;
   wallLeft.position.y = 70;
   wallLeft.rotation.y = 8;

   // CHEST
   chest.position.x = -90;
   chest.position.y = -40;
   chest.position.z = 60;

   //DOOR
   door.position.y = 86;
   door.position.z = -210;

   //BEDROCK
   bedrock.position.x = 0;
   bedrock.position.y = -45; 
   bedrock.position.z = 130;
   bedrock.rotation.x = 30;
   
   //THYDOOR
   ree.position.x = 0;
   ree.position.y = 0;

   controls.update();
   

   renderer.render( scene, camera );
}

animate();