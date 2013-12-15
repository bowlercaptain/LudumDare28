#pragma strict
var clock:float;
var gameOver:boolean;
var style:GUIStyle;
var girl:int;
var buddy:int;
var bomb:int;
var window:boolean;
var gameOverString:String;
var endTriggerNum:int;

function Start () {
	girl=0;
	bomb=0;
	buddy=0;
	window=false;
	endTriggerNum=0;
	clock=0;
	Screen.showCursor = false;
}

function Update () {
	clock+=Time.deltaTime;
	if(clock>60){
		GameOver();
		Screen.showCursor = true;
	} else if(Input.GetKeyDown("escape")||(gameOver&&(clock>3||(Input.GetButtonDown("Fire1")&&clock>.1)||Input.GetButtonDown("Start")))){
	//"3" was selected arbitrarily. adjust to sanity. Fire1&&clock>.1 so the fire1 event used to trigger the gameOver does not also skip the game over sequence.
		Screen.showCursor = true;
		Application.LoadLevel("main menu");
	}
}

function GameOver () {//can be called by, say, the bomb exploding, as well as the timer.
	gameOver=true;
	clock=0;
	gameOverString="";
	//game over messages. Yell at the player if they do something stupid.
	if (endTriggerNum==1){//jumped out window
		if(girl==1){
			gameOverString="Finally willing the love of your life, you decide to jump out the window and fall to your death. Smart move, buddy.";
		}
	} else if (endTriggerNum==2){//left through door
		if(girl==1&&buddy==1){
			gameOverString="Game over. You murdered everyone and left. Good job, psychopath.";
		} else if (girl == 2 && buddy == 1){
			gameOverString="You won the girl, shot the shady foreign agent who would have betrayed you, and rode off into the sunset in your Aston Martin.";
			if(bomb==0){
				gameOverString+=" The bomb still went off, though.";
			}
		}
	} else {//stayed in room
		if(bomb==2){
			gameOverString="You shot the bomb. Why did you do that? Everyone's dead now, idiot.";
		} else if (bomb==0){
			gameOverString="You didn't disarm the bomb and it exploded. Good Job.";
		}
	}
}

function OnGUI(){
	//GUI.Label(Rect(20,10,100,100),""+clock);
	if(gameOver){
		GUI.Label(Rect(0,0,Screen.width,Screen.height),gameOverString,style);
	}
}