#pragma strict

function Start () {

}

function Update () {
	if(Input.GetButtonDown("Start")){//Input.GetKeyDown("enter")||Input.GetKeyDown("return")){
		Application.LoadLevel("game scene");
	}
}

function OnMouseDown() {
	Application.LoadLevel("game scene");
}