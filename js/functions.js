// function to check internet, tries to get justcheck.html element || BIZA
//if it can get it: internet
// if not: no internet
function isOnline(no,yes){ 
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
    xhr.onload = function(){
        if(yes instanceof Function){
            yes();
        }
    }
    xhr.onerror = function(){
        if(no instanceof Function){
            no();
        }
    }
    xhr.open("GET","justcheck.html",true);
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
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
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
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
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
    dottingSystem = "";
    for (let i = 0; i < dots; i++) {
        dottingSystem += "../";        
    } 
    var url = dottingSystem + "pages/justcheck.html"; 
    var result;
    var marek = $.ajax({
        type: 'GET',        
        url: url,
        timeout: 5000,
        success: function(){
            result = true;
            console.log("got");            
        },
        fail: function(){
            result = false;
            console.log('not');
        }
    }); 
    console.log(marek);
    if (result){
      return true;
    } else {
      return false;
    }
      
}
function getImagesToCahce() {
  $.ajax({
    type: "POST",            
    url: "phpRequests/imageLoader.php",
    data: "check",
    success: function(data) {    
        //console.log("it worked");
        console.log(data);
           
        }                 
                         
        
               
  }); 
}