function showSearchResult(data, whereToShowData) {
    // to show search data || BIZA
    var output = [];
    if ($('#japan_czech').text() == 'CZ') {
        // what to show first based on chosen search language
        for (let i = 0; i < data.length; i++) {
            output.push(
                '<a href="pages/searchResult.php?id=' +
                    data[i][IDIndexName] +
                    '">',
            );
            output.push(
                '<div class=" w3-bar w3-border-bottom noBackColor"><div class="searchResultDiv" data-id="' +
                    data[i][IDIndexName] +
                    '">',
            );
            output.push(
                '<div class="w3-bar"><div class="w3-bar-item padding-zero"><h3 class="h3-height"><strong>' +
                    data[i][czechIndexName] +
                    '</strong></h3></div><div class="tick w3-bar-item w3-right" style="margin-bottom:-60px"><div class="tick1"></div></div></div>',
            );
            output.push(
                '<div class="w3-bar"><div style="margin-left: 60px"><h3 class="h3-height-margin">' +
                    data[i][japanIndexName] +
                    '</h3></div></div>',
            );
            if (data[i][typeIndexName] == 'word') {
                output.push(
                    '<div class="w3-bar"><div class="w3-item-bar w3-left" style="margin-top:8px">slovíčko</div>',
                );
            } else {
                output.push(
                    '<div class="w3-bar"><div class="w3-item-bar w3-left" style="margin-bottom:10px">' +
                        data[i][typeIndexName] +
                        '</div>',
                );
            }
            // for showing stitky
            output.push('<div class="stitkyContainsContainer">');
            if (typeof data[i][StitkyForShowing] !== 'undefined') {
                data[i][StitkyForShowing].forEach(element =>
                    output.push('<div class="w3-bar-item w3-right w3-gray tag-col" style="padding:0px 2px 0px 2px; margin:3px">' + element + '</div>'),
                );
            }

            output.push('</div></div></div></div></div></div>');
            // end for stitky
            output.push('</a>');
        }
        var node = document.createElement('div');
        node.classList.add(
            'paginationSlovnik',
            'pageNummer' + currentPage + '',
        );
        node.dataset.pagenumer = currentPage;
        node.innerHTML = output.join('');
        // if it should show new data upon new search or append on scroll
        if (whereToShowData == 'new') {
            document.getElementById('searchResult').innerHTML = '';
            document.getElementById('searchResult').appendChild(node);
            document.getElementById('preloaderConterntBefore').style.display =
                'none';
        } else if (whereToShowData == 'bottom') {
            document.getElementById('searchResult').appendChild(node);
            document.getElementById('preloaderConterntAfter').style.display =
                'none';
            // hide top div
            if (currentPage > 1) {
                document
                    .getElementsByClassName('paginationSlovnik')[0]
                    .remove();
            }
        } else {
            currentPage++; // because it works
            var elementsInSearchResult = document.getElementsByClassName(
                'paginationSlovnik',
            );
            document
                .getElementById('searchResult')
                .insertBefore(node, elementsInSearchResult[0]);
            // hide top div
            elementsInSearchResult[2].remove();
            document.getElementById('preloaderConterntBefore').style.display =
                'none';
        }
        isLoadingNewContent = 0;
        isOnBottom = 0;
    } else {
        // what to show first based on chosen search language
        for (let i = 0; i < data.length; i++) {
            output.push(
                '<a href="pages/searchResult.php?id=' +
                    data[i][IDIndexName] +
                    '">',
            );
            output.push(
                '<div class=" w3-bar w3-border-bottom noBackColor"><div class="searchResultDiv" data-id="' +
                    data[i][IDIndexName] +
                    '">',
            );
            output.push(
                '<div class="w3-bar"><div class="w3-bar-item" style="padding:0"><h3 style="height:30px"><strong>' +
                    data[i][japanIndexName] +
                    '</strong></h3></div><div class="tick w3-bar-item w3-right" style="margin-bottom:-60px"><div class="tick1"></div></div></div>',
            );

            output.push(
                '<div class="w3-bar"><div style="margin-left: 60px"><h3 style="margin:0; height:30px">' +
                    data[i][czechIndexName] +
                    '</h3></div></div>',
            );
            if (data[i][typeIndexName] == 'word') {
                output.push(
                    '<div class="w3-bar"><div class="w3-item-bar w3-left" style="margin-top:8px">slovíčko</div>',
                );
            } else {
                output.push(
                    '<div class="w3-bar"><div class="w3-item-bar w3-left" style="margin-top:8px">' +
                        data[i][typeIndexName] +
                        '</div>',
                );
            }
            // for showing stitky
            output.push('<div class="stitkyContainsContainer">');
            if (typeof data[i][StitkyForShowing] !== 'undefined') {
                data[i][StitkyForShowing].forEach(element =>
                    output.push('<div class="w3-bar-item w3-right w3-gray" style="padding:0px 2px 0px 2px; margin:3px">' + element + '</div>'),
                );
            }

            output.push('</div></div></div></div></div></div>');
            // end for stitky
            output.push('</a>');
        }
        var node = document.createElement('div');
        node.classList.add(
            'paginationSlovnik',
            'pageNummer' + currentPage + '',
        );
        node.innerHTML = output.join('');
        // if it should show new data upon new search or append on scroll
        if (whereToShowData == 'new') {
            document.getElementById('searchResult').innerHTML = '';
            document.getElementById('searchResult').appendChild(node);
            document.getElementById('preloaderConterntBefore').style.display =
                'none';
        } else if (whereToShowData == 'bottom') {
            document.getElementById('searchResult').appendChild(node);
            document.getElementById('preloaderConterntAfter').style.display =
                'none';
            // hide top div
            if (currentPage > 1) {
                document
                    .getElementsByClassName('paginationSlovnik')[0]
                    .remove();
            }
        } else {
            currentPage++; // because it works
            var elementsInSearchResult = document.getElementsByClassName(
                'paginationSlovnik',
            );
            document
                .getElementById('searchResult')
                .insertBefore(node, elementsInSearchResult[0]);
            // hide top div
            elementsInSearchResult[2].remove();
            document.getElementById('preloaderConterntBefore').style.display =
                'none';
        }
        isLoadingNewContent = 0;
        isOnBottom = 0;
    }
    //$('#searchResult').html(output);
    //document.getElementById("searchResult").innerHTML = output.join('');
}
function showOpenedeResult(data) {
    // to show opened data || BIZA
    //var data = getSearchResult();
    //console.log(data);
    var output = '';
    output +=
        '<div class="w3-row"><div class="w3-bar w3-padding-32" style="padding-bottom:10px !important"><p class="w3-bar-item" style="padding-left:0px;padding-right:0px;font-size:18px">' +
        data[0][japanIndexName] + ' </p><p class="w3-bar" style="margin-left:30px;font-size:18px"> ' + data[0][czechIndexName] +
        '</p>';
    if (data[0][typeIndexName] === 'word') {
        output += '<p class="w3-bar-item w3-right" style="font-size:11px">Slovíčko</p></div><li class="divider" id="dividerPodobnaSlova"></li><div class="w3-bar SimilarThing">Podobné techniky:</div>';
        // search teqniuqeus to search similaar
        getSimilarTechniques(data[0][japanIndexName]);
    } else {
        output +=
            '<p class="w3-bar-item w3-right" style="font-size:11px; padding-right:0px; padding-left:0px">' +
            data[0][typeIndexName] +
            '</p></div><li class="divider"></li>';
        output +=
            '<div class="w3-third" id="hover_pic"><img src="/slovnik/admin/imgResized/' +
            data[0][imageUrlNONIndexName] +
            '" alt="' +
            data[0][japanIndexName] +
            '" width="100%"></div>';
        output +=
            '<div class="w3-twothird"><div style="margin-left:16px;">' +
            data[0][contentNONIndexName] +
            '</div></div></div><li class="divider" id="dividerPodobnaSlova"></li><div class="w3-bar SimilarThing">Podobná slova:</div>';
        // search words to debunk
        var splitTechnique = data[0][japanIndexName].split(' ');
        getSimilarWords(splitTechnique);
    }
    $('#wordOutput').html(output);
}
function showSimilarWords(data) {
    // renders similar words and appends them to wordOutput || BIZA
    var output = '';
    for (let i = 0; i < data.length; i++) {
        output += '<a href="searchResult.php?id=' + data[i][IDIndexName] + '">';
        output += '<div class="w3-bar w3-border-bottom" >';
        output +=
            '<div class="w3-bar"><h3 class="w3-bar-item" style="margin:0"><strong>' +
            data[i][japanIndexName] +
            '</strong></h3></div>';
        output +=
            '<div class="w3-bar"><h3 class="w3-bar-item" style="margin:0;margin-left:20px;">' +
            data[i][czechIndexName] +
            '</h3></div>';
        output += '</div>';
        output += '</a>';
    }
    $('#wordOutput').append(output);
}
function showSimilarTechniques(data) {
    // renders similar techiques and appends them to wordOutput || BIZA
    var output = '';
    for (let i = 0; i < data.length; i++) {
        output += '<a href="searchResult.php?id=' + data[i][IDIndexName] + '">';
        output += '<div class=" z-depth-1 " >';
        output +=
            '<div class=""><p class=" flow-text">' +
            data[i][japanIndexName] +
            '</p></div>';
        output +=
            '<div class=""><p class=" flow-text">' +
            data[i][czechIndexName] +
            '</p></div>';
        output += '</div>';
        output += '</a>';
    }
    $('#wordOutput').append(output);
}
function showTechniquesToSearch(data) {
    // showing thign that lets you choose what techniques you want to see || BIZA
    var output = '';
    // select all / diselect all
    output += '<p>';
    output += '<label class="container">Vybrat vše';
    output +=
        '<input type="checkbox" checked="checked" id="selectAllDiselectAllController" class="TechniquesWordsOnClick filter_box" />';
    output += '<span class="checkmark"></span>';
    output += '</label>';
    output += '</p>';
    //pridaval jsem classy a premistoval data, mozna se neco pokazilo nonono MAXMAMXMAMXMAXMXAMXAMXAMXAMMXAMXA
    for (let i = 0; i < data.length; i++) {
        output += '<p>';
        output += '<label class="container">' + data[i][valueIndexNameMetadata];
        output +=
            '<input type="checkbox" checked="checked" class="selectAllDiselectAll TechniquesWordsOnClick filter_box" data-searchvalue="' +
            data[i][valueIndexNameMetadata] +
            '"/>';
        output += '<span class="checkmark"></span>';
        output += '</label>';
        output += '</p>';
    }
    $('#techniquesChooser').html(output);
}
// shows modal stitky added || BIZA
function showModalStitkyAdder() {
    var output = '';
    output += '<div class="w3-bar"><h2 class="w3-bar-item">Přidávání a odebírání štítků</h2></div><li class="divider" style="border-color:#be0029 !important;border: 0.5px solid;margin-bottom: 16px !important;"></li><form class="col s12" id="stitkyForm">';
    output += '<div class="w3-bar">';
        output += '<label for="nazevStitku">Název štítku: </label></div><div class="w3-bar">';
        output += '<input id="nazevStitku" type="text" class="validate input_css" style="width:73%" data-lpignore="true">';
        output += '<a class="w3-bar-item w3-display-container right" id="pridatStitekButton" style="padding: 16px 24px;"><div class="w3-display-middle w3-button w3-bar-item">+</div></a>';
        output += '<p id="StitkyMessage"></p>';
    output += '</div>';
    output += '</form><hr style="border-color:#ccc; margin-bottom:10px; margin-top:10px">';
    output += '<div id="modalStitkyConrolerrDiv">'; // div for showing all checkboxes
    output += '</div>';
    $('#LabelAdd').html(output);
}
// shows modal stitky adder || BIZA
function showModalStitkyController(data) {
    output = '';
    for (let i = 0; i < data.length; i++) {
        output +=
            '<div class="modalStitkyControleerContainer"><div class="w3-bar"><p class="w3-bar-item">' +
            data[i][nameIndexNameLABELS] +
            '</p>';
        output +=
            '<a  style="margin:0"  class="buttonsToAddRemove modalStitkyRemove w3-right w3-button" data-id="' +
            data[i][IDIndexNameINLABELS] +
            '" data-name="' +
            data[i][nameIndexNameLABELS] +
            '">-</a>';
        output +=
            '<a style="margin:0" class="buttonsToAddRemove modalStitkyAdd w3-button w3-right" data-id="' +
            data[i][IDIndexNameINLABELS] +
            '" data-name="' +
            data[i][nameIndexNameLABELS] +
            '" >+</a>';
        output += '</div></div><hr style="border-color:#ccc; margin-bottom:10px; margin-top:0px">';
    }
    $('#modalStitkyConrolerrDiv').html(output);
}
// shows modal stitky adder || BIZA
function showModalStitkyControllerSTITKY(data) {
    output = '';
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        output += '<div class="w3-bar"><a href="StitkyResult.php?id=' + data[i][IDIndexName] + '">';
        output +=
            '<div class="modalStitkyControleerContainer changeToForm' +
            data[i][IDIndexNameINLABELS] +
            '">';
        output +=
            '<div class="w3-bar-item">' + data[i][nameIndexNameLABELS] + '</div>';
        output += '</a>';
        output +=
            '<a class="w3-bar-item w3-button right buttonsToAddRemove modalStitkyDelete" style="margin-right:5px;" data-id="' +
            data[i][IDIndexNameINLABELS] +
            '" data-name="' +
            data[i][nameIndexNameLABELS] +
            '" ><i class="material-icons">delete</i></a>';
        output +=
            '<a class="w3-bar-item w3-button right buttonsToAddRemove modalStitkyEdit" data-id="' +
            data[i][IDIndexNameINLABELS] +
            '" data-name="' +
            data[i][nameIndexNameLABELS] +
            '" ><i class="material-icons">mode_edit</i></a>';
        output += '</div></div></div><li class="divider"></li>';
    }
    $('#modalStitkyConrolerrDiv').html(output);
}
function showSearchResultBYID(data, StitkyData) {
    // to show search data by ID || BIZA
    getAndApeendNamesStitky().then(function(databata) {
        data = combineArraysOfObjects(data, databata);
        var output = '';
        for (let i = 0; i < data.length; i++) {
            output +=
                '<div class="searchResultDiv w3-border-bottom" data-id="' +
                data[i][IDIndexName] +
                '">';
            output +=
                '<div class="w3-bar"><div class="w3-bar-item padding-zero"><h3 class="h3-height"><strong>' +
                data[i][japanIndexName] +
                '</strong></h3></div>';
                
            output +=
            '<a class="w3-button modalStitkyRemove w3-right" style="height:38px;margin-top:-10px" data-id="' +
            StitkyData[0][IDIndexNameINLABELS] +
            '" data-name="' +
            StitkyData[0][nameIndexNameLABELS] +
            '" data-idofremove="' +
            data[i][IDIndexNameINLABELS] +
            '"><i class="material-icons" style="margin-top:5px">clear</i></a></div>';
            output +=
                '<div class="w3-bar"><div style="margin-left:60px"><h3 class="h3-height-margin">' +
                data[i][czechIndexName] +
                '</h3></div></div>';
            if (data[i][typeIndexName] == 'word') {
                output +=
                    '<div class="w3-bar"><div class="w3-item-bar w3-left">slovíčko</div>';
            } else {
                output +=
                    '<div class="w3-bar"><div class="w3-item-bar w3-left margin-bottom-10" >' +
                    data[i][typeIndexName] +
                    '</div>';
            }
            // for showing stitky
            output += '<div class="stitkyContainsContainer">';
            if (typeof data[i][StitkyForShowing] !== 'undefined') {
                data[i][StitkyForShowing].forEach(
                    element =>
                        (output += '<div class="w3-bar-item w3-right w3-gray tag-col" style="padding:0px 2px 0px 2px; margin:3px">' + element + '</div>'),
                );
            }

            output += '</div></div></div>';
            // end for stitky
        }

        $('#stitkyResult').html(output);
    });
}
// displays google user icon || BIZA
function displayUserIcon(data) {
    var output = '';
    output += '<img class="w3-bar-item" src="'+data["picture"]+'" alt="Obrázek uživatele" style="width:120px; margin:auto; border-radius:50%;"><div class="w3-bar-item" style="padding-bottom:0;">'+data["email"]+'</div><div class="w3-bar-item" style="padding-top:0;">'+data["name"]+ ' ' +data["surname"]+'</div>';
    $('#userInfo').html(output);
}
// displays fake user icon || BIZA
function displayUserIconFake() {
    var output = '';
    output += '<div class="w3-bar-item" style="margin-top:16px !important;width:88px;height:88.4px;background-color:#981010;margin:auto;border-radius:50%;margin-top:8px"><i class="material-icons" style="margin-top: 11px;font-size: 56px;">person</i></div><div class="w3-bar-item" style="padding-bottom:0;height: 30.4px;width:0.1px"></div><div class="w3-bar-item" style="padding-top:0;height: 30.4px;width:0.1px"></div>';
    console.log(output)
    $('#userInfo').html(output);
}