#pragma strict

var held:toolScript;
var holdPosition:Vector3;
var knife:toolScript;
var gun:toolScript;
var rose:toolScript;
var watch:toolScript;
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
		//iF(held==knife){
		swingTime=.125;
		//}
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
		held.getTransform.position.y-=99999; //will nullpointerException if held is ever not set. Move this line of code if this ever might be the case. Also, this is similarly dumb. You could probably just disable the renderer temporarily.
			if(held==knife){
			held=rose;
			currentMessage="OnRose";
		} else if (held==rose){
			held=gun;
			currentMessage="OnGun";
		} else if (held==gun){
			held=watch;
			currentMessage="OnWatch"; 
		} else {//don't check the status of currently held item - if we destroy a tool for some reason, this will equip the knife by default.
			held=knife;
			currentMessage="OnKnife";
		} //possible structure given time to fix things: give each tool a ToolScript that has a MessageName field, store tools in a list. This would allow for objects held or not to change freely.
	}
}

function LateUpdate () {//lateUpdate to prevent strange-looking movement
	held.getTransform.position=transform.position+transform.rotation*holdPosition;
	held.getTransform.rotation=transform.rotation;//transform.rotation*
	held.getTransform.localRotation*=Quaternion.Euler(Vector3.up*90);
	if(held==gun||held==watch){
		held.getTransform.localRotation*=Quaternion.Euler(Vector3.up*90);
	}
	if(held == knife) {held.getTransform.position+=.25*(transform.forward*(1-Mathf.Cos(16*Mathf.PI*swingTime))-.5*transform.up*Mathf.Sin(16*Mathf.PI*swingTime));}
	if(held == gun) {held.getTransform.localRotation*=Quaternion.Euler(Vector3.right*90*Mathf.Sin(Mathf.PI*8*swingTime));}
	if(held == watch) {held.getTransform.position+=.05*(transform.up*Mathf.Sin(8*Mathf.PI*swingTime));}
	if(held == rose) {held.getTransform.localRotation*=Quaternion.Euler(Vector3.up*90*16*swingTime);}
	//held.rotation.
	//when user uses item, perform "swing" animation, a la minecraft or every other first person game.
}