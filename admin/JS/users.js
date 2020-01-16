var page = 1;
$(document).ready(function(e) {
    search_words();
    $('.modal').modal();
    $('#search').keyup(function() {
        // kod pro vyhledavani || Duchoslav
        search_words();
    });
    function search_words(genreate_new = 'new') {
        // kod pro vyhledavani uzivatelu || Duchoslav
		$('#users').show();
		var x = $('#search').val();
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/search_fetch_users.php',
            data: 'q=' + x + '&pagination=' + page + '&new=' + genreate_new,
            success: function(data) {
                data = data.split('||&^*&%^^*(%*&^&&*(&(*&((*@*');
                document.getElementById('users').innerHTML = data[0];
                if (genreate_new == 'new') {
                    $('.pagination').html(data[1]);
                }
                smallerpagination();
            }
        });
    }

    $('.pagination').on('click', '.pagination_page', function(e) {
        page = $(this).data('id');
        $('.pagination_page').removeClass('active');

        $('.pageba' + page).addClass('active');
        window.scrollTo(0, 0);
        search_words('not_change');
        smallerpagination();
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
        smallerpagination();
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
        smallerpagination();
    });
    $('body').on('click', '#admin_user', function(e) {
        // da uzivatele do metadat jako admin po kliknuti || Duchoslav
        e.preventDefault();
        var id = $(this).data('id');

        $.ajax({
            type: 'POST',
            url: '../../PHP-request/admin_user_action.php',
            data: 'id=' + id,
            success: function(data) {
                modalInfo(data);
                search_words($('#search').val());
            }
        });
    });
    $('body').on('click', '#delete_user', function(e) {
        // smaze uzivatele po kliknuti || Duchoslav
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: '../../PHP-request/delete_user_action.php',
            data: 'id=' + id,
            success: function(data) {
                modalInfo(data);
                search_words($('#search').val());
            }
        });
    });
});
