#pragma strict

//var mood:String;
var mainController:mainControllerScript;
//var aipath:AIPath;

function Start () {
}

function Update () {

}

function OnGun () {
//You monster.

//create a body?
mainController.girl=1;
Destroy(gameObject);
}

function OnKnife () {
mainController.girl=1;
Destroy(gameObject);
}

function OnRose () {
//wooed, follows Bond to safety.

//mood = "Amorous";
gameObject.SendMessage("SetNewSpeed",3);
mainController.girl=2;
//aipath.speed=78;
}