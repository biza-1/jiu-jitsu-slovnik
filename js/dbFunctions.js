// gets slovicka from DB using Dexie.js || BIZA
function dbGetSlovicka() {
    // AJAX  for updating DEXIE.js with Techniques and Words
    $.ajax({
        type: 'POST',
        url: 'phpRequests/getSlovnik.php',
        data: 'check',
        success: function (data) {
            data = JSON.parse(data);
            //console.log(data);
            db[sortStoreName].clear();
            db[sortStoreName].bulkPut(data).then(function () {
                // for adding stitky to SLOVICKA because it erases every time
                updateSlovickaWithStitky();
                addCurentTimetoDB(); // for updating once a day
            });
            // for fiiling another table for STITY
            //stitkyIDnames = data.map(data => ({ [idOfWordsStitky]: data.ID }));

            // AJAX for getting metadata
            $.ajax({
                type: 'POST',
                url: 'phpRequests/getMetadata.php',
                data: 'check',
                success: function (data) {
                    data = JSON.parse(data);
                    //console.log(data);
                    db[metadataStoreName]
                        .where(IDIndexNameINMetadata)
                        .above(0)
                        .delete();
                    db[metadataStoreName].bulkPut(data);
                    // to show techniques collapisble onLoad
                    getTechniquesToSearch();
                    // calling it here to load after loading new resources
                    getSearchResult();                    
                },
            });
        },
    });
}
// getting search result (supposed to be smart) || BIZA
function getSearchResult(whereToShowData = 'new') {
    // whereToShowData > if appennd, preppend or replace html
    // searching in czech or japanese and changing the value
    isLoadingNewContent = 1;
    if (whereToShowData == 'new') {
        currentPage = 0;
        document.getElementById(
            'preloaderConterntBefore',
        ).style.display = 'block';
    }
    if ($('.selectAllDiselectAll').length == 0) {
        var showAllThing = true;
    } else {
        var showAllThing = false;
    }
    if ($('#japan_czech').text() == 'CZ') {
        var searchIn = czechIndexName;
    } else {
        var searchIn = japanIndexName;
    } // what to search in if in Japanese of Czech
    // search value
    var searchValue = $('#nazev2').val();
    // if all types of techniques are checked for better performance
    var allTypesOfTechniquesChecked = document.getElementById(
        'selectAllDiselectAllControllerSTITKY',
    ).checked;
    // what types to search in
    var slovickaChecked = $('#TechniquesWordsOnClickSlovicka').is(':checked');
    var techniquesChecked = $('#TechniquesWordsOnClickTechniky').is(':checked');
    // TODO check if all stitky checked
    var allTypesOfTechniquesChecked = $('#selectAllDiselectAllController').is(
        ':checked',
    );
    //if search in Words / Techniques (and what techniques)
    // techniques selected altributes
    if (techniquesChecked) {
        // gets only when all techniques not checked or when teqniques not selected
        var techniquesCheckedAtributes = $('.selectAllDiselectAll:checked')
            .map(function () {
                return $(this).data('searchvalue');
            })
            .get();
    }
    if (showAllThing) {
        db[sortStoreName]
            .where(searchIn)
            .startsWithIgnoreCase(searchValue)
            .offset(currentPage * pageSize)
            .limit(pageSize)
            .toArray(function (data) {
                if (data.length <= 0 && whereToShowData != 'new') {
                    switch (
                        whereToShowData // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it
                    ) {
                        case 'bottom':
                            currentPage--;
                            document.getElementById(
                                'preloaderConterntAfter',
                            ).style.display = 'none';
                            isOnBottom = 1;
                            break;
                        case 'top':
                            currentPage += 2;
                            document.getElementById(
                                'preloaderConterntBefore',
                            ).style.display = 'none';
                            break;
                    }
                    isLoadingNewContent = 0;
                } else {
                    showSearchResult(data, whereToShowData);
                }
            });
    } else if (
        slovickaChecked &&
        techniquesChecked &&
        allTypesOfTechniquesChecked
    ) {
        db[sortStoreName]
            .where(searchIn)
            .startsWithIgnoreCase(searchValue)
            .offset(currentPage * pageSize)
            .limit(pageSize)
            .toArray(function (data) {
                if (data.length <= 0 && whereToShowData != 'new') {
                    switch (
                        whereToShowData // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it
                    ) {
                        case 'bottom':
                            currentPage--;
                            document.getElementById(
                                'preloaderConterntAfter',
                            ).style.display = 'none';
                            isOnBottom = 1;
                            break;
                        case 'top':
                            currentPage += 2;
                            document.getElementById(
                                'preloaderConterntBefore',
                            ).style.display = 'none';
                            break;
                    }
                    isLoadingNewContent = 0;
                    /*whereToShowData = "new";
          var t1 = performance.now();
          console.log("s vyhledavani a ebz " + (t1 - t0) + " milliseconds.");
          // TODO CHECK if returned any data
          showSearchResult(data, whereToShowData);*/
                } else {
                    showSearchResult(data, whereToShowData);
                }
            });
    } else if (slovickaChecked && techniquesChecked) {
        techniquesCheckedAtributes.push('word');

        db[sortStoreName]
            .where(searchIn)
            .startsWithIgnoreCase(searchValue)
            .and(function (data) {
                return techniquesCheckedAtributes.includes(data[typeIndexName]);
            })
            .offset(currentPage * pageSize)
            .limit(pageSize)
            .toArray(function (data) {
                if (data.length <= 0 && whereToShowData != 'new') {
                    switch (
                        whereToShowData // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it
                    ) {
                        case 'bottom':
                            currentPage--;
                            document.getElementById(
                                'preloaderConterntAfter',
                            ).style.display = 'none';
                            isOnBottom = 1;
                            break;
                        case 'top':
                            currentPage += 2;
                            document.getElementById(
                                'preloaderConterntBefore',
                            ).style.display = 'none';
                            break;
                    }
                    isLoadingNewContent = 0;
                    /*whereToShowData = "new";
          var t1 = performance.now();
          console.log("s vyhledavani" + (t1 - t0) + " milliseconds.");
          // TODO CHECK if returned any data
          showSearchResult(data, whereToShowData);*/
                } else {
                    showSearchResult(data, whereToShowData);
                }
            });
    } else if (slovickaChecked) {
        // with only Word selected
        // smart searchs
        db[sortStoreName]
            .where(searchIn)
            .startsWithIgnoreCase(searchValue)
            .and(function (data) {
                return data[typeIndexName] == 'word';
            })
            .offset(currentPage * pageSize)
            .limit(pageSize)
            .toArray(function (data) {
                if (data.length <= 0 && whereToShowData != 'new') {
                    switch (
                        whereToShowData // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it
                    ) {
                        case 'bottom':
                            currentPage--;
                            document.getElementById(
                                'preloaderConterntAfter',
                            ).style.display = 'none';
                            isOnBottom = 1;
                            break;
                        case 'top':
                            currentPage += 2;
                            document.getElementById(
                                'preloaderConterntBefore',
                            ).style.display = 'none';
                            break;
                    }
                    isLoadingNewContent = 0;
                    /*whereToShowData = "new";
          showSearchResult(data, whereToShowData);*/
                } else {
                    showSearchResult(data, whereToShowData);
                }
            });
    } else if (techniquesChecked) {
        // with only Technques checked
        // smart searchs
        db[sortStoreName]
            .where(searchIn)
            .startsWithIgnoreCase(searchValue)
            .and(function (data) {
                return techniquesCheckedAtributes.includes(data[typeIndexName]);
            })
            .offset(currentPage * pageSize)
            .limit(pageSize)
            .toArray(function (data) {
                if (data.length <= 0 && whereToShowData != 'new') {
                    switch (
                        whereToShowData // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it // for hiding the loader where there is no content and where to hide it
                    ) {
                        case 'bottom':
                            currentPage--;
                            document.getElementById(
                                'preloaderConterntAfter',
                            ).style.display = 'none';
                            isOnBottom = 1;
                            break;
                        case 'top':
                            currentPage += 2;
                            document.getElementById(
                                'preloaderConterntBefore',
                            ).style.display = 'none';
                            break;
                    }
                    isLoadingNewContent = 0;
                    /*whereToShowData = "new";
          showSearchResult(data, whereToShowData);*/
                } else {
                    showSearchResult(data, whereToShowData);
                }
            });
    } else {
        showSearchResult('', whereToShowData);
    }

    //console.log("3");
    //console.log(returnData);
    //showSearchResult(returnData);
}

