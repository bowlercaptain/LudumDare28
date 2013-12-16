#pragma strict

var originalRotation:Quaternion;
var getTransform:Transform;
var getAudio:AudioSource;

function Start () {
getTransform=transform;
getAudio=GetComponent(AudioSource);
originalRotation=transform.rotation;
}

function Update () {

}