// defining database names || BIZA
// always call variables, dont call by writing the name
var dbName = 'slovnik';
// name of sorting store
var sortStoreName = 'slovicka'; 
var IDIndexName = 'ID';
var czechIndexName = 'czech';
var japanIndexName = 'japanese';
var typeIndexName = 'type';
// non indexes of slovicka
var imageUrlNONIndexName = 'imageUrl';
var contentNONIndexName = 'content';
// name of metadata store
var metadataStoreName = 'metadata'; 
var IDIndexNameINMetadata = 'ID';
var keyIndexNameMetadata = 'type';
var valueIndexNameMetadata = 'value';
// name of labesStore
var labesStoreName = 'labes'; 
var IDIndexNameINLABELS = 'ID';
var userIDIndexNameINLABELS = 'userID';
var nameIndexNameLABELS = 'name';
var containsIndexNameLABELS = 'contains';
// extended store for words to keep name of STITKY > words renew every time on wifi > reused to be faster w/o combining
var stitkyStoreName = sortStoreName;
var idOfWordsStitky = IDIndexName;
var StitkyForShowing = 'STITKYHolder';
// store for metadata in local
// name of metadata store
var metadataStoreNameLOCAL = 'metadataLOCAL'; 
var IDIndexNameINMetadataLOCAL = 'ID';
var keyIndexNameMetadataLOCAL = 'type';
var valueIndexNameMetadataLOCAL = 'value';
// DEXIE.js (Very smart >NICE<)
var db = new Dexie(dbName);
db.version(1).stores({ // the name has to coreespond with sortStoreName
    [sortStoreName]: IDIndexName+','+czechIndexName+','+japanIndexName+','+typeIndexName+','+StitkyForShowing,
    [metadataStoreName]: IDIndexNameINMetadata+','+keyIndexNameMetadata+','+valueIndexNameMetadata,
    [labesStoreName]:   '++' + IDIndexNameINLABELS+','+userIDIndexNameINLABELS +','+  nameIndexNameLABELS +','+ containsIndexNameLABELS,
    [metadataStoreNameLOCAL]: IDIndexNameINMetadataLOCAL+','+keyIndexNameMetadataLOCAL+','+valueIndexNameMetadataLOCAL,
});