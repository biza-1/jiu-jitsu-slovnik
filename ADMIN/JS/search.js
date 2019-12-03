document.addEventListener('DOMContentLoaded', function() { // otevreni modalu || Duchoslav
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

$(document).ready(function(e) { 
  $("#collapsibleTequniques").collapsible(); // collapsible for choosing what tequnisqe you want to search
  // for showing options in techniques types from metadata
  $.ajax({
    type: "POST",
    url: "../../PHP-request/display_techniques_vybirani.php",
    data: "checking=5",
    success: function(output) {
      $('#techniquesChooser').html(output);
    }
  });
  
  // for checking all techniques / unchecking all techniques
  $(document).on("change", "#selectAllDiselectAllController", function() {
    if ($(this).is(":checked")) {
      $(".selectAllDiselectAll").prop("checked", true);
    } else {
      $(".selectAllDiselectAll").prop("checked", false);
    }
  });
  // when changing partucular Technique in selector
  $(document).on("change", ".selectAllDiselectAll", function() {
    if (!$(this).is(":checked")) {
      $("#selectAllDiselectAllController").prop("checked", false);
    } else if ($(".selectAllDiselectAll:checked").length == $(".selectAllDiselectAll").length) {
      $("#selectAllDiselectAllController").prop("checked", true);
    }
  });
  // whenewer Techniques / Words check box is Checked / Unchecked
  $(document).on("change", ".TechniquesWordsOnClick", function() {
    search_words();
  });
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

  $('.techniques').click(function() { // zobrazovani typu v technikach || Duchoslav
    var type = "technique";
    $.ajax({
      type: 'POST',
      url: '../../PHP-request/display_techniques.php',
      data: 'type=' + type,
      success: function(data) {
        $('.select-technique').html(data);
      }
    });
  });
  $("form#add_new_technique").submit(function(e) { // pridani nove techniky || Duchoslav
    e.preventDefault();
    var formData = new FormData(this);
    var japanese = $("#japanese-technique").val();
    var czech = $("#czech-technique").val();
    var description = $('#description').val(); 
    var type = $(".select-technique").val();

    formData.append("description", description);
    formData.append("type", type);
    for (var value of formData.values()) {
      console.log(value); 
    }
    
    //console.log($(".select-technique").val());
    /*$.ajax({
      type: "POST",
      url: "../../PHP-request/add_new_technique_action.php",
      data: "japanese=" + japanese+ "&czech=" + czech+ "&description=" + description+ "&type=" + typeformData,
      success: function(data) {
        $('#japanese-technique').val(""); // po uspesnem pridani vymaze input, aby nedoslo k dvojitemu pridani
        $('#czech-technique').val("");
        $('#description').val(""); 
        alert(data);
      }
    });*/
    $.ajax({
      url: '../../PHP-request/add_new_technique_action.php',
      type: 'POST',
      data: formData,
      success: function (data) {
          alert(data)
      },
      cache: false,
      contentType: false,
      processData: false
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
  // what techniques and words to show
  // for checking if element is set allready -> if not show all
  if ($(".selectAllDiselectAll").length == 0) {
    var showAllThing = true;
  } else {
    var showAllThing = false;
  }
  //console.log(showAllThing);
  var techniquesCheckedAtributes = $(".selectAllDiselectAll:checked")
    .map(function() {
      return $(this).data("searchvalue");
    })
    .get();
  // with both
  var slovickaChecked = $("#TechniquesWordsOnClickSlovicka").is(":checked");
  var techniquesChecked = $("#TechniquesWordsOnClickTechniky").is(":checked");
  $("#here").show();
    var x = $('#search').val();
    if ($('#japan_czech').text() == 'CZ') { var searchIn = "czech"; } else { var searchIn = "japanese"; } // what to search in if in Japanese of Czechif ($('#japan_czech').text() == 'CZ') { var searchIn = czechIndexName; } else { var searchIn = japanIndexName; } // what to search in if in Japanese of Czech
    $.ajax({
      type: 'POST',
      url: '../../PHP-request/search_fetch.php',
      data: 'q=' + x+'&language='+searchIn+'&ifwannaWords='+slovickaChecked+'&ifwannaTechniques='+techniquesChecked+'&allTechniquesChecked='+techniquesCheckedAtributes+'&showAllThing='+showAllThing,
      success: function(data) { //zobrazi data
        data = data.split("||&^*&%^^*(%*&^&&*(&(*&((*@*");
        
        var ukazovani_upravy_slovicek = JSON.parse(data[1]);
        console.log(ukazovani_upravy_slovicek);
        //console.log(ukazovani_upravy_slovicek);
        document.getElementById("here").innerHTML = data[0];
        //$("#here").html(data[0]); // po kliknuti se otevre modal a posle se ID
        $('.delete').click(function() { 
          var id = $(this).data('id');
          $(".delete-word").click(function(e) { // smaze slovicko po kliknuti
            e.preventDefault();
            $.ajax({
              type: "POST",
              url: "../../PHP-request/delete_word_action.php",
              data: "id=" + id,
              success: function(data) {
                alert(data);
                window.location = 'search.php';
                search_words();
              }
            });
          });
        });
        $('.odkaz').click(function() { 
          var id = $(this).data('id');
          let vyhledane = ukazovani_upravy_slovicek.find(o => o.ID == id);
          console.log(vyhledane);
          if (vyhledane['type'] == "word") {
            console.log("ahoj");
            var inputs = "<a href=''>ahojj</a>";
            inputs += "<form action='nvm.php' method='POST' id='formular' value='"+vyhledane['japanese']+"'>";
            inputs += "<input type='text' name='japanese' id='japanese'>";
            inputs += "<input type='text' name='czech' id='czech'>";
            inputs += "<select name='type' id='type'><option value='slovo'>Slovo</option><option value='slovo2'>Slovo2</option></select>";
            inputs += "<input type='submit' name='submit' id='submit'>";
            inputs += "</form>";
            inputs += "<button id='delete'>Delete</button>";
          } else {
            console.log("ahojjj");
            var inputs = "<a href=''>ahojjj</a>";
          }
          
          $.ajax({
            type: 'POST',
            url: '../../PHP-request/display_info.php',
            data: 'id=' + id,
            success: function(data) {
              //$(".edit-slova").html(data);
              $(".edit-slova").html(inputs);
              //$("#japanese").val(vyhledane['japanese']);
              $("#czech").val(vyhledane['czech']);
              $("#delete_image").click(function(e) { // smaze obrazek po kliknuti
                e.preventDefault();
                
                $.ajax({
                  type: "POST",
                  url: "../../PHP-request/delete_image.php",
                  data: "id=" + id,
                  success: function(data) {
                    //search_words();
                    alert(data);
                    //window.location = 'search.php';
                  }
                });
              });
              //edit_word_technique(id);
              
              $("form#formular").submit(function(e) { // editace techniky/slovicka || Duchoslav
                e.preventDefault();
                var formData = new FormData(this);
               
                var description = $('#description').val(); 
                var type = $(".select-techniques").val();
               
                formData.append("type", type);
                formData.append("id", id);
               
                $.ajax({
                  url: '../../PHP-request/edit_technique_action.php',
                  type: 'POST',
                  data: formData,
                  success: function (data) {
                      search_words();
                      alert(data);
                  },
                  cache: false,
                  contentType: false,
                  processData: false
                });
              });
              
              // STARY KOD JEN PRO UPDATE SLOVICKA
              /*
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
              */
              $("#delete").click(function(e) { // smaze slovicko po kliknuti
                e.preventDefault();
                $.ajax({
                  type: "POST",
                  url: "../../PHP-request/delete_word_action.php",
                  data: "id=" + id,
                  success: function(data) {
                    search_words();
                    alert(data);
                    window.location = 'search.php';
                  }
                });
              });
            }
          });
        });
      },
    });
}
/*
$("body").on("submit","#formular", function(e) {
    e.preventDefault();
    //get_id(id);
    var formData = new FormData(this);
   
    var description = $('#description').val(); 
    var type = $(".select-techniques").val();
   
    formData.append("type", type);
    formData.append("id", id);
   
    $.ajax({
      url: '../../PHP-request/edit_technique_action.php',
      type: 'POST',
      data: formData,
      success: function (data) {
          search_words();
          alert(data);
      },
      cache: false,
      contentType: false,
      processData: false
    });
    
  }); 
*/

   
