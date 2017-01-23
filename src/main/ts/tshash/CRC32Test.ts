import { assertEquals } from './testutils';
import { hexEncode, utf8Encode } from './utils';
import { hash } from './index';
import CRC32, {crc32} from './CRC32';

function crc32String(str:string):number {
	return crc32(utf8Encode(str));
}

function testCrc32(expectedCrc32:number, input:string) {
	assertEquals(expectedCrc32.toString(16), hexEncode(hash(input, CRC32)));
	assertEquals(expectedCrc32 & 0xFFFFFFFF, crc32String(input));
}

testCrc32(0xCBF43926, '123456789');
testCrc32(0xEBE6C6E6, 'Hello, world!');
