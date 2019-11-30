$(document).ready(function() {
  $(".sidenav").sidenav(); // activates side navigation
  $(".modal").modal(); // activates modal to work

  // for checking if is logged in if isnt > modal and redirect
  $("#modal3").modal({ // modal that affter closing redirects
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    onCloseEnd: function() {
      window.location.replace("../");
    }
  });
  // acctulay logged in
  ifUserLogedIn().then(function(isUserLogin) {
    if (isUserLogin === false ) {
      $('#modal3').modal('open');
    }
  });
  

  getModalStitkyController(1); // shows all Stitky
  // prevent adding stitky with pressing enter
  $("#stitkyForm").keydown(function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });
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
  // ammount time to disable button
  var timeToDisableButton = 500;
  $("#StitykDiv").on("click", ".modalStitkyDelete", function(e) {
    // to prevent user spamming
    var btn = $(this);
    btn.prop("disabled", true);
    setTimeout(function() {
      btn.prop("disabled", false);
    }, timeToDisableButton);
    // to get id of STITEK
    var stitekID = $(this).data("id");
    var nameOfTehcniques = $(this).data("name");
    removeLabelFromWordENTRELY(stitekID, nameOfTehcniques);
    getModalStitkyController(1); // shows all Stitky
  });
  $("#uploadStitky").on("click", function() {
    getAllStitky();
  });
  $("#downloadStitky").on("click", function() {
    downlaodStitky();
  });
  // for changign name MODE of STITKY
  $("#modalStitkyConrolerrDiv").on("click", ".modalStitkyEdit", function() {
    var whereTochange = $(this).data("id");
    var nameOfStitky = $(this).data("name");
    var output =
      '<input id="showName' +
      whereTochange +
      '" type="text" class="validate cahngeStitkyValue' +
      whereTochange +
      '" data-lpignore="true" value="' +
      nameOfStitky +
      '">';
    output +=
      '<p class="flow-text red" id="StitkyMessage' + whereTochange + '"></p>';
    output +=
      '<a class="btn-floating btn-small waves-effect waves-light red right buttonsToAddRemove modalStitkyNotOk" data-id="' +
      whereTochange +
      '" data-name="' +
      nameOfStitky +
      '"><i class="material-icons">clear</i></a>';
    output +=
      '<a class="btn-floating btn-small waves-effect waves-light red right buttonsToAddRemove modalStitkyOK" data-id="' +
      whereTochange +
      '" data-name="' +
      nameOfStitky +
      '"><i class="material-icons">check</i></a>';
    output += "</div>";
    $(".changeToForm" + whereTochange).html(output);
  });
  // for not changing name MODE of stitky
  $("#modalStitkyConrolerrDiv").on("click", ".modalStitkyNotOk", function() {
    var whereTochange = $(this).data("id");
    var nameOfStitky = $(this).data("name");
    var output = '<a href="StitkyResult.php?id=' + whereTochange + '">';
    output += '<p class=" flow-text">' + nameOfStitky + "</p>";
    output += "</a>";
    output +=
      '<a class="btn-floating btn-small waves-effect waves-light red right buttonsToAddRemove modalStitkyDelete" data-id="' +
      whereTochange +
      '" data-name="' +
      nameOfStitky +
      '" ><i class="material-icons">delete</i></a>';
    output +=
      '<a class="btn-floating btn-small waves-effect waves-light red right buttonsToAddRemove modalStitkyEdit" data-id="' +
      whereTochange +
      '" data-name="' +
      nameOfStitky +
      '" ><i class="material-icons">mode_edit</i></a>';
    output += "</div>";
    $(".changeToForm" + whereTochange).html(output);
  });
  // when he wants to change name
  $("#modalStitkyConrolerrDiv").on("click", ".modalStitkyOK", function() {
    var whereTochange = $(this).data("id");
    var nameOfStitky = $(this).data("name");
    var newName = $("#showName" + whereTochange + "").val();
    console.log(nameOfStitky);
    // if new name equals old > just render it
    if (newName == nameOfStitky) {
      var output = '<a href="StitkyResult.php?id=' + whereTochange + '">';
      output += '<p class=" flow-text">' + nameOfStitky + "</p>";
      output += "</a>";
      output +=
        '<a class="btn-floating btn-small waves-effect waves-light red right buttonsToAddRemove modalStitkyDelete" data-id="' +
        whereTochange +
        '" data-name="' +
        nameOfStitky +
        '" ><i class="material-icons">delete</i></a>';
      output +=
        '<a class="btn-floating btn-small waves-effect waves-light red right buttonsToAddRemove modalStitkyEdit" data-id="' +
        whereTochange +
        '" data-name="' +
        nameOfStitky +
        '" ><i class="material-icons">mode_edit</i></a>';
      output += "</div>";
      $(".changeToForm" + whereTochange).html(output);
    } else {
      if (newName == "") {
        $("#StitkyMessage" + whereTochange).html("Štítek nesmí být prázdný");
        makeFadeInOut("#StitkyMessage" + whereTochange);
      } else {
        checkIfStitekIsInDB(newName).then(function(isInDB) {
          if (isInDB === true) {
            $("#StitkyMessage" + whereTochange).html(
              "Štítek už je v databázi (" + newName + ")"
            );
            makeFadeInOut("#StitkyMessage" + whereTochange);
          } else {
            // renames stitek
            renameStitekInDB(whereTochange, newName, nameOfStitky).then(
              function() {
                var output =
                  '<a href="StitkyResult.php?id=' + whereTochange + '">';
                output += '<p class=" flow-text">' + newName + "</p>";
                output += "</a>";
                output +=
                  '<a class="btn-floating btn-small waves-effect waves-light red right buttonsToAddRemove modalStitkyDelete" data-id="' +
                  whereTochange +
                  '" data-name="' +
                  newName +
                  '" ><i class="material-icons">delete</i></a>';
                output +=
                  '<a class="btn-floating btn-small waves-effect waves-light red right buttonsToAddRemove modalStitkyEdit" data-id="' +
                  whereTochange +
                  '" data-name="' +
                  newName +
                  '" ><i class="material-icons">mode_edit</i></a>';
                output += "</div>";
                $(".changeToForm" + whereTochange).html(output);
              }
            );
          }
        });
      }
    }
  });
});
