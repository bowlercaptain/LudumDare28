#pragma strict

var mainController:mainControllerScript;

function Start () {

}

function Update () {

}

function OnGun () {
	mainController.buddy=1;
	Destroy(gameObject);
}

function OnKnife () {
	OnGun ();
	//mainController.buddy=1;
	//gameObject.SendMessage("SetNewSpeed",0);
}

function OnRose () {
	gameObject.SendMessage("SetNewSpeed",.5);
	mainController.buddy=2;
}