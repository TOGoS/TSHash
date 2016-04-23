import { hexEncode } from './utils';

export function newType4Uuid() {
	const uuid = new Uint8Array(16);
	for( let i=0; i<16; ++i ) uuid[i] = Math.floor(Math.random()*256);
	uuid[6] |= 0x40;
	uuid[6] &= 0x4F;
	uuid[8] |= 0x80;
	uuid[8] &= 0xBF;
	return uuid;
}

export function uuidString(uuid:Uint8Array):string {
	return (
		hexEncode(uuid,0,4)+'-'+
		hexEncode(uuid,4,6)+'-'+hexEncode(uuid,6,8)+'-'+hexEncode(uuid,8,10)+'-'+
		hexEncode(uuid,10,16)
	);
}

export function uuidUrn(uuid:Uint8Array):string {
	return "urn:uuid:"+uuidString(uuid);
}
