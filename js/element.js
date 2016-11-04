class Element extends THREE.Object3D{
	constructor(step, speedX, speedZ, raio){
		super();
		this.step = step;
  		this.speedX = speedX;
  		this.speedZ = speedZ;
  		this.raio = raio;
	}

	move(delta){
	   //tempo em segundos
		var currSpeedX = this.speedX;
		var currSpeedZ = this.speedZ;
	  	var aceleration = this.step;
		
		//Se a velocidade esta a aumentar
	  	if(aceleration !=0){
		    var currSpeedX = this.speedX + (aceleration * delta);
		    var currSpeedZ = this.speedZ + (aceleration * delta);
		    this.setPosition(currSpeedX * delta, currSpeedZ * delta);
		    this.setSpeed(currSpeedX, currSpeedZ);
	  	}

		//velocidade constante
		else{
		    this.setPosition(currSpeedX * delta, currSpeedZ * delta);
		    this.setSpeed(currSpeedX, currSpeedZ);
	  }
	  this.isEndOfSpace();
	}

	setSpeed(speedX, speedZ){
    	this.speedX = speedX;
    	this.speedZ = speedZ;
    }

    setPosition(posX, posZ){
        this.position.x += posX;
        this.position.z += posZ;
    }

	isEndOfSpace(){
	    "use strict"

	    if(this.position.x > (50) - this.raio){
	      this.limitRight();
	    }
	    else if(this.position.x < (-50) + this.raio){
	      this.limitLeft();
	    }
	    else if(this.position.z < (-50) + this.raio){
	      this.limitTop();
	    }
	    else if(this.position.z > (50) - this.raio){
	      this.limitBot();
	    }
	}

	colision(b){
		if(this == b)
			return false;
		var aux = calculateDistance(this,b);
		if(this.raio + b.raio >= aux){
			return true;
		}
		return false;
	}

	limitLeft(){
		this.speedX *= -1;
	}
	limitTop(){
		this.speedZ *= -1;
	}
	limitRight(){
		this.speedX *= -1;
	}
	limitBot(){
		this.speedZ *= -1;
	}
}




