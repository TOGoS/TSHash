import Hashing from './Hashing';
import HashFunction from './HashFunction';

function lrot(n:number, shift:number) : number {
   return ((n << shift) | (n >>> (32 - shift)));
}

// Translated from pseudocode at
//   https://en.wikipedia.org/wiki/SHA-1
// and taking some hints from
//   https://gist.github.com/ducksoupdev/bbfcf8b9cee688b97865

export class SHA1Hashing implements Hashing {
	protected buffer:ArrayBuffer = new ArrayBuffer(80*4);
	protected bufferUint8s:Uint8Array = new Uint8Array(this.buffer);
	protected bufferView:DataView = new DataView(this.buffer);
	protected bufLen:number;
	
	protected h0:number;
	protected h1:number;
	protected h2:number;
	protected h3:number;
	protected h4:number;
	protected ml:number;
	
	protected valid:boolean = false;
	
	constructor() { this.reset(); }
	
	public reset():void {
		this.h0 = 0x67452301;
		this.h1 = 0xEFCDAB89;
		this.h2 = 0x98BADCFE;
		this.h3 = 0x10325476;
		this.h4 = 0xC3D2E1F0;
		this.bufLen = 0;
		this.ml = 0;
		this.valid = true;
	}
	
	protected updateChunk():void {
		const bv = this.bufferView;
		for( let i=16; i<80; ++i ) {
			bv.setUint32(
				i*4, lrot(
					bv.getUint32((i- 3)*4) ^
					bv.getUint32((i- 8)*4) ^
					bv.getUint32((i-14)*4) ^
					bv.getUint32((i-16)*4),
					1
				)
			);
		}
		let a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4;
		for( let i=0; i<80; ++i ) {
			let f, k;
			if( i < 20 ) {
				f = (b & c) | ((~b) & d);
				k = 0x5A827999;
			} else if( i < 40 ) {
				f = b ^ c ^ d;
				k = 0x6ED9EBA1;
			} else if( i < 60 ) {
				f = (b & c) | (b & d) | (c & d);
				k = 0x8F1BBCDC;
			} else {
				f = b ^ c ^ d;
				k = 0xCA62C1D6;
			}
			
			let temp = lrot(a, 5) + f + e + k + bv.getUint32(i*4);
			e = d;
			d = c;
			c = lrot(b, 30);
			b = a;
			a = temp;
		}
		
		this.h0 += a;
		this.h1 += b;
		this.h2 += c;
		this.h3 += d;
		this.h4 += e;
	}
	
	public update(data:Uint8Array):void {
		if( !this.valid ) {
			throw new Error("SHA1Hashing in invalid state.  Someone forgot to call reset()");
		}
		
		const buf = this.bufferUint8s;
		let bi = this.bufLen;
		let di = 0;
		
		for( di=0; di<data.length; ++di, ++bi ) {
			if( bi == 64 ) {
				this.updateChunk();
				bi = 0;
			}
			buf[bi] = data[di];
		}		
		
		this.bufLen = bi;
		this.ml += data.length;
	}
	
	public digest():Uint8Array {
		let bi = this.bufLen;
		let buf = this.bufferUint8s;
		if( bi == 0 ) {
			buf[bi++] = 0x80;
		}
		if( bi > 56 ) {
			for( ; bi < 64; ++bi ) buf[bi] = 0;
			this.updateChunk();
			bi = 0;
		}
		for( ; bi < 56; ++bi ) {
			buf[bi] = 0;
		}
		var bv = this.bufferView;
		bv.setUint32(56, Math.floor(this.ml / 4294967296));
		bv.setUint32(60, this.ml & 0xFFFFFFFF);
		this.updateChunk();
		
		const digestBuf = new ArrayBuffer(20);
		const digestView = new DataView(digestBuf);
		digestView.setUint32( 0, this.h0);
		digestView.setUint32( 4, this.h1);
		digestView.setUint32( 8, this.h2);
		digestView.setUint32(12, this.h3);
		digestView.setUint32(16, this.h4);
		return new Uint8Array(digestBuf);
	}
}

export default class SHA1 {
	public static newHashing():Hashing {
		return new SHA1Hashing;
	}
}
