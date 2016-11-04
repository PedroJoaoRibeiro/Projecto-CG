var materialSpaceShip, geometry, mesh;

materialSpaceShip = new THREE.MeshBasicMaterial({
    color: 0x7C7992,
    wireframe: true
});

 

class SpaceShip extends Element{
    constructor(step, speedX, speedZ, raio){
        super(step, speedX, speedZ, raio);
    }

    setSpeed(speedX, speedZ){
        speedX *= 0.975;
        if(speedX > 60)
          this.speedX = 60;
        else if(speedX < -60)
            this.speedX = -60;
        else
            this.speedX = speedX;
    }

    setPosition(posX, posZ){
        this.position.x += posX;
    }

    limitRight(){
        this.position.x = (50) - this.raio;
        this.step = 0;
        this.speedX = 0;
    }

    limitLeft(){
        this.position.x = (-50) + this.raio;
        this.step = 0;
        this.speedX = 0;
    }
}   


function createSpaceShip(x, y, z) {
    "use strict"

    spaceShip = new SpaceShip(0,0,0,6);

    //adicionar componentes a nave
    spaceShip.add(addSpaceShipMainBody(0,0,0));

    spaceShip.position.set(x,y,z);

    spaceShip.rotation.x = Math.PI/2;

    spaceShip.scale.x = 0.3;
    spaceShip.scale.y = 0.3;
    spaceShip.scale.z = 0.3;
    return spaceShip;
}

function setSpaceShipSpeed(speed){
  if(speed > 40)
    spaceShip.speed = 40;
  else if(speed < -40)
      spaceShip.speed = -40;
  else
      spaceShip.speed = speed;
}

//Parte central da nave

function addSpaceShipMainBody(x, y, z) {
    "use strict";

    var mainBody = new THREE.Object3D();

    geometry = new THREE.CylinderGeometry(5, 2.5, 30, 6);
    var mesh = new THREE.Mesh(geometry, materialSpaceShip);
    mainBody.add(mesh);

    mainBody.add(addSpaceShipMainBodyFront(0, -19, 0));
    mainBody.add(addSpaceShipWings(0, 15, 0, 0.2));
    mainBody.add(addSpaceShipWings(0, 15, 0, -0.2));
    mainBody.add(addSpaceShipRockets(0, -5, 0));
    mainBody.position.set(x, y, z);
    return mainBody;
}

function addSpaceShipMainBodyFront(x, y, z) {
    "use strict";

    geometry = new THREE.CylinderGeometry(2.5, 0.1, 8, 6);
    var mesh = new THREE.Mesh(geometry, materialSpaceShip);
    mesh.position.set(x, y, z);

    return mesh;
}

function addSpaceShipWings(x, y, z, angle) {
    "use strict";

    var wing = new THREE.Object3D();

    geometry = new THREE.CubeGeometry(40, 5, 1);
    var mesh = new THREE.Mesh(geometry, materialSpaceShip);
    wing.add(mesh);

    wing.add(addSpaceShipSingleWepon( 20, 0, 0));
    wing.add(addSpaceShipSingleWepon( -20, 0, 0));

    wing.position.set(x, y, z);
    wing.rotation.y = angle;

    return wing;
}

function addSpaceShipRockets(x, y, z) {

    var rockets = new THREE.Object3D();

    rockets.add(addSpaceShipSingleRocket(x+4, y+20, z-2.5));
    rockets.add(addSpaceShipSingleRocket(x+4, y+20, z+2.5));
    rockets.add(addSpaceShipSingleRocket(x-4, y+20, z-2.5));
    rockets.add(addSpaceShipSingleRocket(x-4, y+20, z+2.5));

    return rockets;
}

function addSpaceShipSingleRocket(x, y, z) {
    "use strict";
    var points = [];
    for ( var i = 0; i < 10; i ++ ) {
    	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
    }
    var geometry = new THREE.LatheGeometry(points, 16, 3, 6.3 );
    mesh = new THREE.Mesh(geometry, materialSpaceShip);
    mesh.position.set(x, y, z);

    mesh.scale.x = 0.1;
    mesh.scale.y = 0.2;
    mesh.scale.z = 0.1;

    return mesh;
}


function addSpaceShipSingleWepon(x, y, z) {
    "use strict";
    var wepon = new THREE.Object3D();

    geometry = new THREE.CylinderGeometry(1, 1, 6);
    var mesh = new THREE.Mesh(geometry, materialSpaceShip);

    wepon.add(mesh);
    wepon.add(addSpaceShipSingleCanon(0, -7.5, 0));

    wepon.position.set(x, y, z);
    return wepon;
}

function addSpaceShipSingleCanon( x, y, z) {
    "use strict";

    geometry = new THREE.CylinderGeometry(0.5, 0.1, 15);
    var mesh = new THREE.Mesh(geometry, materialSpaceShip);
    mesh.position.set(x, y, z);

    return mesh;
}
