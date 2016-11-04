var geometry, mesh;
var countShot = 0;

var materialShot = new THREE.MeshBasicMaterial({
        color: 0x7C7992,
        wireframe: true
    });

class Shot extends Element{
    constructor(step, speedX, speedZ, raio){
        super(step, speedX, speedZ, raio);
    }
    
    limitTop(){
        removeShot(this);
    }
}

function createShot(x, y, z) {
    "use strict"

    var shot = new Shot(0,0,-40, 1);

    //adicionar componentes a nave
    geometry = new THREE.IcosahedronGeometry(1, 2);
    mesh = new THREE.Mesh(geometry, materialShot);

    shot.add(mesh);

    shot.position.set(x,y,z);
    shot.name = countShot;
    countShot ++;
    return shot;
}
