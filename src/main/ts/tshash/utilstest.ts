import { hexEncode, hexDecode } from './utils';
import { assertEquals } from './testutils';

let caught = false;
try {
	hexDecode('abc');
} catch( e ) {
	caught = true;
}

assertEquals( true, caught, "Expected an error to be thrown when hex-decoding string with odd length");

assertEquals( '123abc', hexEncode(hexDecode('123ABC')) );
