import InternetChecksum from './InternetChecksum';
import { hexEncode, hash } from './index';
import { assertEquals } from './testutils';

assertEquals('ffff', hexEncode(hash('',InternetChecksum)));
assertEquals('beb3', hexEncode(hash('Hello, world!',InternetChecksum)));
assertEquals('dfb3', hexEncode(hash('Hello, world',InternetChecksum)));
