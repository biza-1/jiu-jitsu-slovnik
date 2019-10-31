function showSearchResult(data) { // to show search data || BIZA
    //var data = getSearchResult();
    //console.log(data);
    var output = '';
    for (let i = 0; i < data.length; i++) {
        output += '<a href="pages/searchResult.php?id='+data[i][IDIndexName]+'">';
        output += '<div class=" z-depth-1 " >';
        output += '<div class=""><p class=" flow-text">'+data[i][czechIndexName]+'</p></div>';
        output += '<div class=""><p class=" flow-text">'+data[i][japanIndexName]+'</p></div>';
        output +='</div>';
        output +='</a>';        
    }
    $('#searchResult').html(output);
}