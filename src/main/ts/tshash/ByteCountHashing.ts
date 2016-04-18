import Hashing from './Hashing';

/**
 * A really terrible hash function.
 * Here so we can make sure the build process works, mostly.
 */
export default class ByteCountHashing implements Hashing {
	protected byteCount:number = 0;
	
	public reset():void { this.byteCount = 0; }
	public update(data:Uint8Array):void { this.byteCount += data.length; }
	public digest():Uint8Array {
		const byteCount = this.byteCount;
		if( byteCount < 0 ) throw new Error("Somehow byteCount < 0: "+byteCount);
		if( byteCount > 4294967295 ) throw new Error("ByteCount too big (> 2**32-1): "+byteCount);
		const digest = new Uint8Array(8);
		digest[7] = (byteCount >>  0) & 0xFF;
		digest[6] = (byteCount >>  8) & 0xFF;
		digest[5] = (byteCount >> 16) & 0xFF;
		digest[4] = (byteCount >> 24) & 0xFF;
		//digest[3] = (byteCount >> 32) & 0xFF;
		//digest[2] = (byteCount >> 40) & 0xFF;
		return digest;
	}
	
	public static newHashing():Hashing { return new this; }
}
