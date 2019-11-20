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
      db[sortStoreName].bulkPut(data).then(function(lastKey) {});
      // AJAX for getting metadata
      $.ajax({
        type: "POST",
        url: "phpRequests/getMetadata.php",
        data: "check",
        success: function(data) {
          data = JSON.parse(data);
          //console.log(data);
          db[metadataStoreName].clear();
          db[metadataStoreName].bulkPut(data).then(function(lastKey) {});
          // calling it here to load after loading new resources
          getSearchResult();
          // to show techniques collapisble onLoad
          getTechniquesToSearch();
        }
      });
    }
  });
}
// getting search result (supposed to be smart) || BIZA
function getSearchResult() {
  // searching in czech or japanese and changing the value
  if ($("#japan_czech").text() == "CZ") {
    var searchIn = czechIndexName;
  } else {
    var searchIn = japanIndexName;
  } // what to search in if in Japanese of Czech
  // search value
  var searchValue = $("#nazev").val();
  //if search in Words / Techniques (and what techniques)
  // techniques selected altributes
  var techniquesCheckedAtributes = $(".selectAllDiselectAll:checked")
    .map(function() {
      return $(this).data("searchvalue");
    })
    .get();
  // with both
  var slovickaChecked = $("#TechniquesWordsOnClickSlovicka").is(":checked");
  var techniquesChecked = $("#TechniquesWordsOnClickTechniky").is(":checked");
  if (slovickaChecked && techniquesChecked) {
    // smart searchs
    db[sortStoreName]
      .where(searchIn)
      .startsWithIgnoreCase(searchValue)
      .and(function(data) {
        if (data[typeIndexName] == "word") {
          return true;
        } else if (techniquesCheckedAtributes.includes(data[typeIndexName])) {
          return true;
        }
      })
      .toArray(function(data) {
        showSearchResult(data);
      });
  } else if (slovickaChecked) {
    // with only Word selected
    // smart searchs
    db[sortStoreName]
      .where(searchIn)
      .startsWithIgnoreCase(searchValue)
      .and(function(data) {
        return data[typeIndexName] == "word";
      })
      .toArray(function(data) {
        showSearchResult(data);
      });
  } else if (techniquesChecked) {
    // with only Technques checked
    // smart searchs
    db[sortStoreName]
      .where(searchIn)
      .startsWithIgnoreCase(searchValue)
      .and(function(data) {
        return techniquesCheckedAtributes.includes(data[typeIndexName]);
      })
      .toArray(function(data) {
        showSearchResult(data);
      });
  } else {
    showSearchResult("");
  }

  //console.log("3");
  //console.log(returnData);
  //showSearchResult(returnData);
}
function getTechniquesToSearch() {
  //for searching metadata for Type of Techniques || BIZA

  db[metadataStoreName]
    .where(keyIndexNameMetadata)
    .equals("technique")
    .toArray(function(data) {
      showTechniquesToSearch(data);
    });
}
function getSimilarWords(search) {
  //for searching metadata for Type of Techniques || BIZA

  db[sortStoreName]
    .where(japanIndexName)
    .anyOf(search)
    .toArray(function(data) {
      showSimilarWords(data);
    });
}
function getSimilarTechniques(search) {
  //for searching metadata for Type of Techniques || BIZA

  db[sortStoreName]
    .where(typeIndexName)
    .notEqual("word")
    .and(function(data) {
      var splitTechnique = data[japanIndexName].split(" ");
      if (splitTechnique.includes(search)) {
        return true;
      }
    })
    .toArray(function(data) {
      showSimilarWords(data);
    });
}
function checkIfUserExists() {
  // check if user is logged in in IndexedDB || BIZA
  db[metadataStoreName]
    .where(keyIndexNameMetadata)
    .equals("userLogin")
    .and(function(data) {
      return data[valueIndexNameMetadata] !== "";
    })
    .toArray(function(data) {
      if (typeof data == "undefined" || data.length == 0) {
        $(".showUserLogOff").html("");
      } else {
        $(".showUserLogOff").html(
          '<a href="#" onclick="signOut();">Sign out</a>'
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
    .toArray(function(data) {
      if (typeof data !== "undefined" && data.length > 0) {
        return true;
      } else {
        return false;
      }
    });
}
// sign in with google and ads to indexedDB || BIZA
function onSignIn(googleUser) {
  // when user signs in with google
  var profile = googleUser.getBasicProfile();
  //console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //console.log("Name: " + profile.getName());
  //console.log("Image URL: " + profile.getImageUrl());
  //console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

  var email = profile.getEmail();
  var name = profile.getName();
  var obrazek = profile.getImageUrl();

  //console.log(email + name + obrazek);
  // some gogle token: lUXaq54DFbrWWax4Fm4KYLEa
  $.ajax({
    type: "POST",
    url: "phpRequests/loginRegister.php",
    data: "email=" + email + "&name=" + name + "&obrazek=" + obrazek,
    success: function(data) {
      data = jQuery.parseJSON(data);
      //console.log(data);
      dataAdd = {
        [IDIndexNameINMetadata]: 0,
        [keyIndexNameMetadata]: "userLogin",
        [valueIndexNameMetadata]: data
      };
      db[metadataStoreName].put(dataAdd);
      $(".showUserLogOff").html(
        '<a href="#" onclick="signOut();">Sign out</a>'
      );
    }
  });
}
// signs out from google and deletes from IndexedDB || BIZA
function signOut() {
  // when user signs out wiht google
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    db[metadataStoreName]
      .where(IDIndexNameINMetadata)
      .equals(0)
      .delete();
  });
  $(".showUserLogOff").html("");
}
// checks if stitek is allready in db || BIZA
function checkIfStitekIsInDB(value) {
  return getUserID().then(function(UserId) {
    return db[labesStoreName]
    .where(nameIndexNameLABELS)
    .equals(value)
    .and(function(data) {
      return data[userIDIndexNameINLABELS] === UserId;
    })
    .toArray(function(data) {
      if (typeof data !== "undefined" && data.length > 0) {
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
    .toArray(function(data) {
      if (typeof data !== "undefined" && data.length > 0) {
        return data[0]['value'];
      } else {
        return false;
      }
    });
}
// function check if stitek ammount is above or below limit || BIZA
function checkStitkyAmmount() {
  return getUserID().then(function(UserId) {
    return db[labesStoreName]
    .where(userIDIndexNameINLABELS)
    .equals(UserId)
    .toArray(function(data) {
      if (typeof data !== "undefined" && data.length > 0) {
        return data.length;
      } else {        
        return 0;
      }
    });
  });
}
// adds stitek to db || BIZA
function addStitektoDb(nazevStitku) {
  getUserID().then(function(userID) {
    dataAdd = {
      [userIDIndexNameINLABELS]: userID,
      [nameIndexNameLABELS]: nazevStitku
    };
    db[labesStoreName].put(dataAdd);
  });  
}
// function to get all STITKY Names || BIZA
function getModalStitkyController() {
  getUserID().then(function(UserId) {
    db[labesStoreName]
    .where(userIDIndexNameINLABELS)
    .equals(UserId)
    .toArray(function(data) {
      if (typeof data !== "undefined" && data.length > 0) {
        showModalStitkyController(data);
      }
    });
  });
}
// to label words with STITEk || BIZA
function addLabelsToWords(id, idOfWords, nameOfTehcniques) {
  db[labesStoreName]
  .where(IDIndexNameINLABELS)
  .equals(id)
  .toArray(function(data) {
    if (typeof data[0][containsIndexNameLABELS] !== "undefined" && data[0][containsIndexNameLABELS].length > 0) {
      var soucasneHodnoty = data[0][containsIndexNameLABELS];
      var pridanaArray = arrayUnique(soucasneHodnoty.concat(idOfWords));
      db[labesStoreName].update(id, {[containsIndexNameLABELS]: pridanaArray});
    } else {        
      db[labesStoreName].update(id, {[containsIndexNameLABELS]: idOfWords});
    }
    // TODO call search result to show change STITKY
  }).then(function() {// this thing is for faster displaying 
    // this is because ID are taken as string so i have to convert to it
    var whereToSeacht = '';
    for (let index = 0; index < idOfWords.length; index++) {
      whereToSeacht += '"'+idOfWords[index]+'",'
    }
    whereToSeacht = whereToSeacht.slice(0, -1);
    console.log(whereToSeacht);
    db[sortStoreName]
    .where(IDIndexName)
    .anyOfIgnoreCase(whereToSeacht)
    .toArray(function(data) {
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        if (typeof data[index][StitkyForShowing] !== "undefined" && data[index][StitkyForShowing].length > 0) {
          var soucasneHodnoty = data[index][StitkyForShowing];
          var pridanaArray = arrayUnique(soucasneHodnoty.concat(nameOfTehcniques));
          db[sortStoreName].update(data[index][IDIndexName], {[StitkyForShowing]: pridanaArray});
        } else {        
          db[sortStoreName].update(data[index][IDIndexName], {[StitkyForShowing]: nameOfTehcniques});
        }
      }
    })
    
  });
}
// to remove label words from STITEk || BIZA
function removeLabelFromWord(id, idOfWords) {
  db[labesStoreName]
  .where(IDIndexNameINLABELS)
  .equals(id)
  .toArray(function(data) {
    if (typeof data[0][containsIndexNameLABELS] !== "undefined" && data[0][containsIndexNameLABELS].length > 0) {
      var soucasneHodnoty = data[0][containsIndexNameLABELS];
      var array1 = soucasneHodnoty;
      var array2 = idOfWords;
      var index;
      // remove same attributes to remove STITKY
      for (var i=0; i<array2.length; i++) {
        index = array1.indexOf(array2[i]);
        if (index > -1) {
            array1.splice(index, 1);
        }
      }
      pridanaArray = array1;
      db[labesStoreName].update(id, {[containsIndexNameLABELS]: pridanaArray});
    } else {        
      db[labesStoreName].update(id, {[containsIndexNameLABELS]: idOfWords});
    }
    // TODO call search result to show change STITKY
  });
}
