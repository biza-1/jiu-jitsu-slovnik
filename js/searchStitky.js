$(document).ready(function() {
  $(".sidenav").sidenav(); // activates side navigation
  $(".modal").modal(); // activates modal to work
  getModalStitkyController(1); // shows all Stitky
  // max amount of STITKY
  var maxAmmountStitky = 10;
  // when user wants to add another STITEK
  $("#StitykDiv").on("click", "#pridatStitekButton", function(e) {
    var nazevStitku = $("#nazevStitku").val();
    $("#nazevStitku").val(""); // erases what was in
    checkIfStitekIsInDB(nazevStitku).then(function(isInDB) {
      if (nazevStitku === "") {
        $("#StitkyMessage").html("Štítek nesmí být prázdný");
        makeFadeInOut("#StitkyMessage");
      } else if (isInDB === true) {
        $("#StitkyMessage").html(
          "Štítek už je v databázi (" + nazevStitku + ")"
        );
      } else {
        // checks ammount of stitky and then > check if ammount exceeds maximum
        checkStitkyAmmount().then(function(stitkyAmmount) {
          if (stitkyAmmount <= maxAmmountStitky) {
            $("#StitkyMessage").html("");
            addStitektoDb(nazevStitku); // adds new stitek to IndexedDB
            getModalStitkyController(1); // shows all Stitky
          } else {
            // reached maximum stitky ammount
            $("#StitkyMessage").html(
              "Dosáhl jsi maximálního počtu štítků (" + maxAmmountStitky + ")."
            );
          }
        });
      }
    });
  });
  $("#StitykDiv").on("click", ".modalStitkyDelete", function(e) {
    // to prevent user spamming
    var btn = $(this);
    btn.prop("disabled", true);
    setTimeout(function() {
      btn.prop("disabled", false);
    }, timeToDisableButton);
    // to get id of STITEK
    var stitekID = $(this).data("id");
    
    console.log(stitekID);
  });
});
