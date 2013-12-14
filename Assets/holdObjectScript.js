#pragma strict

var held:Transform;
var holdPosition:Vector3;

function Start () {

}

function LateUpdate () {//lateUpdate to prevent strange-looking movement
	held.position=transform.position+transform.rotation*holdPosition;
	held.rotation=transform.rotation;
	//when user uses item, perform "swing" animation, a la minecraft or every other first person game.
}