function getTechniquesToSearch() {
    //for searching metadata for Type of Techniques || BIZA

    db[metadataStoreName]
        .where(keyIndexNameMetadata)
        .equals('technique')
        .toArray(function (data) {
            showTechniquesToSearch(data);
        });
}

function getSimilarWords(search) {
    //for searching metadata for Type of Techniques || BIZA

    db[sortStoreName]
        .where(japanIndexName)
        .anyOf(search)
        .and(function (data) {
            return data[typeIndexName] == 'word';
        })
        .limit(10)
        .toArray(function (data) {
            showSimilarWords(data);
        });
}

function getSimilarTechniques(search) {
    //for searching metadata for Type of Techniques || BIZA

    db[sortStoreName]
        .where(typeIndexName)
        .notEqual('word')
        .and(function (data) {
            var splitTechnique = data[japanIndexName].split(' ');
            if (splitTechnique.includes(search)) {
                return true;
            }
        })
        .limit(10)
        .toArray(function (data) {
            showSimilarWords(data);
        });
}

function checkIfUserExists() {
    // check if user is logged in in IndexedDB || BIZA
    db[metadataStoreName]
        .where(keyIndexNameMetadata)
        .equals('userLogin')
        .and(function (data) {
            return data[valueIndexNameMetadata] !== '';
        })
        .toArray(function (data) {
            if (typeof data == 'undefined' || data.length == 0) {
                $('.showUserLogOff').html('');
            } else {
                $('.showUserLogOff').html(
                    '<a href="#" onclick="signOut();" class="w3-button w3-bar-item w3-padding-16">Sign out</a><li class="divider"></li>',
                );
            }
        });
}
// checks if user is in IndexedDB || BIZA
function ifUserLogedIn() {
    // check if user is logged in by looking into IndexedDb
    return db[metadataStoreName]
        .where(IDIndexNameINMetadata)
        .equals(0)
        .toArray(function (data) {
            if (typeof data !== 'undefined' && data.length > 0) {
                return true;
            } else {
                return false;
            }
        });
}
// sign in with google and ads to indexedDB || BIZA
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/slovnik/phpRequests/loginRegister.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        data = xhr.responseText;
        data = data.split('||&^*&%^^*(%*&^&&*(&(*&((*@*');
        if (data[0] == 'vseOK') {
            //data = jQuery.parseJSON(data);
            //console.log(data);
            userData = JSON.parse(data[1]);
            data = userData['ID'];
            getUserID().then(function (UserId) {
                if (UserId != data) {
                    dataAdd = {
                        [IDIndexNameINMetadata]: 0,
                        [keyIndexNameMetadata]: 'userLogin',
                        [valueIndexNameMetadata]: data,
                    };
                    db[metadataStoreName].put(dataAdd).then(function () {
                        // when user changes it deletes all stitky for showing and uses theirs instead
                        updateSlovickaWithStitky();
                    });
                    // for saving data to show user icon
                    dataAdd = {
                        [IDIndexNameINMetadataLOCAL]: 1,
                        [keyIndexNameMetadataLOCAL]: 'userninfo',
                        [valueIndexNameMetadataLOCAL]: userData,
                    };
                    db[metadataStoreNameLOCAL].put(dataAdd).then(function () {
                        showUserIcon();
                    });
                }
            })
            $('.showUserLogOff').html(
                '<a href="#" onclick="signOut();" class="w3-button w3-bar-item w3-padding-16">Odhlásit se</a><li class="divider"></li>',
            );
        }
    };
    xhr.send('id_token=' + id_token);
}

