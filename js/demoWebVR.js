// Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer( { antialias: true } );

// Append the canvas element created by the renderer to document body element.
document.body.appendChild( renderer.domElement );

//Create a three.js scene
var scene = new THREE.Scene();

//Create a three.js camera
var camera = new THREE.PerspectiveCamera( 140, window.innerWidth / window.innerHeight, 2, 10000 );
scene.add(camera);
camera.position.z = 100;

//Apply VR headset positional data to camera.
var controls = new THREE.VRControls( camera );

//Apply VR stereo rendering to renderer
var effect = new THREE.VREffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );

/*
Create, position, and add 3d objects
*/
var pi = 3.141592653589793238;


var theta = 0;
var radius = 50;

// These are the actual spheres we render
var points = [];
for (var i = 0; i < 5; i++) {
  points[i] = new THREE.Mesh( new THREE.SphereGeometry( 1, 32, 32 ),  new THREE.MeshBasicMaterial( {color: 0x5f91e2} ) );
  scene.add(points[i]);
}

points[0].position.x = -20;
points[0].position.y = 10;
points[0].position.z = -40;

points[1].position.x = -30;
points[1].position.y = 20;
points[1].position.z = -40;

points[2].position.x = -40;
points[2].position.y = 10;
points[2].position.z = -40;

points[3].position.x = -10;
points[3].position.y = 40;
points[3].position.z = -40;

points[4].position.x = -30;
points[4].position.y = 30;
points[4].position.z = -10;


// Floor
var floor = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0x404040, side: THREE.DoubleSide } ) );
floor.rotation.x = pi/2;
floor.position.y = -50;
scene.add( floor );

//axes
drawAxes();




/*
Request animation frame loop function
*/
function animate() {
  // Apply any desired changes for the next frame. In this case, we rotate our object.


  // theta += 0.1;

  // camera.position.x = points[0].position.x + radius * Math.sin( THREE.Math.degToRad( theta ) );
  // camera.position.z = points[0].position. + radius * Math.cos( THREE.Math.degToRad( theta ) );
  // camera.rotateX = radius * Math.sin( THREE.Math.degToRad( theta ) );
  // camera.lookAt( points[0].position );

  //Update VR headset position and apply to camera.
  controls.update();

  // Render the scene through the VREffect.
  effect.render( scene, camera );
  requestAnimationFrame( animate );
}

animate();	// Kick off animation loop

/*
Listen for click event to enter full-screen mode.
We listen for single click because that works best for mobile for now
*/
document.body.addEventListener( 'click', function(){
  effect.setFullScreen( true );
})

/*
Listen for keyboard events
*/
function onkey(event) {
  event.preventDefault();

  if (event.keyCode == 90) { // z
    controls.resetSensor(); //zero rotation
  } else if (event.keyCode == 70 || event.keyCode == 13) { //f or enter
    effect.setFullScreen(true) //fullscreen
  }
};
window.addEventListener("keydown", onkey, true);

function drawAxes() {
  var material = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3( -40, -50, -40 ),
    new THREE.Vector3( -40, -50, 40 ),
    new THREE.Vector3( -40, 50, 40 ),
  );

  var line = new THREE.Line( geometry, material );
  scene.add( line );

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3( -40, -50, 40 ),
    new THREE.Vector3( 40, -50, 40 )
  );

  var line = new THREE.Line( geometry, material );
  scene.add( line );
}

/*
Handle window resizes
*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
