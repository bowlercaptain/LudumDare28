#pragma strict

function Start () {

}

function Update () {
	if(Input.GetKeyDown("enter")||Input.GetKeyDown("return")){
		Application.LoadLevel("game scene");
	}
}

function OnMouseDown() {
	Application.LoadLevel("game scene");
}