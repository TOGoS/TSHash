//// Character encoding/decoding

export function asciiDecode(data:Uint8Array, maxAllowed:number=127):string {
	const p:string[] = [];
	for( let i=0; i < data.length; ++i ) {
		if( data[i] < 0 ) throw new Error("Code point is <0: "+data[i]);
		if( data[i] > maxAllowed ) throw new Error("Code point is >"+maxAllowed+": "+data[i]);
		p.push(String.fromCharCode(data[i]));
	}
	return p.join('');
}

export function asciiEncode(str:string, maxAllowed:number=127):Uint8Array {
	const data = new Uint8Array(str.length);
	for( let i=0; i < str.length; ++i ) {
		const cp = str.charCodeAt(i);
		if( cp > maxAllowed ) throw new Error("Code point is >"+maxAllowed+": "+cp);
		data[i] = cp;
	}
	return data;
}

/** All of the TypedArray classes implement ArrayBufferView */
declare interface ArrayBufferView { }
declare class TextEncoder {
	constructor(utfLabel:string);
	encode(buffer:string, options?:any):Uint8Array;
}
declare class TextDecoder {
	constructor(utfLabel:string, options?:any);
	decode(buffer:ArrayBufferView):string;
}

export function utf8Encode(str:string):Uint8Array {
	if( str.length == 0 ) return new Uint8Array(0);
	
	if( typeof TextEncoder != 'undefined' ) {
		return (new TextEncoder('utf-8')).encode(str);
	}
	
	// Otherwise fall back to the ASCII encoder and hope that it's good enough.
	return asciiEncode(str);
}

export function utf8Decode(bytes:Uint8Array):string {
	if( bytes.length == 0 ) return '';
	
	if( typeof TextEncoder != 'undefined' ) {
		return (new TextDecoder('utf-8')).decode(bytes);
	}
	
	// Otherwise fall back to the ASCII decoder and hope that it's good enough.
	return asciiDecode(bytes);
}


////

export function toUint8Array(data:any):Uint8Array {
	if( data instanceof Uint8Array ) {
		return <Uint8Array>data;
	} else if( typeof(data) == 'string' ) {
		return utf8Encode(data);
	} else if( data instanceof ArrayBuffer ) {
		return new Uint8Array(<ArrayBuffer>data);
	} else {
		throw new Error("Don't know how to convert "+JSON.stringify(data)+" to Uint8Array");
	}
}



//// Hex encoding/decoding

function hexDig(i:number):string {
	return String.fromCharCode( i < 10 ? 48 + i : 87 + i );
}
function hexVal(charCode:number):number {
	switch( charCode ) {
	case 0x30: return 0;
	case 0x31: return 1;
	case 0x32: return 2;
	case 0x33: return 3;
	case 0x34: return 4;
	case 0x35: return 5;
	case 0x36: return 6;
	case 0x37: return 7;
	case 0x38: return 8;
	case 0x39: return 9;
	case 0x41: case 0x61: return 10;
	case 0x42: case 0x62: return 11;
	case 0x43: case 0x63: return 12;
	case 0x44: case 0x64: return 13;
	case 0x45: case 0x65: return 14;
	case 0x46: case 0x66: return 15;
	default: throw new Error("Invalid hex digit: "+String.fromCharCode(charCode));
	}
}

export function hexEncode(data:Uint8Array, begin:number=0, end:number=data.length):string {
	const astuff = new Array(data.length);
	for( let i=begin; i<end; ++i ) {
		astuff[i] = hexDig(data[i] >> 4) + hexDig(data[i] & 0xF);
	}
	return astuff.join('');
}

export function hexDecode(hex:string):Uint8Array {
	if( hex.length % 2 != 0 ) throw new Error("Can't hex-decode a string with non-even length: "+hex.length);
	const byteCount = hex.length/2;
	const rez:Uint8Array = new Uint8Array(byteCount);
	for( let i=0; i<byteCount; ++i ) {
		rez[i] = (hexVal(hex.charCodeAt(i*2)) << 4) | hexVal(hex.charCodeAt(i*2+1));
	}
	return rez;
}



