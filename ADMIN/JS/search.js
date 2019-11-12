document.addEventListener('DOMContentLoaded', function() { // otevreni modalu || Duchoslav
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

$(document).ready(function(e) { 
  $("#japan_czech").on("click", function(e) { // meni text v tlacitku || BIZA
    if ($("#japan_czech").text() == "CZ") {
      $("#japan_czech").text("JP");
      search_words();
    } else {
      $("#japan_czech").text("CZ");
      search_words();
    } 
    //search_words();
  });
  $("#add_new_word").submit(function(e) { // pridani noveho slovicka || Duchoslav
    e.preventDefault();
    var japanese = $("#japanese").val();
    var czech = $("#czech").val();    
    $.ajax({
      type: "POST",
      url: "../../PHP-request/add_new_action.php",
      data: "japanese=" + japanese+ "&czech=" + czech,
      success: function(data) {
        $('#japanese').val(""); // po uspesnem pridani vymaze input, aby nedoslo k dvojitemu pridani
        $('#czech').val("");
        alert(data);
      }
    });
  });
  $('.types').click(function() { // editace/mazani typu || Duchoslav
    var type = "technique";
    $.ajax({
      type: 'POST',
      url: '../../PHP-request/display_types.php',
      data: 'type=' + type,
      success: function(data) {
        $('#types-view').html(data);
        $(".submit-edit").click(function(e) { // editace typu
          e.preventDefault();
          var edit_id = $(this).data('id');
          var classa = ".type-edit-"+edit_id;
          var value = $(classa).val();
          $.ajax({
            type: "POST",
            url: "../../PHP-request/edit_type_action.php",
            data: "value=" + value+ "&id=" + edit_id,
            success: function() {
              alert("Upraveno");
            }
          });
        });
        $(".delete_type").click(function(e) { // mazani typu || Duchoslav
          e.preventDefault();
          var del_id = $(this).data('id');
          $.ajax({
            type: "POST",
            url: "../../PHP-request/delete_type_action.php",
            data: "id=" + del_id,
            success: function() {
              alert("Odstraneno");              
            }
          });
        });
      }
    });
  });
  $("#add_new_type").submit(function(e) { // pridani noveho typu || Duchoslav
    e.preventDefault();
    var type = $("#type").val();
    $.ajax({
      type: "POST",
      url: "../../PHP-request/add_new_type.php",
      data: "type=" + type,
      success: function(data) {
        $('#type').val(""); // po uspesnem pridani vymaze input, aby nedoslo k dvojitemu pridani
        alert(data);
      }
    });
  });
  // vyhledavani a zobrazovani || Duchoslav
  search_words();
  $("#search").keyup(function() { // kod pro vyhledavani || Duchoslav 
    search_words();
  });
}); 
function search_words() {
  $("#here").show();
    var x = $('#search').val();
    if ($('#japan_czech').text() == 'CZ') { var searchIn = "czech"; } else { var searchIn = "japanese"; } // what to search in if in Japanese of Czechif ($('#japan_czech').text() == 'CZ') { var searchIn = czechIndexName; } else { var searchIn = japanIndexName; } // what to search in if in Japanese of Czech
    console.log(searchIn);
    $.ajax({
      type: 'GET',
      url: '../../PHP-request/search_fetch.php',
      data: 'q=' + x+'&language='+searchIn,
      success: function(data) { //zobrazi data      
        $("#here").html(data); // po kliknuti se otevre modal a posle se ID
        $('.odkaz').click(function() { 
          var id = $(this).data('id');
          $.ajax({
            type: 'POST',
            url: '../../PHP-request/display_info.php',
            data: 'id=' + id,
            success: function(data) {
              $(".edit-slova").html(data);
              $("#formular").submit(function(e) { // updatuje slovicko po submitu
                e.preventDefault();
                var japanese = $("#japanese").val();
                var czech = $("#czech").val();
                $.ajax({
                  type: "POST",
                  url: "../../PHP-request/edit_word_action.php",
                  data: "japanese=" + japanese+ "&czech=" + czech+ "&id=" + id,
                  success: function() {
                    alert("Upraveno");
                  }
                });
              });
              $("#delete").click(function(e) { // smaze slovicko po kliknuti
                e.preventDefault();
                $.ajax({
                  type: "POST",
                  url: "../../PHP-request/delete_word_action.php",
                  data: "id=" + id,
                  success: function() {
                    alert("Odstraneno");
                    //window.location = 'search.php';
                  }
                });
              });
            }
          });
        });
      },
    });
}