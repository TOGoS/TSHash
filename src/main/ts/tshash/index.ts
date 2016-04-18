import Hashing from './Hashing';
import HashFunction from './HashFunction';

export function hash(data:Uint8Array, hashFunc:HashFunction):Uint8Array {
	const hashing:Hashing = hashFunc.newHashing();
	hashing.update(data);
	return hashing.digest();
}
