/**
 * Represents an in-progress hash. 
 * Call update(buffer) to continue hashing.
 * Call digest() to get the final hash of your data.
 */
interface Hashing {
	reset():void;
	update(buf:Uint8Array):void;
	digest():Uint8Array;
}

export default Hashing;