// signs out from google and deletes from IndexedDB || BIZA
function signOut() {
    // when user signs out wiht google
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        db[metadataStoreName]
            .where(IDIndexNameINMetadata)
            .equals(0)
            .delete()
            .then(function () {
                db[sortStoreName].toCollection().modify(function (friend) {
                    friend[StitkyForShowing] = undefined;
                });
            })
            .then(function () {
                db[metadataStoreNameLOCAL]
                    .where(IDIndexNameINMetadataLOCAL)
                    .equals(1)
                    .delete();
            })
            .then(function () {
                // shows fake user icon
                showUserIcon();
                if (window.location.href.includes("pages/stitky.php") || window.location.href.includes("pages/StitkyResult.php")) {
                    location.href = "/slovnik/";
                }
            });
    });
    // to delete session
    $.ajax({
        type: 'POST',
        url: '/slovnik/phpRequests/logout_action2.php',
        data: '',
        success: function (data) {
            console.log('User signed out.');
        },
    });

    $('.showUserLogOff').html('');
    //location.reload();
}
// for showtin user google icons or displays fake icon || BIZA
function showUserIcon() {
    db[metadataStoreNameLOCAL]
        .where(IDIndexNameINMetadataLOCAL)
        .equals(1)
        .toArray(function (data) {
            if (typeof data !== 'undefined' && data.length > 0) {
                displayUserIcon(data[0]['value']);
            } else {
                displayUserIconFake();
            }
        });
}

