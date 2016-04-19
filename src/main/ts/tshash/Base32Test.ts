import { base32Encode, base32Decode } from './utils';

function assertEquals(a:any, b:any, message?:string):void {
	a = JSON.stringify(a);
	b = JSON.stringify(b);
	
	if( a != b ) {
		throw new Error(a+" != "+b+(message ? "; "+message : ""));
	}
}

assertEquals('', base32Encode(''));
assertEquals('JBSWY3DPFQQHO33SNRSCC', base32Encode('Hello, world!'));

const veryBuf = new Uint8Array(256);
for( let i=0; i<256; ++i ) veryBuf[i] = i;

assertEquals(veryBuf, base32Decode(base32Encode(veryBuf)));
