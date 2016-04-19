import Hashing from './Hashing';
import HashFunction from './HashFunction';
import { toUint8Array, utf8Encode } from './utils';
export * from './utils';

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
