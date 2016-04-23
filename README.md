# TSHash

[![Build Status](https://travis-ci.org/TOGoS/TSHash.svg?branch=master)](https://travis-ci.org/TOGoS/TSHash)

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
var tshash = require('tshash');
var SHA1 = tshash.SHA1;

// A 'hashing' is the intermediate state of a hash calculation,
// similar to a MessageDigest in Java.
// You can keep updating it with additional data.
// So, like, the thing you're hashing doesn't need to be loaded into memory all at once.
var hashing = SHA1.newHashing();

var someData = new Uint8Array(100);
someData[0] = 42;

hashing.update(someData);
// Could update(more data) here if we wanted.
var someHash = hashing.digest(); // Some 20-byte Uint8Array
```

There's also some random utility functions buried in here.

```
var tshash = require('tshash');
// Like this UUID generator
var uuids = tshash.uuids;

var uuid = uuids.newType4Uuid();
// and formatter
var uuidStr = uuids.uuidUrn(uuid); // "blablah-blah-blah-blah-blahblahblah"
var uuidUrn = uuids.uuidUrn(uuid); // "urn:uuid:blablah-blah-blah-blah-blahblahblah"

// and this base32 encoder
var someUrn = tshash.base32Encode(tshash.hash("Hello, world!", tshash.SHA1)); // "SQ5HALIG6NCZTLXB7DNI56PXFFQDDVUZ"
```
