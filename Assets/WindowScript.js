#pragma strict

var mainController:mainControllerScript;

function Start () {

}

function Update () {

}

function OnKnife () {
//break a single pane, or damage lock so it can be pushed open (less dramatic than gun)
}

function OnRose () {
	//if window is open, throw it out, for some reason.
}

function OnGun () {
//shatter.

//create some shards of glass, play shattering noise
mainController.window=true;
GetComponent(AudioSource).Play();
//Destroy(gameObject);
transform.localScale=Vector3.zero;
}

function OnWatch () {
//become screen? Maybe the watch isn't such a good idea.
}