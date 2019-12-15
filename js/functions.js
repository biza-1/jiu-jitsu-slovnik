// function to check internet, tries to get justcheck.html element || BIZA
//if it can get it: internet
// if not: no internet
function isOnline(no, yes) {
    var xhr = XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHttp');
    xhr.onload = function() {
        if (yes instanceof Function) {
            yes();
        }
    };
    xhr.onerror = function() {
        if (no instanceof Function) {
            no();
        }
    };
    xhr.open('GET', 'justcheck.html', true);
    xhr.send();
}
// for getting data from url withou PHP || BIZA
function getAllUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {
        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof a[1] === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string')
                paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {
                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (
                    obj[paramName] &&
                    typeof obj[paramName] === 'string'
                ) {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}
function checkIfOnline(dots) {
    // check is online || BIZA
    dottingSystem = '';
    for (let i = 0; i < dots; i++) {
        dottingSystem += '../';
    }
    var url = dottingSystem + 'pages/justcheck.html';
    var result;
    var marek = $.ajax({
        type: 'GET',
        url: url,
        timeout: 5000,
        success: function() {
            result = true;
            console.log('got');
        },
        fail: function() {
            result = false;
            console.log('not');
        },
    });
    console.log(marek);
    if (result) {
        return true;
    } else {
        return false;
    }
}

// function to make element fade in and than to fade out || BIZA
function makeFadeInOut(name) {
    $(name)
        .fadeTo(0, 0)
        .fadeIn(1000)
        .fadeTo(1000, 1)
        .fadeTo(5000, 1)
        .fadeOut(1000);
}
// for combining arrays and dont having duplicates || BIZA
function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) a.splice(j--, 1);
        }
    }

    return a;
}
// for combininig arrrays of objects by ID
function combineArraysOfObjects(a1, a2) {
    var mergedList = _.map(a1, function(item) {
        return _.extend(item, _.findWhere(a2, { ID: item.ID }));
    });
    return mergedList;
}
// uploads stitky to MYSQL || BIZA
function uploadStitkyToDB(uploadData, userID) {
    $.ajax({
        type: 'POST',
        url: '../phpRequests/uploadStityktoDB.php',
        data: 'check=5&data=' + uploadData + '&userID=' + userID,
        success: function(data) {
            console.log(data);
        },
    });
}
// for checking unchecking STITKY selector || BIZA
function ifSelectAllStityk() {
    if ($('.searchResultDiv').length == $('.selectedSearchResult').length) {
        $('#selectAllDiselectAllControllerSTITKY').prop('checked', true);
    } else {
        $('#selectAllDiselectAllControllerSTITKY').prop('checked', false);
    }
}
