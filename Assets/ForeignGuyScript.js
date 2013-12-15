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
	mainController.buddy=1;
	gameObject.SendMessage("SetNewSpeed",0);
}

function OnRose () {
	mainController.buddy=2;
}