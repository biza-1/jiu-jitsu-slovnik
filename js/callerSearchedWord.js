// get data using ID from DB || BIZA
var id = getAllUrlParams().id;
db[sortStoreName].where(IDIndexName).equals(id).toArray(function (data) {
    //console.log(data); // showing results
    // calling function to show data after finding in DB
    showOpenedeResult(data);
});   
// after getting data a on document load show result