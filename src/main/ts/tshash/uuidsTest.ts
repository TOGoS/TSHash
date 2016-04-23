import { assertTrue } from './testutils';
import { newType4Uuid, uuidUrn } from './uuids';

for( let i=0; i<100; ++i ) {
	const urn = uuidUrn(newType4Uuid());
	assertTrue(
		urn.match(/^urn:uuid:[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) != null,
		"UUID URN should be of the form 'xxxxxxxx-xxxx-3xxx-[89ab]xxx-xxxxxxxxxxxx'; got '"+urn+"'"
	);
}
