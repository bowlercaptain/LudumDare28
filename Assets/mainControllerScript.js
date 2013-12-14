#pragma strict
var clock:float;
var gameOver:boolean;

function Start () {
	clock=0;
}

function Update () {
	clock+=Time.deltaTime;
	if(clock>60){GameOver();}
	else if(Input.GetKeyDown("escape")||(gameOver&&(clock>3||(Input.GetButtonDown("Fire1")&&clock>.1)||Input.GetButtonDown("Start")))){//"3" was selected arbitrarily. adjust to sanity. Fire1&&clock>.1 so the fire1 event used to trigger the gameOver does not also skip the game over sequence.
		Application.LoadLevel("main menu");
	}
}

function GameOver () {//can be called by, say, the bomb exploding, as well as the timer.
	gameOver=true;
	clock=0;
	//show "Game Over!"
}

function OnGUI(){
	GUI.Label(Rect(20,10,100,100),""+clock);
	if(gameOver){
		GUI.Label(Rect(10,10,100,100),"Game over.");//make this bigger, centered, and an image.
	}
}