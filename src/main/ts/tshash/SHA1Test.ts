import SHA1 from './SHA1';
import { hexEncode, hash, hashString } from './index';

function assertEquals(a:any, b:any, message?:string):void {
	a = JSON.stringify(a);
	b = JSON.stringify(b);
	
	if( a != b ) {
		throw new Error(a+" != "+b+(message ? "; "+message : ""));
	}
}

assertEquals('da39a3ee5e6b4b0d3255bfef95601890afd80709', hexEncode(hashString('', SHA1)));
assertEquals('5ba93c9db0cff93f52b521d7420e43f6eda2784f', hexEncode(hash(new Uint8Array(1), SHA1)));
assertEquals('86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', hexEncode(hashString('a', SHA1)));
assertEquals('943a702d06f34599aee1f8da8ef9f7296031d699', hexEncode(hashString('Hello, world!', SHA1)));
assertEquals('2fd4e1c67a2d28fced849ee1bb76e7391b93eb12', hexEncode(hashString('The quick brown fox jumps over the lazy dog', SHA1)));
