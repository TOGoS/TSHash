import SHA1 from './SHA1';
import { hexEncode, hash, hashString } from './index';

function assertEquals(a:any, b:any, message?:string):void {
	a = JSON.stringify(a);
	b = JSON.stringify(b);
	
	if( a != b ) {
		throw new Error(a+" != "+b+(message ? "; "+message : ""));
	}
}

assertEquals('da39a3ee5e6b4b0d3255bfef95601890afd80709', hexEncode(hashString("", SHA1)));
//assertEquals('943a702d06f34599aee1f8da8ef9f7296031d699', hexEncode(hashString("Hello, world!", SHA1)));
