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
			gameOverString="Upon disarming the bomb, seducing your love, and defeating the hostile foreign agent, you decide to jump out the window and fall to your death. Smart move, buddy.";
			failJuke.Play();
		} else {
			gameOverString="You jumped out of the window and fell to your death. Great job!";
			deathJuke.Play();
		}
	} else if (endTriggerNum==2){//left through door
		switch(girl){
		case 1:
			switch(buddy){
			case 1:
				if(bomb==1){
					gameOverString="You disarmed the bomb! Admittedly, there was nobody left to save because you're an insane murderer, but nonetheless: Good job.";
					winJuke.Play();
				} else {
					gameOverString="Game over. You murdered everyone and left. Good job, psychopath.";
					dramaJuke.Play();
				}
			break;
			case 2:
				if(bomb==1){
					gameOverString="You murdered the girl and brought the traitorous foreign agent with you to safety. Why you did that is an utter mystery.";
					deathJuke.Play();
				} else {
					gameOverString="You murdered the girl and brought the traitorous foreign agent with you to safety. Why you did that is an utter mystery. You didn't even disarm the bomb. What is wrong with you?";
					failJuke.Play();
				}
			break;
			default:
				if(bomb==1){
					gameOverString="You murdered your girl and left your traitorous friend alive to come back in the sequel. Way to be Forward-thinking, moron.";
					failJuke.Play();
					
				} else {
					gameOverString="The girl died by your hands, and the villain died by the bomb you didn't disarm. You are horrible.";
					failJuke.Play();
				}
			}
		break;
		case 2:
			switch(buddy){
				case 1:
					if(bomb==1){
						gameOverString="You won the girl, shot the shady foreign agent who would totally have betrayed you, and rode off into the sunset in your Aston Martin. Congratulations! A winner is you!";
						winJuke.Play();
					} else {
						gameOverString="You won the girl, shot the shady foreign agent who would totally have betrayed you, and rode off into the sunset in your Aston Martin. Congratulations! The bomb still killed everyone in the orphanage nearby, but who's worried about them?";
						dramaJuke.Play();
					}
				break;
				case 2:
					if(bomb==1){
						gameOverString="who needs violence! You disarm the bomb and hand out flowers like candy. The world is peaceful like you hope. Except for that foreign rival agent. Our detectors sense the presence of a knife somewhere in the vicinity of your back in the near future.";
						dramaJuke.Play();
					} else {
						gameOverString="Who needs to disarm bombs? You're more of a flowers guy. Many, many, flowers.";
						winJuke.Play();
					}
				break;
				default:
					if(bomb==1){
						gameOverString="You get the girl, but your rival survives to fight another day. Will you see through the ruse and survive? Find out next time on Knife, Gun, Rose, Watch: Diamonds Are Her Majesty's Another Day Twice.";
						dramaJuke.Play();
					} else {
						gameOverString="You got the girl and let the traitorous rival agent die in the blast. Successful, if unambitious.";
						winJuke.Play();
					}
			}
		break;
		default:
		switch(buddy){
			case 1:
				if(bomb==1){
					gameOverString="You stopped your rival and defused the bomb. Free of danger, you and your lover part ways.";
					winJuke.Play();
				} else {
					gameOverString="You kill your rival, but leave your girl to die in the bomb blast. You just wanted to make sure you weren't followed.";
					deathJuke.Play();
				}
			break;
			case 2:
				if(bomb==1){
					gameOverString="You choose to take the rival foreign agent with you rather than the girl. You surely won't regret that decision. Oh hey, where did that knife come from?";
					deathJuke.Play();
				} else {
					gameOverString="You brought the rival foreign agent with you and left the girl to die in the bomb blast. Great going, hero.";
					failJuke.Play();
				}
			break;
			default:
				if(bomb==1){
					gameOverString="Your job completed, you drive off home. You wonder, briefly, if those other people in the room mattered at all. You would assume not.";
					winJuke.Play();
				} else {
					gameOverString="You ran away like a coward, leaving everyone to die in the bomb blast. You should be ashamed.";
					failJuke.Play();
				}
			}
		}
/*		if(girl==1&&buddy==1){
			gameOverString="Game over. You murdered everyone and left. Good job, psychopath.";
		} else if (girl == 2 && buddy == 1){
			gameOverString="You won the girl, shot the shady foreign agent who would totally have betrayed you, and rode off into the sunset in your Aston Martin.";
			winJuke.Play();
		} else if (girl == 2 && buddy == 2){
			gameOverString="Having handed out flowers like candy, you jump in your car and drive off. The Foreign agent later betrays and shoots you.";
			dramaJuke.Play();
		} else if (girl == 1 && buddy == 2){
			gameOverString="You murdered the girl and brought the foreign agent with you to safety. Why you did that is an utter mystery.";
			failJuke.Play();
		}
		if(bomb==0){
			gameOverString+=" Also, the bomb still went off.";
		}*/
		
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