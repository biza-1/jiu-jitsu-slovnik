// from here are cleaned functinons
// gets slovicka from DB using Dexie.js || BIZA
function dbGetSlovicka() {   
    // AJAX  for updating DEXIE.js with Techniques and Words
    $.ajax({
        type: "POST",
        url: "phpRequests/getSlovnik.php",
        data: "check",
        success: function(data) {   
            data = JSON.parse(data);            
            //console.log(data);    
            db[sortStoreName].clear();    
            db[sortStoreName].bulkPut(data).then(function(lastKey) {
               
            })            
            // AJAX for getting metadata 
            $.ajax({
                type: "POST",            
                url: "phpRequests/getMetadata.php",
                data: "check",
                success: function(data) {    
                    data = JSON.parse(data);            
                    //console.log(data);    
                    db[metadataStoreName].clear();    
                    db[metadataStoreName].bulkPut(data).then(function(lastKey) {
                       
                    })                    
                    // calling it here to load after loading new resources                   
                    getSearchResult();
                }           
            }); 
            
        }
        
    
    });      
}
// getting search result (supposed to be smart) || BIZA
function getSearchResult() {        
    // searching in czech or japanese and changing the value
    if($('#japan_czech').text() == 'CZ') {var searchIn = czechIndexName;}else {var searchIn = japanIndexName;} // what to search in if in Japanese of Czech
    // search value 
    var searchValue = $('#nazev').val();
    //if search in Words / Techniques (and what techniques)
    // techniques selected altributes
    var techniquesCheckedAtributes = $('.selectAllDiselectAll:checked').map(function(){        
        return $(this).data('searchvalue');
       
    }).get();
    // with both    
    var slovickaChecked = $('#TechniquesWordsOnClickSlovicka').is(':checked');
    var techniquesChecked = $('#TechniquesWordsOnClickTechniky').is(':checked');
    if(slovickaChecked && techniquesChecked) {
        // smart searchs      
        db[sortStoreName]
        .where(searchIn)
        .startsWithIgnoreCase(searchValue)
        .and(function(data) {
            if( data[typeIndexName] == "word") {
                return true;
            } else if (techniquesCheckedAtributes.includes(data[typeIndexName])) {
                return true;
            }
        }).toArray(function (data) {
            showSearchResult(data);                     
        }); 
    } else if(slovickaChecked) { // with only Word selected
        // smart searchs      
        db[sortStoreName]
        .where(searchIn)
        .startsWithIgnoreCase(searchValue)
        .and(function(data) {
            return data[typeIndexName] == "word";
        }).toArray(function (data) {
            showSearchResult(data);                     
        }); 
    } else if(techniquesChecked) { // with only Technques checked
        // smart searchs      
        db[sortStoreName]
        .where(searchIn)
        .startsWithIgnoreCase(searchValue)
        .and(function(data) {            
            return techniquesCheckedAtributes.includes(data[typeIndexName]);
        }).toArray(function (data) {
            showSearchResult(data);                     
        }); 
    } else {
        showSearchResult(""); 
    }
    
       
    
    //console.log("3");
    //console.log(returnData);
    //showSearchResult(returnData);
}
function getTechniquesToSearch() { //for searching metadata for Type of Techniques || BIZA
    
    db[metadataStoreName]
    .where(keyIndexNameMetadata)
    .equals("technique")
    .toArray(function (data) {
        showTechniquesToSearch(data);                     
    });    
}
function getSimilarWords(search) { //for searching metadata for Type of Techniques || BIZA
    
    db[sortStoreName]
    .where(japanIndexName)
    .anyOf(search)
    .toArray(function (data) {
        showSimilarWords(data);  
    });    
}
function getSimilarTechniques(search) { //for searching metadata for Type of Techniques || BIZA
    
    db[sortStoreName]
    .where(typeIndexName)
    .notEqual("word")
    .and(function(data) {
        var splitTechnique = data[japanIndexName].split(' ');
        if (splitTechnique.includes(search)) {
            return true;
        }
        
    })
    .toArray(function (data) {
        showSimilarWords(data);  
    });    
}