#pragma strict

var held:Transform;
var holdPosition:Vector3;
var knife:Transform;
var gun:Transform;
var rose:Transform;
var watch:Transform;
var useDistance:float;
var currentMessage:String;//monodevelop, stop changing my capitalization. you don't know about "transform", either.
var swingTime:float;

function Start () {
	currentMessage="OnKnife";
	held=knife;
	swingTime=0;
}

function Update () {
	if(swingTime){
	swingTime-=Time.deltaTime;
	if(swingTime<0){swingTime=0;}
	}
	//use held item
	if(Input.GetButtonDown("Fire1")){
		swingTime=.125;
		var nowUseDistance:float = useDistance;
		if (currentMessage=="OnGun"){
			nowUseDistance = Mathf.Infinity;
		}
		var hit:RaycastHit;
		if(Physics.Raycast(transform.position,transform.forward,hit,nowUseDistance)){
			hit.collider.gameObject.SendMessage(currentMessage,SendMessageOptions.DontRequireReceiver);//walls will not react, some things will not react to rose
			//if each item only gets one use, disable it.
		}
	}
	
	//switch items
	if(Input.GetButtonDown("Fire2")){
		//this code is dumb, but this is a jam. non-duct-tape is for when you care about code prettyness.
		held.position.y-=99999; //will nullpointerException if held is ever not set. Move this line of code if this ever might be the case. Also, this is similarly dumb. You could probably just disable the renderer temporarily.
				if(held==knife){
			held=rose;
			currentMessage="OnRose";
		} else if (held==rose){
			held=gun;
			currentMessage="OnGun";
		//} else if (held==gun){
		//	held=watch;
		//	currentMessage="OnWatch"; 
		//Screw the watch.
		} else {//don't check the status of currently held item - if we destroy a tool for some reason, this will equip the knife by default.
			held=knife;
			currentMessage="OnKnife";
		} //possible structure given time to fix things: give each tool a ToolScript that has a MessageName field, store tools in a list. This would allow for objects held or not to change freely.
	}
}

function LateUpdate () {//lateUpdate to prevent strange-looking movement
	held.position=transform.position+transform.rotation*holdPosition+.25*(transform.forward*(1-Mathf.Cos(16*Mathf.PI*swingTime))-.5*transform.up*Mathf.Sin(16*Mathf.PI*swingTime));
	held.rotation=transform.rotation;
	//when user uses item, perform "swing" animation, a la minecraft or every other first person game.
}