// checks if stitek is allready in db || BIZA
function checkIfStitekIsInDB(value) {
    return getUserID().then(function (UserId) {
        return db[labesStoreName]
            .where(nameIndexNameLABELS)
            .equals(value)
            .and(function (data) {
                return data[userIDIndexNameINLABELS] === UserId;
            })
            .toArray(function (data) {
                if (typeof data !== 'undefined' && data.length > 0) {
                    return true;
                } else {
                    return false;
                }
            });
    });
}
// gets user id from indexedDb || BIZA
function getUserID() {
    return db[metadataStoreName]
        .where(IDIndexNameINMetadata)
        .equals(0)
        .toArray(function (data) {
            if (typeof data !== 'undefined' && data.length > 0) {
                return data[0]['value'];
            } else {
                return "-5";
            }
        });
}
// function check if stitek ammount is above or below limit || BIZA
function checkStitkyAmmount() {
    return getUserID().then(function (UserId) {
        return db[labesStoreName]
            .where(userIDIndexNameINLABELS)
            .equals(UserId)
            .toArray(function (data) {
                if (typeof data !== 'undefined' && data.length > 0) {
                    return data.length;
                } else {
                    return 0;
                }
            });
    });
}
// adds stitek to db || BIZA
function addStitektoDb(nazevStitku) {
    return getUserID().then(function (userID) {
        dataAdd = {
            [userIDIndexNameINLABELS]: userID,
            [nameIndexNameLABELS]: nazevStitku,
        };
        return db[labesStoreName].put(dataAdd);
    });
}
// adds stitek to db with contiais || BIZA
function addStitektoDbwihtContaint(nazevStitku, conaints) {
    return getUserID().then(function (userID) {
        dataAdd = {
            [userIDIndexNameINLABELS]: userID,
            [nameIndexNameLABELS]: nazevStitku,
            [containsIndexNameLABELS]: conaints,
        };
        return db[labesStoreName].put(dataAdd).then(function () {
            updateSlovickaWithStitky();
            getModalStitkyController(1); // shows all Stitky
        });
    });
}
// function to get all STITKY Names || BIZA
function getModalStitkyController(a) {
    getUserID().then(function (UserId) {
        db[labesStoreName]
            .where(userIDIndexNameINLABELS)
            .equals(UserId)
            .toArray(function (data) {
                if (typeof data === 'undefined' && data.length <= 0) {
                    data = [];
                }
                if (a == 0) {
                    showModalStitkyController(data);
                } else {
                    showModalStitkyControllerSTITKY(data);
                }
            });
    });
}
// to label words with STITEk || BIZA
function addLabelsToWords(id, idOfWords, nameOfTehcniques) {
    db[labesStoreName]
        .where(IDIndexNameINLABELS)
        .equals(id)
        .toArray(function (data) {
            if (
                typeof data[0][containsIndexNameLABELS] !== 'undefined' &&
                data[0][containsIndexNameLABELS].length > 0
            ) {
                var soucasneHodnoty = data[0][containsIndexNameLABELS];
                var pridanaArray = arrayUnique(
                    soucasneHodnoty.concat(idOfWords),
                );
                db[labesStoreName].update(id, {
                    [containsIndexNameLABELS]: pridanaArray,
                });
            } else {
                db[labesStoreName].update(id, {
                    [containsIndexNameLABELS]: idOfWords,
                });
            }
        })
        .then(function () {
            // this thing is for faster displaying
            addSTITKYlabelToWord(idOfWords, nameOfTehcniques);
        });
}
// to remove label words from STITEk || BIZA
function removeLabelFromWord(id, idOfWords, nameOfTehcniques, ifJump=0) {
    db[labesStoreName]
        .where(IDIndexNameINLABELS)
        .equals(id)
        .toArray(function (data) {
            if (
                typeof data[0][containsIndexNameLABELS] !== 'undefined' &&
                data[0][containsIndexNameLABELS].length > 0
            ) {
                var soucasneHodnoty = data[0][containsIndexNameLABELS];
                var array1 = soucasneHodnoty;
                var array2 = idOfWords;
                var index;
                // remove same attributes to remove STITKY
                for (var i = 0; i < array2.length; i++) {
                    index = array1.indexOf(array2[i]);
                    if (index > -1) {
                        array1.splice(index, 1);
                    }
                }
                pridanaArray = array1;
                db[labesStoreName].update(id, {
                    [containsIndexNameLABELS]: pridanaArray,
                });
            }
        })
        .then(function () {
            // this thing is for faster displaying
            // convering to string to be able to serch
            whereToSeacht = idOfWords.map(String);
            db[stitkyStoreName]
                .where(idOfWordsStitky)
                .anyOf(whereToSeacht)
                .toArray(function (data) {
                    for (let index2 = 0; index2 < data.length; index2++) {
                        if (
                            typeof data[index2][StitkyForShowing] !==
                            'undefined' &&
                            data[index2][StitkyForShowing].length > 0
                        ) {
                            var soucasneHodnoty =
                                data[index2][StitkyForShowing];
                            var array1 = soucasneHodnoty;
                            var array2 = nameOfTehcniques;
                            // remove same attributes to remove STITKY
                            for (var i = 0; i < array1.length; i++) {
                                if (array1[i] === array2) {
                                    array1.splice(i, 1);
                                }
                            }
                            pridanaArray = array1;
                            db[stitkyStoreName].update(
                                data[index2][idOfWordsStitky], {
                                    [StitkyForShowing]: pridanaArray,
                                },
                            );
                        }
                    }
                    if (ifJump === 1) {
                        getLabelContains(id);
                    }
                });
            // TODO call search result to show change STITKY
        });
}

