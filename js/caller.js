$(document).ready(function(){ // when document is ready and is online: tries to get data || BIZA
    if (navigator.onLine) { 
      console.log('interssset');
      dbGetSlovicka();             
      getSearchResult();
      getImagesToCahce(); //for caching images
    } else {
      console.log('internet not');
      getSearchResult();
    }
    $('#collapsibleTequniques').collapsible(); // collapsible for choosing what tequnisqe you want to search
    getTechniquesToSearch(); // for filling Techniques in collapsible
    // for checking all techniques / unchecking all techniques
    $(document).on('change', '#selectAllDiselectAllController', function() {
      if($(this).is(':checked')) {
        $( ".selectAllDiselectAll" ).prop( "checked", true );
      } else {
        $( ".selectAllDiselectAll" ).prop( "checked", false );
      }
    })
    // when changing partucular Technique in selector
    $(document).on('change', '.selectAllDiselectAll', function() {
      if(!$(this).is(':checked')) {
        $( "#selectAllDiselectAllController" ).prop( "checked", false );
      }
      else if($('.selectAllDiselectAll:checked').length == $('.selectAllDiselectAll').length) {
        $( "#selectAllDiselectAllController" ).prop( "checked", true );
      }
    })    
    // whenewer Techniques / Words check box is Checked / Unchecked 
    $(document).on('change', '.TechniquesWordsOnClick', function() {
      getSearchResult(); 
    })   
    // when choosing if search in Czech or Japanese  
    $('#japan_czech').on('click', function(e) {  
      if($('#japan_czech').text() == 'CZ') {$('#japan_czech').text('JP');} else {$('#japan_czech').text('CZ');}    // changing if search in Japanese or in Czech 
      getSearchResult();                  
    });
     // if inputs pastes or does anything else with searchBar it calls search function   
      $('#nazev').on('input propertychange paste', function(e) {
        getSearchResult();                  
    });
  });