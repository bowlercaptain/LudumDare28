#pragma strict

var mainController:mainControllerScript;//to be able to call GameOver();
var clock:float;
var disarmed:boolean;
var cylinders:CylinderScript[];
var selectedIndex:int;

//each activatable object (there won't be many) will have an OnKnife, OnRose, OnGun, and OnWatch.
//Using a tool on an object will SendMessage with one of those functions.
//The object will animate itself atnd things around accordingly, or send a message with according data to some grand animator.

function Start () {
clock=0;
selectedIndex=0;
disarmed=false;
	for (var cylinder:CylinderScript in cylinders){
		cylinder.bomb=this;
	}
	//randomize order, thanks to Duck on the unity help forum.
	for (var i = cylinders.length - 1; i > 0; i--) {
        var r = Random.Range(0,i);
        var tmp = cylinders[i];
        cylinders[i] = cylinders[r];
        cylinders[r] = tmp;
        cylinders[i].myIndex = i;
    }
}

function Update () {
clock+=Time.deltaTime;
	if(clock>=60&&!disarmed){
		particleSystem.Play();
		mainController.GameOver();
	}
}

function OnKnife () {
	mainController.bomb=3;
	particleSystem.Play();
	mainController.GameOver();
}

function OnRose () {
	//confuse everyone around
}

function OnGun () {
	// explode. idiot.

	//Explosion animation! turn on a particle emitter of some kind?
	mainController.bomb=2;
	particleSystem.Play();
	mainController.GameOver();
}

function OnWatch () {
	cylinders[selectedIndex].OnWatch();
}

function StabCylinder (index){
	if(index==selectedIndex){
		selectedIndex++;
		if(selectedIndex>=cylinders.length){
			disarmed=true;
			mainController.bomb=1;
		}
	} else {
		//explode!
		OnKnife();
	}
}