function modalInfo(info) {
    document.getElementById('modal-contentINFO').innerHTML =
        '<div class="w3-bar"><i class="material-icons w3-right modal-close w3-button">close</i></div><div class="w3-bar"><h2 style="margin:20px">' + info + '</h2></div>';
    $('#modalINFO').modal('open');
}
// for smaller pagination || BIZA
function smallerpagination() {
    var maxPerPage = 5;
    
    var lastPageNumber = $('#move_left').data('count');
    // shows dots or no if more pages than maxPerPage
    if (lastPageNumber > maxPerPage) {
        // 
        for (let el of document.querySelectorAll('.pagination_page'))
        el.style.display = 'none';
        // 
        document.getElementsByClassName('morePages')[0].style.display = 'block';
        document.getElementsByClassName('morePages')[1].style.display = 'block';
        document.getElementsByClassName('morePages2')[0].style.display =
            'block';
        document.getElementsByClassName('morePages2')[1].style.display =
            'block';
        document.getElementsByClassName('pageba1')[0].style.display = 'block';
        document.getElementsByClassName('pageba1')[1].style.display = 'block';
        document.getElementsByClassName(
            'pageba' + lastPageNumber,
        )[0].style.display = 'block';
        document.getElementsByClassName(
            'pageba' + lastPageNumber,
        )[1].style.display = 'block';
        //

        // pulka maxima pagination an strance pro zobrazeni pulky predchozich a pulky nadchazejicih
        var howMuch = Math.floor(maxPerPage / 2);
        // kdyz mensi  stranky nez maximum tak to zobrazi na strane else if zobrazi posledni else zobrazi na konci
        if (page <= maxPerPage - howMuch) {
            for (let index = 1; index <= maxPerPage; index++) {
                document.getElementsByClassName(
                    'pageba' + index,
                )[0].style.display = 'block';
                document.getElementsByClassName(
                    'pageba' + index,
                )[1].style.display = 'block';
            }
            document.getElementsByClassName('morePages')[0].style.display =
                'none';
            document.getElementsByClassName('morePages')[1].style.display =
                'none';
        } else if (page > lastPageNumber - maxPerPage + howMuch) {
            for (
                let index = lastPageNumber - maxPerPage + 1;
                index <= lastPageNumber;
                index++
            ) {
                document.getElementsByClassName(
                    'pageba' + index,
                )[0].style.display = 'block';
                document.getElementsByClassName(
                    'pageba' + index,
                )[1].style.display = 'block';
            }
            document.getElementsByClassName('morePages2')[0].style.display =
                'none';
            document.getElementsByClassName('morePages2')[1].style.display =
                'none';
        } else {
            for (
                let index = page - howMuch;
                index < page - howMuch + maxPerPage;
                index++
            ) {
                document.getElementsByClassName(
                    'pageba' + index,
                )[0].style.display = 'block';
                document.getElementsByClassName(
                    'pageba' + index,
                )[1].style.display = 'block';
            }
        }
    } else {
        document.getElementsByClassName('morePages')[0].style.display = 'none';
        document.getElementsByClassName('morePages')[1].style.display = 'none';
        document.getElementsByClassName('morePages2')[0].style.display =
            'none';
        document.getElementsByClassName('morePages2')[1].style.display =
            'none';
        //
    }
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        $.ajax({
            type: "POST",
            url: "/slovnik/admin/PHP-request/logout_action.php",
            data: "",
            success: function(data) {
                console.log('User signed out.');
                window.location.href = "/slovnik/admin/login/";
            }
        });
    });
}

function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}