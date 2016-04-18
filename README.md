# TSHash

A small framework for digest functions, similar to Java's MessageDigest.

Written in TypeScript, but should be usable from Node or the browser.

Works on Uint8Arrays.

## Example

```javascript
// A 'hashing' is the intermediate state of a hash calculation,
// similar to a MessageDigest in Java.
// You can keep updating it with additional data.
var hashing = SomeHashFunction.newHashing();

var someData = new Uint8Array(100);
someData[0] = 42;

hashing.update(someData);
var someHash = hashing.digest();

// someHash is a Uint8Array with size depending on the hash function used.
```
