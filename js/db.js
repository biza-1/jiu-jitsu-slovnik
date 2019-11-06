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
 // experimenting with Dexie.js for smart seach || BIZA
var db = new Dexie(dbName);
db.version(1).stores({ // the name has to coreespond with sortStoreName
    [sortStoreName]: IDIndexName+','+czechIndexName+','+japanIndexName+','+typeIndexName,
    [metadataStoreName]: IDIndexNameINMetadata+','+keyIndexNameMetadata+','+valueIndexNameMetadata
});