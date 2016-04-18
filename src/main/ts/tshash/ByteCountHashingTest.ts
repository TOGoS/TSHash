import HashFunction from './HashFunction';
import ByteCountHashing from './ByteCountHashing';

// Make sure TypeScript allows us to use the constructor as a hashFunction:
const byteCountHashFunction:HashFunction = ByteCountHashing;

const byteCountHashing = byteCountHashFunction.newHashing();

function assertEquals(a:any, b:any, message?:string) {
	a = JSON.stringify(a);
	b = JSON.stringify(b);
	
	if( a != b ) {
		throw new Error(a+" != "+b+(message ? "; "+message : ""));
	}
}

const emptyDigest = byteCountHashing.digest();
const expectedEmptyDigest = new Uint8Array(8);
assertEquals( expectedEmptyDigest, emptyDigest );

byteCountHashing.update(new Uint8Array(5));
const expectedFiveDigest = new Uint8Array(8);
expectedFiveDigest[7] = 5;
assertEquals( expectedFiveDigest, byteCountHashing.digest() );

byteCountHashing.reset();
assertEquals( expectedEmptyDigest, byteCountHashing.digest() );

byteCountHashing.update(new Uint8Array(1*65536 + 2*256 + 3));
const expectedOneTwoThreeDigest = new Uint8Array(8);
expectedOneTwoThreeDigest[7] = 3;
expectedOneTwoThreeDigest[6] = 2;
expectedOneTwoThreeDigest[5] = 1;
assertEquals(expectedOneTwoThreeDigest, byteCountHashing.digest())
