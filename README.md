# TSHash

A small framework for digest functions, similar to Java's MessageDigest.

Written in TypeScript, but should be usable from Node or the browser.

Works on Uint8Arrays.

Goal is to include some commmon hash functions, including SHA-1, Tiger, and Merkle tree variants of any of them,
along with some utility functions such as UTF-8 and base32 encoding/decoding
(i.e. everything you need to generate [bitprint URNs](http://www.nuke24.net/docs/2015/HashURNs.html)).

Currently included algorithms:
- SHA-1 (```tshash.SHA1```)
- CRC32 (```tshash.CRC32```)

## Example

```javascript
// import SHA1 from 'tshash/SHA1';
// (or, in Node):
var SHA1 = require('tshash').SHA1;

// A 'hashing' is the intermediate state of a hash calculation,
// similar to a MessageDigest in Java.
// You can keep updating it with additional data.
var hashing = SHA1.newHashing();

var someData = new Uint8Array(100);
someData[0] = 42;

hashing.update(someData);
var someHash = hashing.digest();

// someHash is a Uint8Array with size depending on the hash function used.
```
