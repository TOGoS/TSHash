import SHA1 from './SHA1';
import { hexEncode, hash } from './index';
import { assertEquals } from './testutils';

assertEquals('da39a3ee5e6b4b0d3255bfef95601890afd80709', hexEncode(hash('', SHA1)));
assertEquals('5ba93c9db0cff93f52b521d7420e43f6eda2784f', hexEncode(hash(new Uint8Array(1), SHA1)));
assertEquals('5ba93c9db0cff93f52b521d7420e43f6eda2784f', hexEncode(hash(new Uint8Array(1).buffer, SHA1)));
assertEquals('86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', hexEncode(hash('a', SHA1)));
assertEquals('943a702d06f34599aee1f8da8ef9f7296031d699', hexEncode(hash('Hello, world!', SHA1)));
assertEquals('2fd4e1c67a2d28fced849ee1bb76e7391b93eb12', hexEncode(hash('The quick brown fox jumps over the lazy dog', SHA1)));
