import SHA1 from './SHA1';
import { hexEncode, hash } from './index';
import { assertEquals } from './testutils';

assertEquals('da39a3ee5e6b4b0d3255bfef95601890afd80709', hexEncode(hash('', SHA1)));
assertEquals('5ba93c9db0cff93f52b521d7420e43f6eda2784f', hexEncode(hash(new Uint8Array(1), SHA1)));
assertEquals('5ba93c9db0cff93f52b521d7420e43f6eda2784f', hexEncode(hash(new Uint8Array(1).buffer, SHA1)));
assertEquals('86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', hexEncode(hash('a', SHA1)));
assertEquals('943a702d06f34599aee1f8da8ef9f7296031d699', hexEncode(hash('Hello, world!', SHA1)));
assertEquals('2fd4e1c67a2d28fced849ee1bb76e7391b93eb12', hexEncode(hash('The quick brown fox jumps over the lazy dog', SHA1)));

// How about 60 bytes?
assertEquals('f52e3c2732de7bea28f216d877d78dae1aa1ac6a', hexEncode(hash('012345678901234567890123456789012345678901234567890123456789', SHA1)));
// 64-byte things seem to cause trouble.
assertEquals('cf0800f7644ace3cb4c3fa33388d3ba0ea3c8b6e', hexEncode(hash('0123456789012345678901234567890123456789012345678901234567890123', SHA1)));

const egzString = '{\n'+
	'	"bounds": {\n'+
	'		"minX": -8,\n'+
	'		"minY": -8,\n'+
	'		"minZ": -0.5,\n'+
	'		"maxX": 8,\n'+
	'		"maxY": 8,\n'+
	'		"maxZ": 0.5\n'+
	'	},\n'+
	'	"roomEntities": {\n'+
	'		"urn:uuid:d42a8340-ec03-482b-ae4c-a1bfdec4ba32": {\n'+
	'			"position": {"x":-4.5,"y":-1.5,"z":0},\n'+
	'			"entity": {\n'+
	'				"id": "urn:uuid:d42a8340-ec03-482b-ae4c-a1bfdec4ba32",\n'+
	'				"classRef": "urn:uuid:416bfc18-7412-489f-a45e-6ff4c6a4e08b",\n'+
	'				"desiredMovementDirection": {"x":0,"y":0,"z":0}\n'+
	'			},\n'+
	'			"velocity": {"x":0,"y":-0.002422480620155043,"z":0},\n'+
	'			"velocityPosition": {"x":-4.5,"y":-1.4380556344985962,"z":0}\n'+
	'		},\n'+
	'		"urn:uuid:a11ed6ae-f096-4b30-bd39-2a78d39a1385": {\n'+
	'			"position": {"x":0,"y":0,"z":0},\n'+
	'			"entity": {\n'+
	'				"classRef": "urn:sha1:PM6O2GPBIOCNJHUB66OAAK3IEDD3BJ7B#"\n'+
	'			}\n'+
	'		},\n'+
	'		"urn:uuid:10070a44-2a0f-41a1-bcfb-b9e16a6f1b59": {\n'+
	'			"position": {"x":-2.5,"y":-3.25,"z":0},\n'+
	'			"entity": {\n'+
	'				"classRef": "urn:uuid:762f0209-0b91-4084-b1e0-3aac3ca5f5ab"\n'+
	'			},\n'+
	'			"velocity": {"x":0,"y":-0.10416552424430847,"z":0},\n'+
	'			"velocityPosition": {"x":-2.5,"y":-3.188720703125,"z":0}\n'+
	'		},\n'+
	'		"urn:uuid:27c27635-99ba-4ef3-b3ff-445eb9b132e5": {\n'+
	'			"position": {"x":5.5,"y":0,"z":0},\n'+
	'			"entity": {\n'+
	'				"classRef": "urn:uuid:585927b9-b225-49d7-a49a-dff0445a1f78",\n'+
	'				"desiredMovementDirection": {"x":0,"y":-1,"z":0}\n'+
	'			},\n'+
	'			"velocity": {"x":0,"y":0.19791666666666652,"z":0}\n'+
	'		}\n'+
	'	},\n'+
	'	"neighbors": {\n'+
	'		"w": {\n'+
	'			"offset": {"x":-16,"y":0,"z":0},\n'+
	'			"bounds": {\n'+
	'				"minX": -8,\n'+
	'				"minY": -8,\n'+
	'				"minZ": -0.5,\n'+
	'				"maxX": 8,\n'+
	'				"maxY": 8,\n'+
	'				"maxZ": 0.5\n'+
	'			},\n'+
	'			"roomRef": "urn:uuid:9d424151-1abf-45c1-b581-170c6eec5942"\n'+
	'		},\n'+
	'		"e": {\n'+
	'			"offset": {"x":16,"y":0,"z":0},\n'+
	'			"bounds": {\n'+
	'				"minX": -8,\n'+
	'				"minY": -8,\n'+
	'				"minZ": -0.5,\n'+
	'				"maxX": 8,\n'+
	'				"maxY": 8,\n'+
	'				"maxZ": 0.5\n'+
	'			},\n'+
	'			"roomRef": "urn:uuid:9d424151-1abf-45c1-b581-170c6eec5942"\n'+
	'		},\n'+
	'		"n": {\n'+
	'			"offset": {"x":0,"y":-16,"z":0},\n'+
	'			"bounds": {\n'+
	'				"minX": -8,\n'+
	'				"minY": -8,\n'+
	'				"minZ": -0.5,\n'+
	'				"maxX": 8,\n'+
	'				"maxY": 8,\n'+
	'				"maxZ": 0.5\n'+
	'			},\n'+
	'			"roomRef": "urn:uuid:9d424151-1abf-45c1-b581-170c6eec5941"\n'+
	'		},\n'+
	'		"s": {\n'+
	'			"offset": {"x":0,"y":16,"z":0},\n'+
	'			"bounds": {\n'+
	'				"minX": -8,\n'+
	'				"minY": -8,\n'+
	'				"minZ": -0.5,\n'+
	'				"maxX": 8,\n'+
	'				"maxY": 8,\n'+
	'				"maxZ": 0.5\n'+
	'			},\n'+
	'			"roomRef": "urn:uuid:9d424151-1abf-45c1-b581-170c6eec5941"\n'+
	'		}\n'+
	'	}\n'+
	'}\n';

assertEquals('21b24a79c43d58b05ea548e30b7a415827b11337', hexEncode(hash(egzString, SHA1)));
