document.addEventListener('DOMContentLoaded', function () {
    // otevreni modalu || Duchoslav
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});
var page = 1;
$(document).ready(function (e) {
    function readURL(input) {
        // funkce pro zobrazeni nahledu obrazku pote co nejaky zvoli || Duchoslav
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#image_nahled').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    showTypesTechniques();

    $('.pagination').on('click', '.pagination_page', function (e) {
        page = $(this).data('id');
        $('.pagination_page').removeClass('active');

        $('.pageba' + page).addClass('active');
        window.scrollTo(0, 0);
        search_words('not_change');
        smallerpagination();
    });
    $('.pagination').on('click', '#move_left', function (e) {
        if (page > 1) {
            page--;
        } else {
            page = $(this).data('count');
        }

        $('.pagination_page').removeClass('active');

        $('.pageba' + page).addClass('active');
        search_words('not_change');
        smallerpagination();
    });
    $('.pagination').on('click', '#move_right', function (e) {
        var ammountOfPages = $(this).data('count');
        if (page == ammountOfPages) {
            page = 1;
        } else {
            page++;
        }
        $('.pagination_page').removeClass('active');

        $('.pageba' + page).addClass('active');
        search_words('not_change');
        smallerpagination();
    });
    // for checking all techniques / unchecking all techniques
    $(document).on('change', '#selectAllDiselectAllController', function () {
        if ($(this).is(':checked')) {
            $('.selectAllDiselectAll').prop('checked', true);
        } else {
            $('.selectAllDiselectAll').prop('checked', false);
        }
    });
    // when changing partucular Technique in selector
    $(document).on('change', '.selectAllDiselectAll', function () {
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
    $(document).on('change', '.TechniquesWordsOnClick', function () {
        search_words();
    });
    $('#japan_czech').on('click', function (e) {
        // meni text v tlacitku || BIZA
        if ($('#japan_czech').text() == 'CZ') {
            $('#japan_czech').text('JP');
            search_words();
        } else {
            $('#japan_czech').text('CZ');
            search_words();
        }
    });
    $('#add_new_word').submit(function (e) {
        // pridani noveho slovicka bez zavreni modalu || Duchoslav
        $('.edit-slova').html(''); // pro vycisteni editovaciho modaly > jsou duplicitni #ID
        e.preventDefault();
        var japanese = $('#japanese').val();
        var czech = $('#czech').val();
        var description = $('#description1').val();
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/add_new_action.php',
            data: 'japanese=' + japanese + '&czech=' + czech + '&description=' + description,
            success: function (data) {
                $('#japanese').val(''); // po uspesnem pridani vymaze input, aby nedoslo k dvojitemu pridani
                $('#czech').val('');
                $('#description1').val("");
                search_words();
                modalInfo(data);
                //alert(data);
            }
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
    $("body").on("click", "#clear-input", function (e) {
        //$('#clear_input').on('click', function () {
        $('#search').val("");
        search_words();
    })
    $('#add-close').click(function (e) {
        //pridani noveho slovicka se zavrenim modalu || Duchoslav
        $('.edit-slova').html(''); // pro vycisteni editovaciho modaly > jsou duplicitni #ID
        e.preventDefault();
        var japanese = $('#japanese').val();
        var czech = $('#czech').val();
        var description = $('#description1').val();
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/add_new_action.php',
            data: 'japanese=' + japanese + '&czech=' + czech + '&description=' + description,
            success: function (data) {
                console.log(data);
                if (data == 'Slovíčko bylo přidáno') {
                    $('#modal2').modal('close');
                    $('#japanese').val('');
                    $('#czech').val('');
                }
                search_words();
                modalInfo(data);
                //alert(data);
            }
        });
    });

    $('.techniques').click(function () {
        // zobrazovani typu v technikach || Duchoslav
        $('.edit-slova').html(""); // kvuli duplicite pri uprave
        var type = 'technique';
        $('#japanese-technique').val('');
        $('#czech-technique').val('');
        $('#description').val('');
        $('#image').val('');
        $('#image_nahled').attr('src', '../../img/neni.jpg');
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/display_techniques_new.php',
            data: 'type=' + type,
            success: function (data) {
                $('.select-technique').html(data);
            }
        });
        /*
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
        */
        $('#image').change(function () {
            // funkce se spusti jen, kdyz se neco zmeni
            readURL(this);
        });
    });

    var buttonpressed;
    $('input[type=submit]').click(function () {
        // zjisti ID inputu, podle ktereho rozlissim zavreni modalu
        buttonpressed = $(this).attr('id');
    });
    $('form#add_new_technique').submit(function (e) {
        // pridani nove techniky || Duchoslav
        e.preventDefault();
        //console.log(buttonpressed);
        if (buttonpressed == 'add-close-technique') {
            var close_modal = 'ano';
        }
        var formData = new FormData(this);
        var japanese = $('#japanese-technique').val();
        var czech = $('#czech-technique').val();
        var description = $('#description').val();
        var type = $('.select-technique').val();

        formData.append('description', description);
        formData.append('type', type);
        console.log
        $.ajax({
            url: '../../PHP-request/add_new_technique_action.php',
            type: 'POST',
            data: formData,
            success: function (data) {
                if (close_modal == 'ano' && data == 'Technika byla přidána') {
                    $('#modal4').modal('close');
                }
                // pro vymazani i pri pokracovani v pridavani
                if (data == 'Technika byla přidána') {
                    $('#japanese-technique').val(''); // po uspesnem pridani vymaze input, aby nedoslo k dvojitemu pridani
                    $('#czech-technique').val('');
                    $('#description').val('');
                    $('#image_nahled').attr('src', '../../img/neni.jpg');
                }

                modalInfo(data);
                //alert(data);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
      $('#modal5').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $('#modal5 .delete-word').click();
        }
    });
    /*
    $('#add-close-technique').click(function(e) {
        // pridani nove techniky || Duchoslav
        e.preventDefault();
        
        var formData = new FormData(this);
        var japanese = $('#japanese-technique').val();
        var czech = $('#czech-technique').val();
        var description = $('#description').val();
        var type = $('.select-technique').val();

        formData.append('description', description);
        formData.append('type', type);
        
        $.ajax({
            url: '../../PHP-request/add_new_technique_action.php',
            type: 'POST',
            data: formData,
            success: function(data) {
                $('#japanese-technique').val(""); // po uspesnem pridani vymaze input, aby nedoslo k dvojitemu pridani
                $('#czech-technique').val("");
                $('#description').val("");
                if (data == "Technika byla přidána") {
                    $('#modal4').modal('close');
                }
                alert(data);
            },
            cache: false,
            contentType: false,
            processData: false,
        });
    });
    */

    // TYPY - PRIDAVANI, UPRAVA, MAZANI
    function display_types() {
        // funkce pro zobrazeni typu || Duchoslav
        var type = 'technique';
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/display_types.php',
            data: 'type=' + type,
            success: function (data) {
                $('#types-view').html(data);
            }
        });
    }
    $('.types').click(function () {
        display_types();
    });
    $('body').on('click', '.submit-edit', function (e) {
        // editace typu
        e.preventDefault();
        var edit_id = $(this).data('id');
        var classa = '.type-edit-' + edit_id;
        var value = $(classa).val();
        var originalname = $(classa).data("originalname");
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/edit_type_action.php',
            data: 'value=' + value + '&id=' + edit_id + '&originalname=' + originalname,
            success: function () {
                display_types();
                modalInfo('Upraveno');
                showTypesTechniques(); // ukaze zmenene typy technik aby se nadale dalo vyhledavat
                //alert('Upraveno');
            }
        });
    });
    $('body').on('click', '.delete_type', function (e) {
        // mazani typu || Duchoslav
        e.preventDefault();
        var del_id = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/delete_type_action.php',
            data: 'id=' + del_id,
            success: function () {
                get_metadata();
                display_types();
                modalInfo('<p>Odstraněno</p>');
                //alert('Odstraneno');
            }
        });
    });
    $('#add_new_type').submit(function (e) {
        // pridani noveho typu || Duchoslav
        e.preventDefault();
        var type = $('#type').val();
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/add_new_type.php',
            data: 'type=' + type,
            success: function (data) {
                $('#type').val(''); // po uspesnem pridani vymaze input, aby nedoslo k dvojitemu pridani
                get_metadata();
                display_types();
                modalInfo(data);
                //alert(data);
            }
        });
    });
    // vyhledavani a zobrazovani || Duchoslav
    search_words();
    // ziska metadata
    var metadataStoreSHIT = {};
    get_metadata();
    $('#search').keyup(function () {
        // kod pro vyhledavani || Duchoslav
        search_words();
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
            .map(function () {
                return $(this).data('searchvalue');
            })
            .get();
        // with both
        var slovickaChecked = $('#TechniquesWordsOnClickSlovicka').is(
            ':checked'
        );
        var techniquesChecked = $('#TechniquesWordsOnClickTechniky').is(
            ':checked'
        );
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
            data: 'q=' +
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
            success: function (data) {
                //zobrazi data
                //JSON kod

                data = data.split('||&^*&%^^*(%*&^&&*(&(*&((*@*');
                var ukazovani_upravy_slovicek = JSON.parse(data[1]);
                document.getElementById('here').innerHTML = data[0];
                if (genreate_new == 'new') {
                    $('.pagination').html(data[2]);
                }
                if (data[0].length > 0) {
                    smallerpagination();
                }
                //$("#here").html(data[0]);
                function search_word_JSON(idcko_inputu) {
                    $(idcko_inputu).keyup(function () {
                        //$('#japanese').keyup(function() {
                        // vyhledani slovicka pres JSON pri zadavani, pokud uz v JSONu je, da mu moznost upravit toto slovicko
                        var word_search = $(idcko_inputu).val();
                        //var word_search = $('#japanese').val();
                        //console.log(word_search);
                        let vyhledane_word = ukazovani_upravy_slovicek.find(
                            o => o.japanese == word_search
                        );
                        //console.log(ukazovani_upravy_slovicek);
                        var vyhledane_word_str = vyhledane_word + '';
                        if (vyhledane_word_str == 'undefined') {
                            $('#edit-pridavani').css('display', 'none');
                        } else {
                            //console.log("nasel jsem");
                            var id_add_edit = vyhledane_word['ID'];
                            $('#edit-pridavani').attr('data-id', id_add_edit);
                            $('#edit-pridavani').css('display', 'block');
                        }
                    });
                }
                search_word_JSON('#japanese');
                search_word_JSON('#japanese-technique');
                $('.slovicka').click(function (e) {
                    // po kliknuti na pridani slovicka se vymaze input a tlacitko zmizi
                    e.preventDefault();
                    $('.edit-slova').html(""); // kvuli duplicite pri uprave
                    $('#edit-pridavani').css('display', 'none');
                    $('#japanese').val('');
                    $('#czech').val('');
                    $('#description1').val('');
                });
                $('.zkouska').click(function (e) {
                    // po kliknuti na "editovat slovicku uz zde je" se vymaze input a tlacitko zmizi puvodni modal
                    e.preventDefault();
                    $('#modal2').modal('close');
                    $('#japanese').val('');
                    $('#czech').val('');
                    $('#description1').val('');
                });
                $('.delete').click(function () {
                    var id = $(this).data('id');
                    $('.delete-word').click(function (e) {
                        // smaze slovicko po kliknuti
                        e.preventDefault();
                        $.ajax({
                            type: 'POST',
                            url: '../../PHP-request/delete_word_action.php',
                            data: 'id=' + id,
                            success: function (data) {
                                modalInfo(data);
                                //alert(data);
                                window.location = 'search.php';
                                search_words();
                            }
                        });
                    });
                });
                $('.odkaz').click(function () {
                    // po kliknuti se otevre modal a zobrazi se data
                    var id = $(this).data('id');
                    //let vyhledane = ukazovani_upravy_slovicek.find(o => o.ID == id);
                    //kontrola jestli je to slovicko nebo technika
                    function zobrazeni_JSON() {
                        let vyhledane = ukazovani_upravy_slovicek.find(
                            o => o.ID == id
                        );
                        //console.log(vyhledane);
                        if (vyhledane['type'] == 'word') {
                            var inputs = '';
                            inputs +=
                                "<form action='nvm.php' method='POST' id='formular'>";
                            inputs +=
                                //zmenil jsem <p> na label /max
                                "<div class='w3-bar'><label class='zkouska' id='edit-pridavani' data-id='' style='display: none;'>Slovíčko už existuje, nelze ho přidat/upravit</label>";
                            inputs +=
                                "<div class='w3-bar'><label>Japonsky: </label></div><div class='w3-bar'><input type='text' name='japanese' class='input_css' id='japanese' value='" +
                                vyhledane['japanese'] +
                                "' maxlength='255'></div>";
                            inputs +=
                                "<div class='w3-bar' style='margin-top:16px'><label>Česky: </label></div><div class='w3-bar'><input type='text' name='czech' class='input_css' id='czech' value='" +
                                vyhledane['czech'] +
                                "' maxlength='255'></div>";
                            var textarea_content = vyhledane['content'];
                            var new_textarea = textarea_content.replace(
                                /<p>/g,
                                ''
                            );
                            var newest_textarea = new_textarea.replace(
                                /<\/p>/g,
                                '\n'
                            );
                            inputs += '<div class="w3-bar" style="margin-top:16px;"><div id="descriptionBar1"><label>Popis:</label><textarea id="description1" class="description">' +
                                newest_textarea + '</textarea></div></div>';
                            //inputs += "<div class='w3-bar-item'><select name='type' id='type'><option value='slovo'>Slovo</option><option value='slovo2'>Slovo2</option></select></div></div>";
                            inputs +=
                                "<div class='w3-bar' style='margin-top:16px'><div class='w3-bar-item'><label for='submit' class='w3-button'><i class='material-icons icons-button'>send</i>Upravit</label><input type='submit' name='submit' id='submit' class='inputfile inputfile-1'></div>";
                            inputs += '</form>';
                            inputs +=
                                "<div class='w3-bar-item'><button id='delete' class='w3-button'><i class='material-icons icons-button'>delete</i>Smazat</button></div></div>";
                        } else {
                            //console.log(metadataStoreSHIT);
                            var inputs = '';
                            inputs +=
                                "<form action='nvm.php' method='POST' id='formular'>";
                            inputs +=
                                "<div class='w3-bar'><label for='japanese'>Japonsky:</label><input style='width:100%;margin-bottom:16px;' type='text' name='japanese' class='input_css' id='japanese' value='" +
                                vyhledane['japanese'] +
                                "' maxlength='255'></div>";
                            inputs +=
                                "<div class='w3-bar'><label for='czech'>Česky:</label><input style='width:100%; margin-bottom:16px;' type='text' name='czech' class='input_css' id='czech' value='" +
                                vyhledane['czech'] +
                                "' maxlength='255'></div>";

                            inputs +=
                                "<div class='w3-bar-item'>Vyberte typ:</div><select class='select-techniques' style='margin-bottom:16px;'>";
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
                            inputs += '</select></div>';

                            var textarea_content = vyhledane['content'];
                            var new_textarea = textarea_content.replace(
                                /<p>/g,
                                ''
                            );
                            var newest_textarea = new_textarea.replace(
                                /<\/p>/g,
                                '\n'
                            );
                            //inputs += "<textarea name='description' placeholder='Desription' id='description'>" +vyhledane['content'] +'</textarea>';
                            inputs +=
                                "<div class='w3-bar'>Popis:</div><div class='w3-bar'><textarea name='description' placeholder='Desription' id='description' class='wide description'>" +
                                newest_textarea +
                                '</textarea></div>';
                            inputs +=
                                "<img src='../../img/" +
                                vyhledane['imageUrl'] +
                                "' alt='" +
                                vyhledane['content'] +
                                "' height='140px' id='image_nahled'>";
                            inputs +=
                                "<div class='w3-bar'><input type='file' name='picture' id='image' class='inputfile inputfile-1'><label for='image' class='w3-bar-item' style='width:156px;padding-left:12px !important'><i class='material-icons icons-button'>add_a_photo</i>Vložte obrázek</label>";
                            inputs +=
                                "<div class='w3-bar'><div class='w3-bar-item w3-button w3-border' style='margin-top:18px;height:43px;border-radius:8px;'><a href='' id='delete_image' style='color:white; font-size:16px;'><i class='material-icons icons-button'>delete</i>Smazat obrázek</a></div></div>";
                            inputs +=
                                "<div class='w3-bar'><div class='w3-bar-item'><label for='submit-update' class='w3-button w3-item-bar'><i class='material-icons icons-button'>create</i>Upravit</label><input type='submit' name='submit' id='submit-update' class='inputfile-1 inputfile'></div>";
                            inputs += '</form>';
                            inputs +=
                                "<div class='w3-bar-item'><button id='delete' class='w3-button' style='padding: 8px 13px!important;'><i class='material-icons icons-button'>delete</i>Smazat</button></div></div>";
                        }
                        $('.edit-slova').html(inputs);
                    }
                    zobrazeni_JSON();
                    search_word_JSON();
                    $('#delete_image').click(function (e) {
                        // smaze obrazek po kliknuti
                        e.preventDefault();
                        $.ajax({
                            type: 'POST',
                            url: '../../PHP-request/delete_image.php',
                            data: 'id=' + id,
                            success: function (data) {
                                search_words();
                                zobrazeni_JSON();
                                $('#image_nahled').attr(
                                    'src',
                                    '../../img/neni.jpg'
                                );
                                modalInfo(data);
                                //alert(data);
                            }
                        });
                    });
                    /*
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
                    */
                    $('#image').change(function () {
                        // funkce se spusti jen, kdyz se neco zmeni
                        readURL(this);
                    });

                    $('form#formular').on('submit', '', function (e) {
                        // editace techniky/slovicka || Duchoslav
                        e.preventDefault();
                        //console.log('submitaaaa');
                        var formData = new FormData(this);

                        var description = $('.description').val();
                        var type = $('.select-techniques').val();

                        formData.append('type', type);
                        formData.append('id', id);
                        formData.append('description', description);
                        $.ajax({
                            url: '../../PHP-request/edit_technique_action.php',
                            type: 'POST',
                            data: formData,
                            success: function (data) {
                                modalInfo(data);
                                search_words();
                                if (data == "Technika byla upravena" || data == "Slovíčko bylo upraveno" ) {
                                    $('#modal1').modal('close');
                                }
                                
                                //alert(data);
                            },
                            cache: false,
                            contentType: false,
                            processData: false
                        });
                    });

                    $('#delete').click(function (e) {
                        // smaze slovicko po kliknuti
                        e.preventDefault();
                        $.ajax({
                            type: 'POST',
                            url: '../../PHP-request/delete_word_action.php',
                            data: 'id=' + id,
                            success: function (data) {
                                search_words();
                                $('#modal1').modal('close');
                                modalInfo(data);
                                //alert(data);
                            }
                        });
                    });
                });
            }
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
            success: function (data) {
                data = JSON.parse(data);
                metadataStoreSHIT = data;
                //console.log(metadataStoreSHIT);
            }
        });
    }
    // for scroll top button
    var btn = $('#buttonScrollTop');

    $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
    });

    btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
    });


});