function addSTITKYlabelToWord(idOfWords, nameOfTehcniques) {
    // convering to string to be able to serch
    whereToSeacht = idOfWords.map(String);
    db[stitkyStoreName]
        .where(idOfWordsStitky)
        .anyOf(whereToSeacht)
        .toArray(function (data) {
            for (let index = 0; index < data.length; index++) {
                if (
                    typeof data[index][StitkyForShowing] !== 'undefined' &&
                    data[index][StitkyForShowing].length > 0
                ) {
                    var soucasneHodnoty = data[index][StitkyForShowing];
                    var pridanaArray = arrayUnique(
                        soucasneHodnoty.concat(nameOfTehcniques),
                    );
                    db[stitkyStoreName].update(data[index][idOfWordsStitky], {
                        [StitkyForShowing]: pridanaArray,
                    });
                } else {
                    var arrayOfTechiques = [];
                    arrayOfTechiques.push(nameOfTehcniques);
                    db[stitkyStoreName].update(data[index][idOfWordsStitky], {
                        [StitkyForShowing]: arrayOfTechiques,
                    });
                }
            }
        });
    // TODO call search result to show change STITKY
}
// for adding id of extended words stitky|| BIZA
function addStitkyToNamesStitkyDB(data) {
    db[stitkyStoreName].bulkAdd(data);
    // TODO OPTIMIZE THE IDes, ID that not match > delete
}
// for rewriting the arrayOfNamesStity so i dont have to run query every time
function getAndApeendNamesStitky() {
    return db[stitkyStoreName]
        .where(StitkyForShowing)
        .notEqual('')
        .toArray(function (data) {
            return data;
        });
}
// to remove ENITRE label from STITEk || BIZA
function removeLabelFromWordENTRELY(id, nameOfTehcniques) {
    return db[labesStoreName]
        .where(IDIndexNameINLABELS)
        .equals(id)
        .toArray(function (data) {
            if (
                typeof data[0][containsIndexNameLABELS] !== 'undefined' &&
                data[0][containsIndexNameLABELS].length > 0
            ) {
                var soucasneHodnoty = data[0][containsIndexNameLABELS];
                return soucasneHodnoty;
            } else {
                return [];
            }
        })
        .then(function (idOfWords) {
            // this thing is for faster displaying
            // convering to string to be able to serch
            whereToSeacht = idOfWords.map(String);
            db[stitkyStoreName]
                .where(idOfWordsStitky)
                .anyOf(whereToSeacht)
                .toArray(function (data) {
                    for (let index2 = 0; index2 < data.length; index2++) {
                        if (
                            typeof data[index2][StitkyForShowing] !==
                            'undefined' &&
                            data[index2][StitkyForShowing].length > 0
                        ) {
                            var soucasneHodnoty =
                                data[index2][StitkyForShowing];
                            var array1 = soucasneHodnoty;
                            var array2 = nameOfTehcniques;
                            console.log(soucasneHodnoty);
                            console.log(nameOfTehcniques + 'anove');
                            // remove same attributes to remove STITKY
                            for (var i = 0; i < array1.length; i++) {
                                if (array1[i] === array2) {
                                    array1.splice(i, 1);
                                }
                            }
                            console.log(array1);
                            pridanaArray = array1;
                            db[stitkyStoreName].update(
                                data[index2][idOfWordsStitky], {
                                    [StitkyForShowing]: pridanaArray,
                                },
                            );
                        }
                    }
                });
            // TODO call search result to show change STITKY
        })
        .then(function () {
            db[labesStoreName]
                .where(IDIndexNameINLABELS)
                .equals(id)
                .delete();
        });
}
// gets what label cotains || BIZA
function getLabelContains(id) {
    id = parseInt(id);
    db[labesStoreName]
        .where(IDIndexNameINLABELS)
        .equals(id)
        .toArray(function (data) {
            $('#name').html(data[0][nameIndexNameLABELS]);
            getSearchResultByID(data[0][containsIndexNameLABELS], data);
        });
}
// gets search result by ID || BIZA
function getSearchResultByID(ids, StitkyData) {
    searc = ids.map(String);
    console.log(searc);
    db[sortStoreName]
        .where(IDIndexName)
        .anyOf(searc)
        .toArray(function (data) {
            showSearchResultBYID(data, StitkyData);
        });
}
// gets all stitky for uplading to db || BIZA
function getAllStitky() {
    getUserID().then(function (UserId) {
        db[labesStoreName]
            .where(userIDIndexNameINLABELS)
            .equals(UserId)
            .toArray(function (data) {
                data = JSON.stringify(data);
                if (data.length > 16777215) {
                    document.getElementById('modal-contentINFO').innerHTML =
                        '<h2>Soubor je moc velký prosím zmenšete jeho velikost nebo se obraťte na podporu, aby velikost zvětšila.</h2>';
                    $('#modalINFO').modal('open');
                } else {
                    uploadStitkyToDB(data, UserId);
                }
            });
    });
}
// downloads Stitky from db and adds them to IndexedDb || BIZA
function downlaodStitky() {
    getUserID().then(function (UserId) {
        console.log(UserId);
        $.ajax({
            type: 'POST',
            url: '../phpRequests/getStitkyfromDb.php',
            data: 'check=5&UserID=' + UserId,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                if (typeof data !== 'undefined' || data.length > 0) {
                    // cleans stitky store name to later new appendetion
                    db[stitkyStoreName].toCollection().modify(function (stitky) {
                        stitky[StitkyForShowing] = [];
                    });
                    // deletes everything with user id to clean and be able to add new
                    db[labesStoreName]
                        .where(userIDIndexNameINLABELS)
                        .equals(data[0]['UserID'])
                        .delete()
                        .then(function () {
                            contaisStitky = JSON.parse(data[0]['contains']);
                            for (
                                let index = 0, p = Promise.resolve(); index < contaisStitky.length; index++
                            ) {
                                p = p.then(
                                    _ =>
                                    new Promise(resolve =>
                                        setTimeout(function () {
                                            // for adding new stitek to db
                                            addStitektoDbwihtContaint(
                                                contaisStitky[index][
                                                    'name'
                                                ],
                                                contaisStitky[index][
                                                    'contains'
                                                ],
                                            );
                                            /*.then(function(
                                                                                               idOfStitkyName,
                                                                                           ) {
                                                                                               // for appending data to new stitek
                                                                                               addLabelsToWords(
                                                                                                   idOfStitkyName,
                                                                                                   contaisStitky[index][
                                                                                                       'contains'
                                                                                                   ],
                                                                                                   contaisStitky[index][
                                                                                                       'name'
                                                                                                   ],
                                                                                               );
                                                                                           });*/
                                            resolve();
                                        }, Math.random() * 1000),
                                    ),
                                );
                            }
                            getModalStitkyController(1); // shows all Stitky
                        });
                } else {
                    alert('nic neni v databazi');
                }
            },
        });
    });
}
// for renaming stitek in DB || BIZA
function renameStitekInDB(idOfStitek, nameOfStitek, oldNameOfStitek) {
    db[labesStoreName].update(idOfStitek, {
        [nameIndexNameLABELS]: nameOfStitek,
    });
    return db[labesStoreName]
        .where(IDIndexNameINLABELS)
        .equals(idOfStitek)
        .toArray(function (data) {
            return data[0][containsIndexNameLABELS];
        })
        .then(function (data) {
            console.log('here');
            removeStitekDb(data, oldNameOfStitek).then(function() {
                console.log('aaa');
                addSTITKYlabelToWord(data, nameOfStitek);
            });            
        });
}
// removes stitek from stitky so i can change name || BIZA
function removeStitekDb(idOfWords, nameOfTehcniques) {
    whereToSeacht = idOfWords.map(String);
    return db[stitkyStoreName]
        .where(idOfWordsStitky)
        .anyOf(whereToSeacht)
        .toArray(function (data) {
            console.log(data);
            for (let index2 = 0; index2 < data.length; index2++) {
                if (
                    typeof data[index2][StitkyForShowing] !== 'undefined' &&
                    data[index2][StitkyForShowing].length > 0
                ) {
                    var soucasneHodnoty = data[index2][StitkyForShowing];
                    var array1 = soucasneHodnoty;
                    var array2 = nameOfTehcniques;
                    // remove same attributes to remove STITKY
                    for (var i = 0; i < array1.length; i++) {
                        if (array1[i] === array2) {
                            array1.splice(i, 1);
                        }
                    }
                    pridanaArray = array1;
                    db[stitkyStoreName].update(data[index2][idOfWordsStitky], {
                        [StitkyForShowing]: pridanaArray,
                    });
                }
            }
            if (typeof ifJump != 'undefined' && ifJump === 1) {
                getLabelContains(id);
            }
            return true;            
        });
}
// for adding stitky directly to words
function addSTITKYToWords(idOfWords = 'undefined', nameOfTehcniques) {
    // convering to string to be able to serch
    if (idOfWords !== 'undefined') {
        whereToSeacht = idOfWords.map(String);
        return db[sortStoreName]
            .where(IDIndexName)
            .anyOf(whereToSeacht)
            .toArray(function (data) {
                for (let index = 0; index < data.length; index++) {
                    if (
                        typeof data[index][StitkyForShowing] !== 'undefined' &&
                        data[index][StitkyForShowing].length > 0
                    ) {
                        var soucasneHodnoty = data[index][StitkyForShowing];
                        var pridanaArray = arrayUnique(
                            soucasneHodnoty.concat(nameOfTehcniques),
                        );
                        db[sortStoreName].update(data[index][IDIndexName], {
                            [StitkyForShowing]: pridanaArray,
                        });
                    } else {
                        var arrayOfTechiques = [];
                        arrayOfTechiques.push(nameOfTehcniques);
                        db[sortStoreName].update(data[index][IDIndexName], {
                            [StitkyForShowing]: arrayOfTechiques,
                        });
                    }
                }
            });
        // TODO call search result to show change STITKY
    }
}
// everytime new words are downloaded it appends stitky to it
function updateSlovickaWithStitky() {
    getUserID().then(function (UserId) {
        db[labesStoreName]
            .where(userIDIndexNameINLABELS)
            .equals(UserId)
            .toArray(function (data) {
                for (let i = 0, p = Promise.resolve(); i < data.length; i++) {
                    p = p.then(
                        _ =>
                        new Promise(resolve =>
                            setTimeout(function () {
                                addSTITKYToWords(
                                    data[i][containsIndexNameLABELS],
                                    data[i][nameIndexNameLABELS]
                                );
                                resolve();
                            }, Math.random() * 1000),
                        ),
                    );
                }
            });
    });
}
// adds current time to indexedDB for updating words once a day || BIZA
function addCurentTimetoDB() {
    dataAdd = {
        [IDIndexNameINMetadataLOCAL]: 0,
        [keyIndexNameMetadataLOCAL]: 'currenttime',
        [valueIndexNameMetadataLOCAL]: Date.now(),
    };
    db[metadataStoreNameLOCAL].put(dataAdd);
}
// for checking if words werent updated in a day || BIZA
function ifCurrentTimeBiggerThan() {
    return db[metadataStoreNameLOCAL].get(0).then(function (lastUpdated) {
        if (Date.now() - lastUpdated.value > 86400000) {
            return true;
        } else {
            return false;
        }
    });
}
// gets ammount of data in slovicka for checking if should update || BIZA
function getAmountOfDataInSLOVICKA() {
    return db[sortStoreName].count();
}