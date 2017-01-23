import Hashing from './Hashing';
import HashFunction from './HashFunction';

// Standard CRC32 as generated by the 'crc32' Linux command
// Note that there are other variations on CRC32.
// Just because you're trying to match a 'CRC32', it might not be this.
// 
// I have no idea what I'm doing.  So yay for test vectors!
// This code was assembled based on pseudocode from various places.

const CRC32_TABLE:Uint32Array = new Uint32Array(256);

{
	// Initialize the table
	const poly = 0xEDB88320; // 306674912;
	for( let n=0; n < 256; ++n ) {
		let c = n;
		for( let k=0; k < 8; ++k ) {
			c = (c & 1) ? poly ^ (c >>> 1) : (c >>> 1);
		}
		CRC32_TABLE[n] = c;
	}
}

export class CRC32Hashing implements Hashing {
	protected crc:number;
	constructor() {
		this.reset();
	}
	public reset() {
		this.crc = 0xFFFFFFFF;
	}
	public update(data:Uint8Array):void {
		let crc = this.crc;
		for( let i=0; i < data.length; ++i ) {
			crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ data[i]) & 0xFF];
		}
		this.crc = crc;
	}
	/**
	 * Return the CRC32 as a SIGNED 32-bit integer.
	 * It is signed because that's the natural behavior of Javascript's bitwise operators.
	 */
	public digestToInt():number {
		return this.crc ^ 0xFFFFFFFF;
	}
	public digest():Uint8Array {
		const crc = this.crc ^ 0xFFFFFFFF;
		const crcBuf = new Uint8Array(4);
		crcBuf[0] = (crc >> 24);
		crcBuf[1] = (crc >> 16);
		crcBuf[2] = (crc >>  8);
		crcBuf[3] = (crc >>  0);
		return crcBuf;
	}
}

// You can use this if you're CRC32ing things in one go
export const CRC32_HASHING_SINGLETON = new CRC32Hashing;

export function crc32( data:Uint8Array ):number {
	CRC32_HASHING_SINGLETON.reset();
	CRC32_HASHING_SINGLETON.update(data);
	return CRC32_HASHING_SINGLETON.digestToInt();
}

export default {
	newHashing():Hashing { return new CRC32Hashing; }
};
