$(document).ready(function(){ // when document is redy and is online: tries to get data || BIZA
    isOnline(
        function() {
            console.log('internet not');
            alert("internet not");
            
        },
        function() {
            console.log('intersset');
            dbGetSlovicka(); 
            //showSearchResult();
            getSearchResult();             
        }
      );
      jQuery('#nazev').on('input propertychange paste', function(e) {
        getSearchResult();     
    });
  });