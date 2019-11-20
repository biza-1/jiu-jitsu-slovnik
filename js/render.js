function showSearchResult(data) { // to show search data || BIZA 
    var output = '';
    if($('#japan_czech').text() == 'CZ') { // what to show first based on chosen search language 
        for (let i = 0; i < data.length; i++) {
            output += '<a href="pages/searchResult.php?id='+data[i][IDIndexName]+'">';
            output += '<div class="z-depth-1 searchResultDiv" data-id="'+data[i][IDIndexName]+'">';
            output += '<div class=""><p class=" flow-text">'+data[i][czechIndexName]+'</p></div>';
            output += '<div class=""><p class=" flow-text">'+data[i][japanIndexName]+'</p></div>';
            if (data[i][typeIndexName] == 'word') {
                output += '<div class=""><p class=" flow-text">slovíčko</p></div>';
            } else {
                output += '<div class=""><p class=" flow-text">'+data[i][typeIndexName]+'</p></div>';
            }
            // for showing stitky
            output += '<div class="stitkyContainsContainer">';
            output += '<p class=" flow-text">stityk</p>'
            
            output += '</div>';
            output +='</div>';
            // end for stitky
            output +='</a>';        
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            output += '<a href="pages/searchResult.php?id='+data[i][IDIndexName]+'">';
            output += '<div class="z-depth-1 searchResultDiv" data-id="'+data[i][IDIndexName]+'">';
            output += '<div class=""><p class=" flow-text">'+data[i][japanIndexName]+'</p></div>';
            output += '<div class=""><p class=" flow-text">'+data[i][czechIndexName]+'</p></div>';
            if (data[i][typeIndexName] == 'word') {
                output += '<div class=""><p class=" flow-text">slovíčko</p></div>';
            } else {
                output += '<div class=""><p class=" flow-text">'+data[i][typeIndexName]+'</p></div>';
            }
            output +='</div>';
            // for showing stitky
            output += '<div class="stitkyContainsContainer">';
            output += '<p class=" flow-text">stityk</p>'
            
            output += '</div>';
            output +='</div>';
            output +='</a>';        
        }
    }
    $('#searchResult').html(output);


}
function showOpenedeResult(data) { // to show opened data || BIZA
    //var data = getSearchResult();
    //console.log(data);
    var output = '';
    output += '<div class=""><p class=" flow-text">'+data[0][japanIndexName]+'</p></div>';
    output += '<div class=""><p class=" flow-text">'+data[0][czechIndexName]+'</p></div>';    
    if (data[0][typeIndexName] === 'word') {
        output += '<div class=""><p class=" flow-text">slovicko</p></div>';
        // search teqniuqeus to search similaar
        getSimilarTechniques(data[0][japanIndexName]);
    } else {
        output += '<div class=""><img src="../images/images/'+data[0][imageUrlNONIndexName]+'" alt="'+data[0][japanIndexName]+'"></div>';
        output += '<div class=""><p class=" flow-text">'+data[0][contentNONIndexName]+'</p></div>';
        output += '<div class=""><p class=" flow-text">'+data[0][typeIndexName]+'</p></div>';
        // search words to debunk
        var splitTechnique = data[0][japanIndexName].split(' ');        
        getSimilarWords(splitTechnique);
        
    }    
    $('#wordOutput').html(output);
}
function showSimilarWords(data) { // renders similar words and appends them to wordOutput || BIZA
    var output = '';
    for (let i = 0; i < data.length; i++) {
        output += '<a href="searchResult.php?id='+data[i][IDIndexName]+'">';
        output += '<div class=" z-depth-1 " >';             
        output += '<div class=""><p class=" flow-text">'+data[i][japanIndexName]+'</p></div>';
        output += '<div class=""><p class=" flow-text">'+data[i][czechIndexName]+'</p></div>';            
        output +='</div>';
        output +='</a>';        
    }
    $('#wordOutput').append(output);

}
function showSimilarTechniques(data) { // renders similar techiques and appends them to wordOutput || BIZA
    var output = '';
    for (let i = 0; i < data.length; i++) {
        output += '<a href="searchResult.php?id='+data[i][IDIndexName]+'">';
        output += '<div class=" z-depth-1 " >';             
        output += '<div class=""><p class=" flow-text">'+data[i][japanIndexName]+'</p></div>';
        output += '<div class=""><p class=" flow-text">'+data[i][czechIndexName]+'</p></div>';            
        output +='</div>';
        output +='</a>';        
    }
    $('#wordOutput').append(output);

}
function showTechniquesToSearch(data) { // showing thign that lets you choose what techniques you want to see || BIZA
    var output = '';
    // select all / diselect all
    output += '<p>'
    output += '<label>'
    output += '<input type="checkbox" checked="checked" id="selectAllDiselectAllController" class="TechniquesWordsOnClick" />';
    output += '<span>Vybrat vše</span>'; 
    output += '</label>'
    output += '</p>'
    for (let i = 0; i < data.length; i++) {
        output += '<p>'
        output += '<label>'
        output += '<input type="checkbox" checked="checked" class="selectAllDiselectAll TechniquesWordsOnClick" data-searchvalue="'+data[i][valueIndexNameMetadata]+'"/>';
        output += '<span>'+data[i][valueIndexNameMetadata]+'</span>'; 
        output += '</label>'
        output += '</p>'         
    }
    $('#techniquesChooser').html(output);
}
// shows modal stitky added || BIZA
function showModalStitkyAdder() {
    var output = '';
    output += '<div class="row">';
    output += '<form class="col s12" id="stitkyForm>';
    output += '<div class="row">';
    output += '<div class="input-field col s10">';
    output += '<input id="nazevStitku" type="text" class="validate" data-lpignore="true">';
    output += '<label for="nazevStitku">Název štítku</label>';
    output += '<p class="flow-text red" id="StitkyMessage"></p>';
    output += '</div>';
    output += '<a class="btn-floating btn-large waves-effect waves-light red right" id="pridatStitekButton"><i class="material-icons">add</i></a>';
    output += '</form>';
    output += '</div>';
    output += '<div id="modalStitkyConrolerrDiv">'; // div for showing all checkboxes
    output += '</div>';
    $('#LabelAdd').html(output);
}
// shows modal stitky adder || BIZA
function showModalStitkyController(data) {
    output = '';
    for (let i = 0; i < data.length; i++) {
        output += '<div class="modalStitkyControleerContainer"><p class=" flow-text">'+data[i][nameIndexNameLABELS]+'</p>';
        output += '<a class="btn-floating btn-small waves-effect waves-light red right buttonsToAddRemove modalStitkyAdd" data-id="'+data[i][IDIndexNameINLABELS]+'" ><i class="material-icons">add</i></a>';
        output += '<a class="btn-floating btn-small waves-effect waves-light red right buttonsToAddRemove modalStitkyRemove" data-id="'+data[i][IDIndexNameINLABELS]+'" ><i class="material-icons">remove</i></a>';
        output += '</div>';
    }    
    $('#modalStitkyConrolerrDiv').html(output);    
}