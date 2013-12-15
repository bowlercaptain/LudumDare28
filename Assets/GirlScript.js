#pragma strict

var mood:String;
//var aipath:AIPath;

function Start () {
mood = "Worried about bomb";
}

function Update () {

}

function OnGun () {
//You monster.

//create a body?
Destroy(gameObject);
}

function OnRose () {
//wooed, follows Bond to safety.
mood = "Amorous";
aipath.speed=78;
}