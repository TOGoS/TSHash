import Hashing from './Hashing';
import HashFunction from './HashFunction';

export function hash(data:Uint8Array, hashFunc:HashFunction):Uint8Array {
	const hashing:Hashing = hashFunc.newHashing();
	hashing.update(data);
	return hashing.digest();
}

declare class TextEncoder {
	encode(str:string):Uint8Array;
}

function utf8Encode(str:string):Uint8Array {
	if( str.length == 0 ) return new Uint8Array(0);
	return (new TextEncoder).encode(str);
}

export function hashString(str:string, hashFunc:HashFunction):Uint8Array {
	return hash( utf8Encode(str), hashFunc );
}

function hexDig(i:number):string {
	return String.fromCharCode( i < 10 ? 48 + i : 87 + i );
}

export function hexEncode(data:Uint8Array):string {
	const astuff = new Array(data.length);
	for( let i=0; i<data.length; ++i ) {
		astuff[i] = hexDig(data[i] >> 4) + hexDig(data[i] & 0xF);
	}
	return astuff.join('');
}

export function hexDecode(hex:string):Uint8Array {
	throw new Error("hexDecode not yet implemented");
}

export function base32Encode(data:Uint8Array):string {
	throw new Error("base32Encode not yet implemented");
}

export function base32Decode(base32:string):Uint8Array {
	throw new Error("base32Decode not yet implemented");
}
