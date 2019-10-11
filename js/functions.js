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