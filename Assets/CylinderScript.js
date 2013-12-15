#pragma strict

var bomb:BombScript;
var buzz:AudioSource;
var myIndex:int;

function Start () {
buzz = GetComponent(AudioSource);
buzz.pitch=Random.value*2.5;
}

function Update () {
	buzz.volume*=.95;
}

function OnGun () {
	bomb.OnGun();
}

function OnWatch() {
	buzz.volume+=.25;
}

function OnKnife () {
	bomb.StabCylinder(myIndex);
}
