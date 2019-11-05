document.addEventListener('DOMContentLoaded', function() { // otevreni modalu || Duchoslav
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);      
  
});

$(document).ready(function(e) { // vyhledavani a zobrazovani
  $.ajax({ // zobrazi data pred napsanim vyhledavani
    type: 'GET',
    url: '../../PHP-request/search_fetch.php',
    data: 'q=',
    success: function(data) { //zobrazi data      
      $("#here").html(data);
    }
  });
  $("#search").keyup(function() {
    $("#here").show();
    var x = $(this).val();
    $.ajax({
      type: 'GET',
      url: '../../PHP-request/search_fetch.php',
      data: 'q=' + x,
      success: function(data) { //zobrazi data      
        $("#here").html(data); // po kliknuti se otevre modal a posle se ID
        $('.odkaz').click(function() { 
          var id = $(this).data('id');
          $.ajax({
            type: 'POST',
            url: '../../PHP-request/display_info.php',
            data: 'id=' + id,
            success: function(data) {
              $(".modal-content").html(data);
              $("#formular").submit(function(e) { // updatuje slovicko po submitu
                e.preventDefault();
                var japanese = $("#japanese").val();
                var czech = $("#czech").val();
                //var type = $("#type").val(); "&type=" + type+ 
                //var id2 = id;
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
  });
}); 