//// Base32 encoding/decoding

const BASE32_CHARS:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const BASE32_CHAR_VALUES:number[] =	[
	0xFF,0xFF,0x1A,0x1B,0x1C,0x1D,0x1E,0x1F, // '0', '1', '2', '3', '4', '5', '6', '7'
	0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF, // '8', '9', ':', ';', '<', '=', '>', '?'
	0xFF,0x00,0x01,0x02,0x03,0x04,0x05,0x06, // '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G'
	0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D,0x0E, // 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'
	0x0F,0x10,0x11,0x12,0x13,0x14,0x15,0x16, // 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'
	0x17,0x18,0x19,0xFF,0xFF,0xFF,0xFF,0xFF, // 'X', 'Y', 'Z', '[', '\', ']', '^', '_'
	0xFF,0x00,0x01,0x02,0x03,0x04,0x05,0x06, // '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g'
	0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D,0x0E, // 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'
	0x0F,0x10,0x11,0x12,0x13,0x14,0x15,0x16, // 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'
	0x17,0x18,0x19,0xFF,0xFF,0xFF,0xFF,0xFF  // 'x', 'y', 'z', '{', '|', '}', '~', 'DEL'
];

/* 
 * Base32 - encodes and decodes RFC3548 Base32
 * (see http://www.faqs.org/rfcs/rfc3548.html )
 * 
 * Based on Java code by Bitzi (PD) 2006.
 * 
 * @author Robert Kaye
 * @author Gordon Mohr
 * @author TOGoS (converted to TypeScript)
 */

/**
 * Encodes byte array to Base32 String.
 *
 * @param {Uint8Array} bytes - bytes to encode.
 * @return {string}
 */
export function base32Encode(thing:any):string {
	const bytes:Uint8Array = toUint8Array(thing);
	let i = 0, j = 0, index = 0, digit = 0;
	let currByte:number, nextByte:number;
	
	const base32:string[] = new Array<string>( Math.floor((bytes.length + 7) * 8 / 5) );
	
	while( i < bytes.length ) {
		currByte = bytes[i];
		
		/* Is the current digit going to span a byte boundary? */
		if( index > 3 ) {
			nextByte = (i + 1) < bytes.length ? bytes[i + 1] : 0;
			
			digit = currByte & (0xFF >> index);
			index = (index + 5) % 8;
			digit <<= index;
			digit |= nextByte >> (8 - index);
			++i;
		} else {
			digit = (currByte >> (8 - (index + 5))) & 0x1F;
			index = (index + 5) % 8;
			if( index == 0 ) ++i;
		}
		
		base32[j++] = BASE32_CHARS.charAt(digit);
	}
	
	return base32.slice(0,j).join('');
}

/**
 * Decodes the given Base32 String to a raw byte array.
 * 
 * @param {string|Uint8Array|DataBuffer} base32-encoded data
 * @return {Uint8Array} decoded data
 */
export function base32Decode(base32:string):Uint8Array {
	let i:number, index:number, lookup:number, offset:number, digit:number;
	const bytes = new Uint8Array( Math.floor(base32.length * 5 / 8) );
	const firstCharCode = "0".charCodeAt(0);
	
	for( i = 0, index = 0, offset = 0; i < base32.length; ++i ) {
		lookup = base32.charCodeAt(i) - firstCharCode;
		
		/* Skip chars outside the lookup table */
		if( lookup < 0 || lookup >= BASE32_CHAR_VALUES.length ) continue;
		
		digit = BASE32_CHAR_VALUES[lookup];
		
		/* If this digit is not in the table, ignore it */
		if( digit == 0xFF ) continue;
		
		if( index <= 3 ) {
			index = (index + 5) % 8;
			if( index == 0 ) {
				bytes[offset++] |= digit;
				if( offset >= bytes.length ) break;
			} else {
				bytes[offset] |= digit << (8 - index);
			}
		} else {
			index = (index + 5) % 8;
			bytes[offset] |= (digit >>> index);
			offset++;
			
			if( offset >= bytes.length ) break;
			
			bytes[offset] |= digit << (8 - index);
		}
	}
	return bytes;
}
