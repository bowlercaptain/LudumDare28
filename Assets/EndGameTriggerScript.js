#pragma strict

var mainController:mainControllerScript;
var triggerNum:int;

function Start () {

}

function Update () {

}

function OnTriggerEnter(other:Collider){
	mainController.endTriggerNum=triggerNum;
	mainController.GameOver();
	GetComponent(AudioSource).Play();
}