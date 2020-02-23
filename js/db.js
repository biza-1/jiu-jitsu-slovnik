// defining database names || BIZA
// always call variables, dont call by writing the name
const dbName = 'slovnik';
// name of sorting store
const sortStoreName = 'slovicka';
const IDIndexName = 'ID';
const czechIndexName = 'czech';
const japanIndexName = 'japanese';
const typeIndexName = 'type';
// non indexes of slovicka
const imageUrlNONIndexName = 'imageUrl';
const contentNONIndexName = 'content';
// name of metadata store
const metadataStoreName = 'metadata';
const IDIndexNameINMetadata = 'ID';
const keyIndexNameMetadata = 'type';
const valueIndexNameMetadata = 'value';
// name of labesStore
const labesStoreName = 'labes';
const IDIndexNameINLABELS = 'ID';
const userIDIndexNameINLABELS = 'userID';
const nameIndexNameLABELS = 'name';
const containsIndexNameLABELS = 'contains';
// extended store for words to keep name of STITKY > words renew every time on wifi > reused to be faster w/o combining
const stitkyStoreName = sortStoreName;
const idOfWordsStitky = IDIndexName;
const StitkyForShowing = 'STITKYHolder';
// store for metadata in local
// name of metadata store
const metadataStoreNameLOCAL = 'metadataLOCAL';
const IDIndexNameINMetadataLOCAL = 'ID';
const keyIndexNameMetadataLOCAL = 'type';
const valueIndexNameMetadataLOCAL = 'value';
// inicializace DEXIE.js 
const db = new Dexie(dbName);
db.version(1).stores({ // the name has to corespond with sortStoreName
    [sortStoreName]: IDIndexName + ',' + czechIndexName + ',' + japanIndexName + ',' + typeIndexName + ',' + StitkyForShowing,
    [metadataStoreName]: IDIndexNameINMetadata + ',' + keyIndexNameMetadata + ',' + valueIndexNameMetadata,
    [labesStoreName]: '++' + IDIndexNameINLABELS + ',' + userIDIndexNameINLABELS + ',' + nameIndexNameLABELS + ',' + containsIndexNameLABELS,
    [metadataStoreNameLOCAL]: IDIndexNameINMetadataLOCAL + ',' + keyIndexNameMetadataLOCAL + ',' + valueIndexNameMetadataLOCAL,
});