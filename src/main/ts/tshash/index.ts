import Hashing from './Hashing';
import HashFunction from './HashFunction';

export function hash(data:any, hashFunc:HashFunction):Uint8Array {
	let u8:Uint8Array;
	if( data instanceof Uint8Array ) {
		u8 = <Uint8Array>data;
	} else if( typeof(data) == 'string' ) {
		u8 = utf8Encode(data);
	} else if( data instanceof ArrayBuffer ) {
		u8 = new Uint8Array(<ArrayBuffer>data);
	} else {
		throw new Error("Don't know how to convert "+typeof(data)+" to Uint8Array");
	}
	const hashing:Hashing = hashFunc.newHashing();
	hashing.update(u8);
	return hashing.digest();
}

declare class TextEncoder {
	encode(str:string):Uint8Array;
}

function utf8Encode(str:string):Uint8Array {
	if( str.length == 0 ) return new Uint8Array(0);
	
	if( typeof TextEncoder != 'undefined' ) {
		return (new TextEncoder).encode(str);
	}
	
	// In the meantime, this is good enough for our test cases:
	const bytes = new Uint8Array(str.length);
	for( let i=0; i<str.length; ++i ) {
		let c = str.charCodeAt(i);
		if( c >= 128 ) {
			throw new Error("Non-ascii character encoding not yet supported");
		}
		bytes[i] = c;
	}
	return bytes;
}

/** @deprecated; just use hash(str, hashFunc) */
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
