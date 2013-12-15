#pragma strict

var mainController:mainControllerScript;//to be able to call GameOver();

//each activatable object (there won't be many) will have an OnKnife, OnRose, OnGun, and OnWatch.
//Using a tool on an object will SendMessage with one of those functions.
//The object will animate itself atnd things around accordingly, or send a message with according data to some grand animator.

function Start () {

}

function Update () {

}

function OnKnife () {
//get disarmed
mainController.bomb=1;
}

function OnRose () {
//confuse everyone around
}

function OnGun () {
// explode. idiot.

//Explosion animation! turn on a particle emitter of some kind?
mainController.bomb=3;
mainController.GameOver();
}

function OnWatch () {

}