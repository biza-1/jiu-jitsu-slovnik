<?php
include "../../includer.php";
include "INC/funtions.php";

if  (empty($_SESSION["userID"])) {
  header("location: /slovnik/");
  exit();
}
$_SESSION["user_id"] = $_SESSION["userID"];
$_SESSION["ASC"] = "ASC";
?>
<!DOCTYPE html>
<html lang="cs">

<head>
  <?= renderHead('Jiu-Jitsu slovník', 2) ?>
  <meta name="google-site-verification" content="m1rUnY7VlgeXrxsbPGpSDls9MaNmUMoD3tB0XGii0E0" />
</head>

  <body>
  <div class="w3-bar w3-white" id="uppermenu">
    <div class="w3-bar-item w3-padding-16">.</div>
  </div>
  <div style="position:fixed; width:100%; z-index:90;top:0" class='z-depth-3' >
  <?= renderSideNav(3) ?>
    <div class="w3-bar w3-gray" id="uppermenu">
      <a href="" class="w3-bar-item w3-button w3-padding-16">Jiu-Jitsu</a>
       <!-- sidenav - caller-->
      <div class="w3-bar-item w3-button w3-right w3-padding-16" onclick="w3_open()" style="padding-right: 10px;padding-left: 10px;"><i class="fas fa-bars"></i></div>
    </div>
  </div>
    <h1>Komunitní přidávání</h1>
    <!--people are going to write their words and definitions here-->
  <form action="APP/ACT/action_form_insert_community.php" method="POST">
    <input type="text" name="jap" placeholder="japanese">
    <input type="text" name="cze" placeholder="czech">
    <input type="submit" name="submit">
  </form>
  
  <p>Seřadit podle:</p>
  <div class="w3-container">
  <!--This views all the community words, so people can vote and view them with help of sorting buttons-->
    <?=View("ID","ASC")?>
  </div>
  <script>
    //funtions that trigger when voting up
    $('body').on("click", ".upvote" ,function(e){
      e.preventDefault();
      //these variables get the id and class of the button that is clicked on
      var id = $(this).attr('id');
      var vote = $(this).attr('class');
      //changes values in database
      $.ajax({
        type: "POST",
        url: "APP/ACT/action_form_vote.php",
        data: "ID=" + id+ "&vote=" + vote,
        success: function(data) {
          console.log(data);
          if (data == 'prihlaseni') {
            //if the person voting isnt logged in it will alert him
            alert("You need to login first!");
          }
          //changes value of vote button after voting
          $.ajax({
            type: "POST",
            url: "APP/ACT/action_form_select.php",
            data: "ID=" + id+ "&vote=" + vote,
            success: function(data) {
              var classa = "#tr"+id;
              $(classa).html(data);
            }
          });
        }
      });
    });
    //funtions that trigger when voting down
    $('body').on("click", ".downvote" ,function(e){
      e.preventDefault();
      var id = $(this).attr('id');
      var vote = $(this).attr('class');
      //changes values of votes and user_vote_id in database 
      $.ajax({
        type: "POST",
        url: "APP/ACT/action_form_vote.php",
        data: "ID=" + id+ "&vote=" + vote,
        success: function(data) {
          console.log(data);
          if (data == 'prihlaseni') {
            //if the person voting isnt logged in it will alert him
            alert("You need to login first!");
          }
            //changes value and color of vote button after voting
          $.ajax({
            type: "POST",
            url: "APP/ACT/action_form_select.php",
            data: "ID=" + id+ "&vote=" + vote,
            success: function(data) {
              var classa = "#tr"+id;
              $(classa).html(data);
            }
          });
        }
      });
    });

    //function that will change the view by sorting
    $('body').on("click", ".sorts" ,function(e){
      var sortingBy = $(this).data('sort');
      var ascDESC = $(this).data('order');
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "APP/ACT/action_form_order.php",
        data: "sortBy="+sortingBy+"&ascDESC="+ascDESC,
        success: function(data) {
          $('#this').html(data);
        }
      });
    });
    function myFunction(id) {
      var x = document.getElementById(id);
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    }

    function w3_open() {
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("myOverlay").style.display = "block";
    }

    function w3_close() {
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("myOverlay").style.display = "none";
    }
  </script>
  <?= renderJsLink(2) ?>
  </body>
</html>
