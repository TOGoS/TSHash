export function assertTrue(a:boolean, message:string):void {
	if( !a ) {
		throw new Error("assertion failed" + (message ? ": " + message : ""));
	}
}

export function assertEquals(a:any, b:any, message?:string):void {
	a = JSON.stringify(a);
	b = JSON.stringify(b);

	if( a != b ) {
		throw new Error(a+" != "+b+(message ? "; "+message : ""));
	}
}
