// defining database names || BIZA
// always call variables, dont call by writing the name
var dbName = 'slovnik';
var sortStoreName = 'slovicka'; // name of sorting store
var czechIndexName = 'czech';
var japanIndexName = 'japanese';
var IDIndexName = 'ID';

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if (window.indexedDB) 
{
    // opening db
    var request = window.indexedDB.open(dbName, 1);

    request.onupgradeneeded = function(e)
    {
        var db = request.result;
        var store = db.createObjectStore(sortStoreName, {keyPath: "ID"} );
        store.createIndex(czechIndexName, czechIndexName, {unique: false});
        store.createIndex(japanIndexName, japanIndexName, {unique: false});
        store.createIndex(IDIndexName, IDIndexName, {unique: true});       
    };
    request.onerror = function(e) 
    {
        console.log('there was  error ' + e.target.onerrorCode);
    };
    request.onsuccess = function(e) 
    {
        var db = request.result;
        var tx = db.transaction(sortStoreName, 'readwrite');
        var store = tx.objectStore(sortStoreName);    

        db.onerror = function(e) {
            console.log('ERROR' + e.target.onerrorCode);
        }    
    };
}