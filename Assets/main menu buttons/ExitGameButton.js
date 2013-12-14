#pragma strict

function Start () {

}

function Update () {
	if(Input.GetKeyDown("escape")){
		OnMouseDown();
	}
}

function OnMouseDown() {
	Application.Quit();
}