import { assertEquals } from './testutils';
import { hexEncode } from './utils';
import { hash } from './index';
import CRC32 from './CRC32';

assertEquals('cbf43926', hexEncode(hash('123456789', CRC32)));
assertEquals('ebe6c6e6', hexEncode(hash('Hello, world!', CRC32)));
