#pragma strict
var clock:float;
var gameOver:boolean;
var style:GUIStyle;
var girl:int;//0 no action. 1 murdered. 2 wooed
var buddy:int;//0 no action. 1 murdered. 2 wooed?
var bomb:int;//0 did not disarm. 1 disarmed. 2 shot. 3 failed to disarm
var window:boolean; //shattered or not
var endTriggerNum:int;//0 still in room, 1 out window, 2 out door
var gameOverString:String;
var failJuke:AudioSource;
var deathJuke:AudioSource;
var dramaJuke:AudioSource;
var winJuke:AudioSource;
var backgroundJuke:AudioSource;

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

	} else
	if(Input.GetKeyDown("escape")||(gameOver&&(clock>4||(Input.GetButtonDown("Fire1")&&clock>.1)||Input.GetButtonDown("Start")))){
	//"3" was selected arbitrarily. adjust to sanity. Fire1&&clock>.1 so the fire1 event used to trigger the gameOver does not also skip the game over sequence.
		Screen.showCursor = true;
		Application.LoadLevel("main menu");
	}
}

function GameOver () {//can be called by, say, the bomb exploding, as well as the timer.
	Screen.showCursor = true;
	backgroundJuke.Stop();
	gameOver=true;
	clock=0;
	gameOverString="";
	//game over messages. Yell at the player if they do something stupid.
	if (endTriggerNum==1){//jumped out window
		if(girl==2&&buddy==1&&bomb==1){
			gameOverString="Upon disarming the bomb, seducing you love, and defeating the hostile foreign agent, you decide to jump out the window and fall to your death. Smart move, buddy.";
			failJuke.Play();
		} else {
			gameOverString="You jumped out of the window and fell to your death. Great job!";
			deathJuke.Play();
		}
	} else if (endTriggerNum==2){//left through door
		if(girl==1&&buddy==1){
			gameOverString="Game over. You murdered everyone and left. Good job, psychopath.";
		} else if (girl == 2 && buddy == 1){
			gameOverString="You won the girl, shot the shady foreign agent who would totally have betrayed you, and rode off into the sunset in your Aston Martin.";
			dramaJuke.Play();
		} else if (girl == 2 && buddy == 2){
			gameOverString="Having handed out flowers like candy, you jump in your car and drive off. The Foreign agent later betrays and shoots you.";
			deathJuke.Play();
		} else if (girl == 1 && buddy == 1){
			gameOverString="You murdered the girl and brought the foreign agent with you to safety.";
			failJuke.Play();
		}
		if(bomb==0){
			gameOverString+=" Also, the bomb still went off.";
		}// else {winJuke.Play();
	} else {//stayed in room
		if(bomb==2){
			dramaJuke.Play();
			gameOverString="You shot the bomb. Why did you do that? Everyone's dead now, idiot.";
			if(window&&girl==1&&buddy==1){
				gameOverString="You're kind of a violent person, aren't you?";
			}
		} else if (bomb==0){
			deathJuke.Play();
			gameOverString="You didn't disarm the bomb and it exploded. Good Job.";
		} else if (bomb==3){
			failJuke.Play();
			gameOverString="That's not how you disarm a bomb. Now we have to retcon your death in the next film. Thanks.";
		} else {
			gameOverString="Wait, did we screw up? This isn't supposed to be possible.";
		}
	}
}

function OnGUI(){
	//GUI.Label(Rect(20,10,100,100),""+clock);
	if(gameOver){
		GUI.Label(Rect(0,0,Screen.width,Screen.height),gameOverString,style);
	}
}