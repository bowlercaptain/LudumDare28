#pragma strict
var clock:float;
var gameOver:boolean;
var swingTime:float;

function Start () {
	clock=0;
	swingTime=0;
}

function Update () {
	clock+=Time.deltaTime;
	if(clock>60){GameOver();}
	else if(Input.GetKeyDown("escape")||(gameOver&&(clock>3||Input.GetButtonDown("Fire1")||Input.GetButtonDown("Start")))){//"3" was selected arbitrarily. adjust to sanity.
		Application.LoadLevel("main menu");
	}
}

function GameOver () {//can be called by, say, the bomb exploding, as well as the timer.
	gameOver=true;
	clock=0;
	//show "Game Over!"
}