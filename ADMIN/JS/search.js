document.addEventListener('DOMContentLoaded', function() {
    // otevreni modalu || Duchoslav
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

var page = 1;
$(document).ready(function(e) {
    $('#collapsibleTequniques').collapsible(); // collapsible for choosing what tequnisqe you want to search
    // for showing options in techniques types from metadata
    $.ajax({
        type: 'POST',
        url: '../../PHP-request/display_techniques_vybirani.php',
        data: 'checking=5',
        success: function(output) {
            $('#techniquesChooser').html(output);
        },
    });

    $('.pagination').on('click', '.pagination_page', function(e) {
        page = $(this).data('id');
        $('.pagination_page').removeClass('active');

        $('.pageba' + page).addClass('active');
        window.scrollTo(0, 0);
        search_words('not_change');
    });
    $('.pagination').on('click', '#move_left', function(e) {
        if (page > 1) {
            page--;
        } else {
            page = $(this).data('count');
        }

        $('.pagination_page').removeClass('active');

        $('.pageba' + page).addClass('active');
        search_words('not_change');
    });
    $('.pagination').on('click', '#move_right', function(e) {
        var ammountOfPages = $(this).data('count');
        if (page == ammountOfPages) {
            page = 1;
        } else {
            page++;
        }
        $('.pagination_page').removeClass('active');

        $('.pageba' + page).addClass('active');
        search_words('not_change');
    });

    // for checking all techniques / unchecking all techniques
    $(document).on('change', '#selectAllDiselectAllController', function() {
        if ($(this).is(':checked')) {
            $('.selectAllDiselectAll').prop('checked', true);
        } else {
            $('.selectAllDiselectAll').prop('checked', false);
        }
    });
    // when changing partucular Technique in selector
    $(document).on('change', '.selectAllDiselectAll', function() {
        if (!$(this).is(':checked')) {
            $('#selectAllDiselectAllController').prop('checked', false);
        } else if (
            $('.selectAllDiselectAll:checked').length ==
            $('.selectAllDiselectAll').length
        ) {
            $('#selectAllDiselectAllController').prop('checked', true);
        }
    });
    // whenewer Techniques / Words check box is Checked / Unchecked
    $(document).on('change', '.TechniquesWordsOnClick', function() {
        search_words();
    });
    $('#japan_czech').on('click', function(e) {
        // meni text v tlacitku || BIZA
        if ($('#japan_czech').text() == 'CZ') {
            $('#japan_czech').text('JP');
            search_words();
        } else {
            $('#japan_czech').text('CZ');
            search_words();
        }
    });
    $('#add_new_word').submit(function(e) {
        // pridani noveho slovicka bez zavreni modalu || Duchoslav
        e.preventDefault();
        var japanese = $('#japanese').val();
        var czech = $('#czech').val();
        console.log(japanese);
        console.log(czech);
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/add_new_action.php',
            data: 'japanese=' + japanese + '&czech=' + czech,
            success: function(data) {
                $('#japanese').val(''); // po uspesnem pridani vymaze input, aby nedoslo k dvojitemu pridani
                $('#czech').val('');
                search_words();
                alert(data);
            },
        });
    });
    /*
  $("#japanese").keyup(function() {
    //console.log(ukazovani_upravy_slovicek);
    var word_search = $('#japanese').val();
    console.log(word_search);
    //let vyhledane = ukazovani_upravy_slovicek.find(o => o.ID == id);
  });
  */
    $('#add-close').click(function(e) {
        //pridani noveho slovicka se zavrenim modalu || Duchoslav
        e.preventDefault();
        var japanese = $('#japanese').val();
        var czech = $('#czech').val();
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/add_new_action.php',
            data: 'japanese=' + japanese + '&czech=' + czech,
            success: function(data) {
                $('#modal2').modal('close');
                $('#japanese').val('');
                $('#czech').val('');
                search_words();
                alert(data);
            },
        });
    });

    $('.techniques').click(function() {
        // zobrazovani typu v technikach || Duchoslav
        var type = 'technique';
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/display_techniques_new.php',
            data: 'type=' + type,
            success: function(data) {
                $('.select-technique').html(data);
            },
        });
    });
    $('form#add_new_technique').submit(function(e) {
        // pridani nove techniky || Duchoslav
        e.preventDefault();
        console.log('a');
        var formData = new FormData(this);
        var japanese = $('#japanese-technique').val();
        var czech = $('#czech-technique').val();
        var description = $('#description').val();
        var type = $('.select-technique').val();

        formData.append('description', description);
        formData.append('type', type);
        /*
    for (var value of formData.values()) {
      console.log(value); 
    }
    */
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
            success: function(data) {
                alert(data);
            },
            cache: false,
            contentType: false,
            processData: false,
        });
    });
    $('.types').click(function() {
        // editace/mazani typu || Duchoslav
        var type = 'technique';
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/display_types.php',
            data: 'type=' + type,
            success: function(data) {
                $('#types-view').html(data);
                $('.submit-edit').click(function(e) {
                    // editace typu
                    e.preventDefault();
                    var edit_id = $(this).data('id');
                    var classa = '.type-edit-' + edit_id;
                    var value = $(classa).val();
                    $.ajax({
                        type: 'POST',
                        url: '../../PHP-request/edit_type_action.php',
                        data: 'value=' + value + '&id=' + edit_id,
                        success: function() {
                            alert('Upraveno');
                        },
                    });
                });
                $('.delete_type').click(function(e) {
                    // mazani typu || Duchoslav
                    e.preventDefault();
                    var del_id = $(this).data('id');
                    $.ajax({
                        type: 'POST',
                        url: '../../PHP-request/delete_type_action.php',
                        data: 'id=' + del_id,
                        success: function() {
                            get_metadata();
                            alert('Odstraneno');
                        },
                    });
                });
            },
        });
    });
    $('#add_new_type').submit(function(e) {
        // pridani noveho typu || Duchoslav
        e.preventDefault();
        var type = $('#type').val();
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/add_new_type.php',
            data: 'type=' + type,
            success: function(data) {
                $('#type').val(''); // po uspesnem pridani vymaze input, aby nedoslo k dvojitemu pridani
                get_metadata();
                alert(data);
            },
        });
    });
    // vyhledavani a zobrazovani || Duchoslav
    search_words();
    // ziska metadata
    var metadataStoreSHIT = {};
    get_metadata();
    $('#search').keyup(function() {
        // kod pro vyhledavani || Duchoslav
        search_words();
    });
});
function search_words(genreate_new = 'new') {
    // what techniques and words to show
    // for checking if element is set allready -> if not show all
    if ($('.selectAllDiselectAll').length == 0) {
        var showAllThing = true;
    } else {
        var showAllThing = false;
    }
    //console.log(showAllThing);
    var techniquesCheckedAtributes = $('.selectAllDiselectAll:checked')
        .map(function() {
            return $(this).data('searchvalue');
        })
        .get();
    // with both
    var slovickaChecked = $('#TechniquesWordsOnClickSlovicka').is(':checked');
    var techniquesChecked = $('#TechniquesWordsOnClickTechniky').is(':checked');
    $('#here').show();
    var x = $('#search').val();
    if ($('#japan_czech').text() == 'CZ') {
        var searchIn = 'czech';
    } else {
        var searchIn = 'japanese';
    } // what to search in if in Japanese of Czechif ($('#japan_czech').text() == 'CZ') { var searchIn = czechIndexName; } else { var searchIn = japanIndexName; } // what to search in if in Japanese of Czech
    $.ajax({
        type: 'POST',
        url: '../../PHP-request/search_fetch.php',
        data:
            'q=' +
            x +
            '&language=' +
            searchIn +
            '&ifwannaWords=' +
            slovickaChecked +
            '&ifwannaTechniques=' +
            techniquesChecked +
            '&allTechniquesChecked=' +
            techniquesCheckedAtributes +
            '&showAllThing=' +
            showAllThing +
            '&pagination=' +
            page +
            '&new=' +
            genreate_new,
        success: function(data) {
            //zobrazi data
            //JSON kod

            data = data.split('||&^*&%^^*(%*&^&&*(&(*&((*@*');
            var ukazovani_upravy_slovicek = JSON.parse(data[1]);
            document.getElementById('here').innerHTML = data[0];
            if (genreate_new == 'new') {
                $('.pagination').html(data[2]);
            }

            //$("#here").html(data[0]);
            function search_word_JSON() {
                $('#japanese').keyup(function() {
                    // vyhledani slovicka pres JSON pri zadavani, pokud uz v JSONu je, da mu moznost upravit toto slovicko
                    var word_search = $('#japanese').val();
                    console.log(word_search);
                    let vyhledane_word = ukazovani_upravy_slovicek.find(
                        o => o.japanese == word_search,
                    );
                    var vyhledane_word_str = vyhledane_word + '';
                    if (vyhledane_word_str == 'undefined') {
                        $('#edit-pridavani').css('display', 'none');
                    } else {
                        var id_add_edit = vyhledane_word['ID'];
                        $('#edit-pridavani').attr('data-id', id_add_edit);
                        $('#edit-pridavani').css('display', 'block');
                    }
                });
            }
            search_word_JSON();
            $('.slovicka').click(function(e) {
                // po kliknuti na pridani slovicka se vymaze input a tlacitko zmizi
                e.preventDefault();
                $('#edit-pridavani').css('display', 'none');
                $('#japanese').val('');
                $('#czech').val('');
            });
            $('.zkouska').click(function(e) {
                // po kliknuti na "editovat slovicku uz zde je" se vymaze input a tlacitko zmizi puvodni modal
                e.preventDefault();
                $('#modal2').modal('close');
                $('#japanese').val('');
                $('#czech').val('');
            });
            $('.delete').click(function() {
                var id = $(this).data('id');
                $('.delete-word').click(function(e) {
                    // smaze slovicko po kliknuti
                    e.preventDefault();
                    $.ajax({
                        type: 'POST',
                        url: '../../PHP-request/delete_word_action.php',
                        data: 'id=' + id,
                        success: function(data) {
                            alert(data);
                            window.location = 'search.php';
                            search_words();
                        },
                    });
                });
            });
            $('.odkaz').click(function() {
                // po kliknuti se otevre modal a zobrazi se data
                var id = $(this).data('id');
                //let vyhledane = ukazovani_upravy_slovicek.find(o => o.ID == id);
                //kontrola jestli je to slovicko nebo technika
                function zobrazeni_JSON() {
                    let vyhledane = ukazovani_upravy_slovicek.find(
                        o => o.ID == id,
                    );
                    console.log(vyhledane);
                    if (vyhledane['type'] == 'word') {
                        var inputs = '';
                        inputs +=
                            "<form action='nvm.php' method='POST' id='formular'>";
                        inputs +=
                            "<input type='text' name='japanese' id='japanese' value='" +
                            vyhledane['japanese'] +
                            "'>";
                        inputs +=
                            "<p class='zkouska' id='edit-pridavani' data-id='' style='display: none;'>Slovíčko už existuje, nelze ho přidat/upravit</p>";
                        inputs +=
                            "<input type='text' name='czech' id='czech' value='" +
                            vyhledane['czech'] +
                            "'>";
                        inputs +=
                            "<select name='type' id='type'><option value='slovo'>Slovo</option><option value='slovo2'>Slovo2</option></select>";
                        inputs +=
                            "<input type='submit' name='submit' id='submit'>";
                        inputs += '</form>';
                        inputs += "<button id='delete'>Delete</button>";
                    } else {
                        //console.log(metadataStoreSHIT);
                        var inputs = '';
                        inputs +=
                            "<form action='nvm.php' method='POST' id='formular'>";
                        inputs +=
                            "<input type='text' name='japanese' id='japanese' value='" +
                            vyhledane['japanese'] +
                            "'>";
                        inputs +=
                            "<input type='text' name='czech' id='czech' value='" +
                            vyhledane['czech'] +
                            "'>";
                        inputs +=
                            "<textarea name='description' placeholder='Desription' id='description'>" +
                            vyhledane['content'] +
                            '</textarea>';
                        inputs +=
                            "<img src='../../img/" +
                            vyhledane['imageUrl'] +
                            "' alt='" +
                            vyhledane['content'] +
                            "' height='42' id='image_nahled'>";
                        inputs +=
                            "<input type='file' name='picture' id='image'>";
                        inputs +=
                            "<a href='' id='delete_image'>smazat obrázek</a>";
                        inputs +=
                            "<select class='select-techniques' style='display: block;'>";
                        var options = metadataStoreSHIT;
                        options.forEach(myFunction);
                        function myFunction(item) {
                            if (vyhledane['type'] == item['value']) {
                                inputs +=
                                    "<option value='" +
                                    item['value'] +
                                    "' selected>" +
                                    item['value'] +
                                    '</option>';
                            } else {
                                inputs +=
                                    "<option value='" +
                                    item['value'] +
                                    "'>" +
                                    item['value'] +
                                    '</option>';
                            }
                        }
                        inputs += '</select>';
                        inputs +=
                            "<input type='submit' name='submit' id='submit-update'>";
                        inputs += '</form>';
                        inputs += "<button id='delete'>Delete</button>";
                    }
                    $('.edit-slova').html(inputs);
                }
                zobrazeni_JSON();
                search_word_JSON();
                $('#delete_image').click(function(e) {
                    // smaze obrazek po kliknuti
                    e.preventDefault();
                    console.log('deleteimgaaaa');
                    $.ajax({
                        type: 'POST',
                        url: '../../PHP-request/delete_image.php',
                        data: 'id=' + id,
                        success: function(data) {
                            search_words();
                            zobrazeni_JSON();
                            alert(data);
                        },
                    });
                });
                function readURL(input) {
                    // funkce pro zobrazeni nahledu obrazku pote co nejaky zvoli || Duchoslav
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            $('#image_nahled').attr('src', e.target.result);
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                }
                $('#image').change(function() {
                    // funkce se spusti jen, kdyz se neco zmeni
                    readURL(this);
                });

                $('form#formular').on('submit', '', function(e) {
                    // editace techniky/slovicka || Duchoslav
                    e.preventDefault();
                    console.log('submitaaaa');
                    var formData = new FormData(this);

                    var description = $('#description').val();
                    var type = $('.select-techniques').val();

                    formData.append('type', type);
                    formData.append('id', id);
                    $.ajax({
                        url: '../../PHP-request/edit_technique_action.php',
                        type: 'POST',
                        data: formData,
                        success: function(data) {
                            search_words();
                            $('#modal1').modal('close');
                            alert(data);
                        },
                        cache: false,
                        contentType: false,
                        processData: false,
                    });
                });

                $('#delete').click(function(e) {
                    // smaze slovicko po kliknuti
                    e.preventDefault();
                    $.ajax({
                        type: 'POST',
                        url: '../../PHP-request/delete_word_action.php',
                        data: 'id=' + id,
                        success: function(data) {
                            search_words();
                            $('#modal1').modal('close');
                            alert(data);
                        },
                    });
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
// funkce pro vyhledani typu technik v DB
function get_metadata() {
    var type = 'technique';
    $.ajax({
        type: 'POST',
        url: '../../PHP-request/display_techniques.php',
        data: 'type=' + type,
        success: function(data) {
            data = JSON.parse(data);
            metadataStoreSHIT = data;
            console.log(metadataStoreSHIT);
        },
    });
}
