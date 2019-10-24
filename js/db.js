// defining database names || BIZA
// always call variables, dont call by writing the name
var dbName = 'slovnik';
var sortStoreName = 'slovicka'; // name of sorting store
var IDIndexName = 'ID';
var czechIndexName = 'czech';
var japanIndexName = 'japanese';
var typeIndexName = 'type';


/*window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// opening db
var request = window.indexedDB.open(dbName, 1);

request.onupgradeneeded = function(e)
{
    var db = request.result;
    var store = db.createObjectStore(sortStoreName, {keyPath: "ID"} );
    store.createIndex(czechIndexName, czechIndexName, {unique: false});
    store.createIndex(japanIndexName, japanIndexName, {unique: false});
    store.createIndex(IDIndexName, IDIndexName, {unique: true});
    store.createIndex(typeIndexName, typeIndexName, {unique: true});       
};
request.onerror = function(e) 
{
    console.log('there was  error ' + e.target.onerrorCode);
};
request.onsuccess = function(e) 
{
    db = request.result;
    tx = db.transaction(sortStoreName, 'readwrite');
    store = tx.objectStore(sortStoreName);       
    db.onerror = function(e) 
    {
        console.log('ERROR' + e.target.onerrorCode);
    }    
        
};*/
 // experimenting with Dexie.js for smart seach || BIZA
var db = new Dexie(dbName);
db.version(1).stores({ // the name has to coreespond with sortStoreName
    [sortStoreName]: IDIndexName+','+czechIndexName+','+japanIndexName+','+typeIndexName
});
//db[sortStoreName].put({[czechIndexName]: "Nicolas", [japanIndexName]: "ams",[typeIndexName]: "word"}).then (function(){
 /*  
    //return db[sortStoreName].get(1);
}).then(function (databsaName) {
    //
    // Display the result
    //
    
    //alert ("Nicolas has shoe size " + databsaName[japanIndexName]);
}).catch(function(error) {
    //
    // Finally don't forget to catch any error
    // that could have happened anywhere in the
    // code blocks above.
    //
    console.log ("Ooops: " + error);
});*/
