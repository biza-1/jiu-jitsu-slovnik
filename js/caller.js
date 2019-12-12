$(document).ready(function() {
    // when document is ready and is online: tries to get data || BIZA
    // TODO in a variable declare that he opened and updated nad then dont update
    if (navigator.onLine) {
        console.log('interssset');        
        // if ammount of data bigged than 0 check for last time updated else update
        getAmountOfDataInSLOVICKA().then(function(ammount) {
            if (ammount > 0) {
                // if the last update was longer than a day
                ifCurrentTimeBiggerThan().then(function(ifLongerThanDay) {
                    if(ifLongerThanDay === true) {
                        console.log("ha");                        
                        dbGetSlovicka();
                    }
                });
            } else {                
                dbGetSlovicka();
            }
        });
        
        
        getSearchResult();       
        console.log(Date.now()/86400000);
    } else {
        console.log('internet not');
        getSearchResult();
    }
    $('#collapsibleTequniques').collapsible(); // collapsible for choosing what tequnisqe you want to search
    $('.sidenav').sidenav(); // activates side navigation
    $('.modal').modal(); // activates modal to work
    checkIfUserExists(); // show if user is logged in // add option to log in
    getTechniquesToSearch(); // for filling Techniques in collapsible
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
        getSearchResult();
    });
    // when choosing if search in Czech or Japanese
    $('#japan_czech').on('click', function(e) {
        if ($('#japan_czech').text() == 'CZ') {
            $('#japan_czech').text('JP');
        } else {
            $('#japan_czech').text('CZ');
        } // changing if search in Japanese or in Czech
        getSearchResult();
    });
    // test
    $('#nazev2').on('input propertychange paste', function(e) {
        var searchValue = $('#nazev2').val();
        jakDaleko = $('.searchINByJQUERY:contains("' + searchValue + '")')
                .first()
                .offset()
        console.log(jakDaleko);
        //$.contains('.searchINByJQUERY', searchValue);
        if (jakDaleko != 'undefined') {
            
            //$(window).scrollTop(jakDaleko);
            $('html, body').animate({ scrollTop: jakDaleko.top }, 1);
        }

        //$(document).scrollTop(jakDaleko-velikostDocment+velikostDocment2);

        //$('html,body').animate({scrollTop: jakDaleko});
        //$('html,body').scrollTop(jakDaleko);
        //$('html,body').animate({scrollTop: $('#imhere').offset().top});
    });
    // for checking Longpress for selecting tags
    var mousepress_time = 1000; // time before choosing
    var ceckIfTimer = 0; // checking if longpress occured
    // for PC
    $('#searchResult')
        .on('mousedown', '.searchResultDiv', function(event) {
            var $this = $(this);
            $(this).data(
                'checkdown',
                setTimeout(function(e) {
                    $this.addClass('selectedSearchResult');
                    ceckIfTimer = 1;
                    $('#longHoldBox').show(); // for displaying box on top of screen to add or remove labels
                }, mousepress_time),
            );
        })
        .on('mouseup', '.searchResultDiv', function(e) {
            clearTimeout($(this).data('checkdown'));
        })
        .on('mouseout', '.searchResultDiv', function(e) {
            clearTimeout($(this).data('checkdown'));
        });
    // for MOBILE
    $('#searchResult')
        .on('touchstart', '.searchResultDiv', function(event) {
            var $this = $(this);
            $(this).data(
                'checkdown',
                setTimeout(function(e) {
                    $this.addClass('selectedSearchResult');
                    ceckIfTimer = 1;
                    $('#longHoldBox').show(); // for displaying box on top of screen to add or remove labels
                }, mousepress_time),
            );
        })
        .on('touchend', '.searchResultDiv', function(e) {
            clearTimeout($(this).data('checkdown'));
        });
    // click that is same for pc and mobile
    $('#searchResult').on('click', '.searchResultDiv', function(e) {
        if (
            $('#searchResult').find('div.selectedSearchResult').length !== 0 &&
            !$(this).hasClass('selectedSearchResult')
        ) {
            // the biggest mindfuck of all time: if at least one selected AND it doesnt have class > add it ELSE IF longpress occured > nothing ELSE IF it has class remove it
            $(this).addClass('selectedSearchResult');
            e.preventDefault();
            // if selector of all stitky should be checked or not
            ifSelectAllStityk();
            $('#longHoldBox').show(); // for displaying box on top of screen to add or remove labels
        } else if (ceckIfTimer == 1) {
            e.preventDefault();
            ceckIfTimer = 0;
            $('#longHoldBox').show(); // for displaying box on top of screen to add or remove labels
            // if selector of all stitky should be checked or not
            ifSelectAllStityk();
        } else if ($(this).hasClass('selectedSearchResult')) {
            e.preventDefault();
            $(this).removeClass('selectedSearchResult');
            if (
                $('#searchResult').find('div.selectedSearchResult').length === 0
            ) {
                $('#longHoldBox').hide(); // for hiding box on top of screen to add or remove labels
            }
            // if selector of all stitky should be checked or not
            ifSelectAllStityk();
        }
    });
    // to check all things when clicks on select all STITKY
    $(document).on(
        'change',
        '#selectAllDiselectAllControllerSTITKY',
        function() {
            if ($(this).is(':checked')) {
                $('.searchResultDiv').addClass('selectedSearchResult');
            } else {
                $('.searchResultDiv').addClass('selectedSearchResult');
            }
        },
    );
    // for closing selector with STITYK
    $('#closeStitkySelecetor').on('click', function() {
        $('.searchResultDiv').removeClass('selectedSearchResult');
        $('#longHoldBox').hide(); // for hiding box on top of screen to add or remove labels
    });
    // prevents right click on search result to enable long press on mobile
    $('#searchResult').on('contextmenu', function(e) {
        e.preventDefault();
    });

    // section for STITKY
    $('#StitkyModalOpener').on('click', function(e) {
        // when User click <a> to open Modal to change Stitky
        ifUserLogedIn().then(function(data) {
            // for checking if logged in indexedDB
            if (data === true) {
                showModalStitkyAdder();
                getModalStitkyController(0); // shows all Stitky
            } else {
                $('#LabelAdd').html(
                    'pro tuto funkci musi byt uzivatel prihlasen',
                ); // when user is not signed in > message
            }
        });
    });
    // max amount of STITKY
    var maxAmmountStitky = 10;
    // when user wants to add another STITEK
    $('#LabelAdd').on('click', '#pridatStitekButton', function(e) {
        var nazevStitku = $('#nazevStitku').val();
        $('#nazevStitku').val(''); // erases what was in
        checkIfStitekIsInDB(nazevStitku).then(function(isInDB) {
            if (nazevStitku === '') {
                $('#StitkyMessage').html('Štítek nesmí být prázdný');
                makeFadeInOut('#StitkyMessage');
            } else if (isInDB === true) {
                $('#StitkyMessage').html(
                    'Štítek už je v databázi (' + nazevStitku + ')',
                );
            } else {
                // checks ammount of stitky and then > check if ammount exceeds maximum
                checkStitkyAmmount().then(function(stitkyAmmount) {
                    if (stitkyAmmount <= maxAmmountStitky) {
                        $('#StitkyMessage').html('');
                        addStitektoDb(nazevStitku); // adds new stitek to IndexedDB
                        getModalStitkyController(0); // shows all Stitky
                    } else {
                        // reached maximum stitky ammount
                        $('#StitkyMessage').html(
                            'Dosáhl jsi maximálního počtu štítků (' +
                                maxAmmountStitky +
                                ').',
                        );
                    }
                });
            }
        });
    });
    // prevent adding stitky with pressing enter
    $('#stitkyForm').keydown(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    });
    // ammount time to disable button
    var timeToDisableButton = 500;
    // on click when wants to add STITEK
    $('#LabelAdd').on('click', '.modalStitkyAdd', function(e) {
        // to prevent user spamming
        var btn = $(this);
        btn.prop('disabled', true);
        setTimeout(function() {
            btn.prop('disabled', false);
        }, timeToDisableButton);
        // to get id of STITEK
        var stitekID = $(this).data('id');
        // to get all oznacene
        var vsechnyOznacene = $('.selectedSearchResult')
            .map(function() {
                return $(this).data('id');
            })
            .get();
        var nameOfTehcniques = $(this).data('name');
        addLabelsToWords(stitekID, vsechnyOznacene, nameOfTehcniques);
    });
    // on click when wants to remove STITEK
    $('#LabelAdd').on('click', '.modalStitkyRemove', function(e) {
        // to prevent user spamming
        var btn = $(this);
        btn.prop('disabled', true);
        setTimeout(function() {
            btn.prop('disabled', false);
        }, timeToDisableButton);
        // to get id of STITEK
        var stitekID = $(this).data('id');
        // to get all oznacene
        var vsechnyOznacene = $('.selectedSearchResult')
            .map(function() {
                return $(this).data('id');
            })
            .get();
        var nameOfTehcniques = $(this).data('name');
        removeLabelFromWord(stitekID, vsechnyOznacene, nameOfTehcniques);
    });
});
