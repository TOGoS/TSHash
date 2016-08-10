import Hashing from './Hashing';

// Based on code by James Hughes
// http://stackoverflow.com/questions/4113890/how-to-calculate-the-internet-checksum-from-a-byte-in-java

export class InternetChecksumming implements Hashing {
	protected sum:number = 0;
	protected phase:number = 0;
	
	public reset():void {
		this.sum = 0;
		this.phase = 0;
	}
	public update(buf:Uint8Array):void {
		let i=0, length = buf.length, sum = this.sum, phase=this.phase;
	   while( length > 0 ) {
			if( phase == 0 ) {
				sum += buf[i++] << 8;
				--length;
				phase = 1;
			} else {
				sum += buf[i++];
				--length;
				phase = 0;
			}
	   }
		this.sum = sum; this.phase = phase;
	}
	public digestAsUint16():number {
		return (~((this.sum & 0xFFFF)+(this.sum >> 16)))&0xFFFF;
	}
	public digest():Uint8Array {
		const a = new Uint8Array(2);
		new DataView(a.buffer).setUint16(0, this.digestAsUint16());
		return a;
	}
}

export default class InternetChecksum {
	public static newHashing():InternetChecksumming {
		return new InternetChecksumming();
	}
}
