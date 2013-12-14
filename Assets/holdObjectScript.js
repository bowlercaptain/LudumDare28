#pragma strict

var held:Transform;
var holdPosition:Vector3;
var knife:Transform;
var gun:Transform;
var rose:Transform;
var watch:Transform;
var useDistance:float;
var currentMessage:String;//monodevelop, stop changing my capitalization. you don't know about "transform", either.

function Start () {
	currentMessage="OnKnife";
	held=knife;
}

function Update () {
	if(Input.GetButtonDown("Fire1")){
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
}

function LateUpdate () {//lateUpdate to prevent strange-looking movement
	held.position=transform.position+transform.rotation*holdPosition;
	held.rotation=transform.rotation;
	//when user uses item, perform "swing" animation, a la minecraft or every other first person game.
}