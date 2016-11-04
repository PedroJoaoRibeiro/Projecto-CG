var camera, scene, renderer, spaceShip, aspectRatio;
var arrayShot = [];
var arrayAliens = [];
var width  = 100;
var height = 100;
var oldTime = new Date().getTime()/1000;
var camera3 = false;

function init(){
    "use strict";
    renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    creatScene();
    creatCamera();
    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function render(){
    "use strict";
    if(camera3){
      updateCamera();
    }
    renderer.render(scene, camera);
}


function creatCamera(){
    "use strict";
    setOrthographicCamera();
}

function creatScene(){
    "use strict";

    scene = new THREE.Scene();


    scene.add( new THREE.AxisHelper(10) );

    //Adicionar objetos pretendidos
    spaceShip = createSpaceShip( 0,0,40); //90
    scene.add(spaceShip);

    generateAliensLign(scene, 0, 0, -25);
    generateAliensLign(scene, 0, 0, -40);

    drawLimits();

}



//ANIMATION

function animate() {
    var newTime = new Date().getTime()/1000;
    var delta = newTime - oldTime;
    "use strict";

    //move SPaceship
    spaceShip.move(delta);

    //move Aliens
    for (var i = 0; i < arrayAliens.length; i++){
      arrayAliens[i].move(delta);
    }

    //move Shots
    for (var i = 0; i < arrayShot.length; i++){
      arrayShot[i].move( delta);
    }
    var removeArray = [];


    for (var i = 0; i < arrayAliens.length; i++){
      for (var j = 0; j < arrayShot.length; j++){
        if (arrayShot[j].colision(arrayAliens[i])) {
          removeArray.push([arrayShot[j],arrayAliens[i]]);
        }
      }
      for (var j = 0; j < arrayAliens.length; j++){
        if (arrayAliens[j].colision(arrayAliens[i])) {
          arrayAliens[i].hasColided();
        }
      }
    }
    removeAlienShot(removeArray);
    oldTime = newTime;
    render();
    requestAnimationFrame(animate);
}

function onResize(){
    "use Strict";
    renderer.setSize(window.innerWidth, window.innerHeight);
    aspectRatio =  window.innerWidth/window.innerHeight;

    if (aspectRatio >= 1){
      width = 100 * aspectRatio;
    }else {
      height = 100 / aspectRatio;
    }

    camera.left = width / -2;
    camera.right = width  / 2;
    camera.top = height /2;
    camera.bottom = height / -2;

    camera.aspect = aspectRatio;

    camera.updateProjectionMatrix();
}

function onKeyDown(e){
    "use strict";

    switch(e.keyCode){
        case 65:    //A
        case 97:    //a
            materialSpaceShip.wireframe = !materialSpaceShip.wireframe;
            materialAlien.wireframe = !materialAlien.wireframe;
            materialShot.wireframe = !materialShot.wireframe;
            break;
        case 66:    //B
        case 98:    //b
            var shot = createShot(spaceShip.position.x,spaceShip.position.y,spaceShip.position.z);
            scene.add(shot);
            arrayShot.push(shot);
          break;
        case 37:        //seta esquerda
            if(spaceShip.speedX <= -60 == false)
              spaceShip.step += -10;
            break;
        case 39:       //seta direita
          if(spaceShip.speedX >= 60 == false)
            spaceShip.step += 10;
          break;
        case 49:       // 1
          setOrthographicCamera();
          camera3 = false;
          break;
        case 50:        //2
          setPerspectiveCamera();
          camera3 = false;
          break;
        case 51:        //3
          setPerspectiveCamera3();
          camera3 = true;
          break;

    }
}

function onKeyUp(e){
    "use strict";
    switch(e.keyCode){
        case 37:        //seta esquerda
        case 39:       //seta direita
          spaceShip.step = 0;
          break;
    }
}


function setOrthographicCamera(){
  aspectRatio =  window.innerWidth/window.innerHeight;
  if (aspectRatio >= 1){
    width = 100 * aspectRatio;
  }else {
    height = 100 / aspectRatio;
  }
  //camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera = new THREE.OrthographicCamera(width / - 2, width/ 2, height /2, height /-2 , 1, 1000 );

  camera.position.x = 0;
  camera.position.y = 10;
  camera.position.z = 0;

  camera.lookAt(scene.position);
}

function setPerspectiveCamera(){
  aspectRatio =  window.innerWidth/window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspectRatio, 90, 1000);

  camera.position.x = 0;
  camera.position.y = 100;
  camera.position.z = 150;

  camera.lookAt(scene.position);
}


function setPerspectiveCamera3(){
  aspectRatio =  window.innerWidth/window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspectRatio, 90, 1000);

  camera.position.x = spaceShip.position.x;
  camera.position.y = 100;
  camera.position.z = 150;
  camera.lookAt(new THREE.Vector3(spaceShip.position.x,0,0));
}

function updateCamera(){
  camera.position.x = spaceShip.position.x;
  camera.lookAt(new THREE.Vector3(spaceShip.position.x,0,0));
}

function drawLimits(){
  var material = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });

  var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3( -50, 0, -50 ),
      new THREE.Vector3( 50, 0, -50 ),
      new THREE.Vector3( 50, 0, 50 ),
      new THREE.Vector3( -50, 0, 50 ),
      new THREE.Vector3( -50, 0, -50)
    );

  var line = new THREE.Line( geometry, material );
  scene.add( line );
}


function removeShot(a){
  for (var i = 0; i < arrayShot.length; i++){
    if(a.name == arrayShot[i].name){
      arrayShot.splice(i,1)
    }
  }
  scene.remove(a);
}

function removeAlien(a){
  for (var i = 0; i < arrayAliens.length; i++){
    if(a.name == arrayAliens[i].name){
      arrayAliens.splice(i,1)
    }
  }
  scene.remove(a);
}

function removeAlienShot(array) {
  for (var i = 0; i < array.length; i++){
    removeShot(array[i][0]);
    removeAlien(array[i][1]);
  }
  
}

function calculateDistance(a,b){
  var aux1 = Math.pow((a.position.x - b.position.x),2);
  var aux2 = Math.pow((a.position.z - b.position.z),2);
  return Math.sqrt(aux1 + aux2);
}



