var geometry, mesh;
var countAlien = 0;

var materialAlien = new THREE.MeshBasicMaterial({
        color: 0x7C7992,
        wireframe: true
    });



class Alien extends Element{
    constructor(step, speedX, speedZ, raio){
        super(step, speedX, speedZ, raio);
    }

    hasColided(){
        this.speedX *= -1;
        this.speedZ *= -1;
    }
}


function generateAliensLign(scene, x, y, z){

  for(var i = -30; i <= 30 ; i+=20){
    var alien = createAliens(i,y,z);
    scene.add(alien);
    arrayAliens.push(alien);
  }
}

function createAliens(x, y, z) {
    "use strict"
    
    var speedX = Math.floor((Math.random() * 20) + 1) * Math.pow(-1,Math.floor((Math.random() * 10) + 1));
    var speedZ = Math.floor((Math.random() * 20) + 1) * Math.pow(-1,Math.floor((Math.random() * 10) + 1));
    var alien = new Alien(0,speedX, speedZ, 3);

    //adicionar componentes a nave

    alien.add(addAlienCenter(0,0,0));

    alien.position.set(x,y,z);

    alien.scale.x = 0.3;
    alien.scale.y = 0.3;
    alien.scale.z = 0.3;

    alien.name = countAlien;
    countAlien ++;
    return alien;

}

//Parte central da nave

function addAlienCenter( x, y, z) {
    "use strict";
    var center = new THREE.Object3D();

    geometry = new THREE.SphereGeometry(4, 32, 32);
    mesh = new THREE.Mesh(geometry, materialAlien);

    center.add(mesh);
    center.add(addAlienSide(6, 0, 0));
    var aux = addAlienSide(-6, 0, 0);
    aux.rotation.y = Math.PI;
    center.add(aux);
    center.position.set(x, y, z);
    return center;
}

function addAlienSide(x, y, z) {
    "use strict";
    var alienSide = new THREE.Object3D();

    geometry = new THREE.CubeGeometry(6, 3, 2);
    mesh = new THREE.Mesh(geometry, materialAlien);

    alienSide.add(mesh);
    alienSide.add(addAlienProtection(5, 0, 0));
    alienSide.position.set(x, y, z);
    return alienSide;
}

function addAlienProtection( x, y, z) {
    "use strict";
    var alienProtection = new THREE.Object3D();

    geometry = new THREE.CubeGeometry(0.5, 6, 10);
    mesh = new THREE.Mesh(geometry, materialAlien);

    alienProtection.add(mesh);
    alienProtection.add(addAlienProtectionUp(-1.5,5.5, 0));
    alienProtection.add(addAlienProtectionDown(-1.5,-5.5, 0));
    alienProtection.position.set(x, y, z);
    return alienProtection;
}

function addAlienProtectionUp(x, y, z) {
    "use strict";

    geometry = new THREE.CubeGeometry(0.5, 6, 10);
    mesh = new THREE.Mesh(geometry, materialAlien);
    mesh.position.set(x, y, z);

    mesh.rotation.z = 0.5;

    return mesh;
}

function addAlienProtectionDown(x, y, z) {
    "use strict";

    geometry = new THREE.CubeGeometry(0.5, 6, 10);
    mesh = new THREE.Mesh(geometry, materialAlien);
    mesh.position.set(x, y, z);

    mesh.rotation.z = -0.5;

    return mesh;
}
