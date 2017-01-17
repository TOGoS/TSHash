import Hashing from './Hashing';
import HashFunction from './HashFunction';
import { toUint8Array, utf8Encode, base32Encode } from './utils';
import SHA1 from './SHA1';

// For compatibility with nodemod...
import CRC32 from './CRC32';
import * as uuids from './uuids';
export { SHA1, CRC32, uuids };

export { utf8Encode, utf8Decode, base32Encode, base32Decode, hexEncode, hexDecode } from './utils';

export function hash(data:any, hashFunc:HashFunction):Uint8Array {
	const u8 = toUint8Array(data);
	const hashing:Hashing = hashFunc.newHashing();
	hashing.update(u8);
	return hashing.digest();
}

/** @deprecated; just use hash(str, hashFunc) */
export function hashString(str:string, hashFunc:HashFunction):Uint8Array {
	return hash( utf8Encode(str), hashFunc );
}

export function sha1Urn(thing:any):string {
	return "urn:sha1:" + base32Encode(hash(thing, SHA1));
}
