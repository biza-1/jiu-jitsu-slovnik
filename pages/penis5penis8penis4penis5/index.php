<?php
session_id("test");
session_start();
  include "INC/db.php";
  include "INC/render.php";
  include "INC/funtions.php";

$_SESSION["user_id"] = 5;
?>

<!DOCTYPE html>
<html lang="cs" dir="ltr">
  <head>
    <?= renderHead("Komunitní přidávání")?>
  </head>
  <body style="background-color:olive">
  <h1>Curaku uz nic nezkousej</h1>
  <!-- <form action="APP/ACT/action_form_insert_community.php" method="POST">
    <input type="text" name="jap" placeholder="japanese">
    <input type="text" name="cze" placeholder="czech">
    <input type="text" name="type" placeholder="type">
    <input type="submit" name="submit">
  </form>
-->
  <div>
    <p>Sort by:</p>
    <a href="" id="sortID" class="sorts" data-sort="ID">ID</a>
    <a href="" id="sortVOTE" class="sorts" data-sort="vote">>VOTES</a>
  </div>
  <div id="select">
    <?=View("ID","DESC")?>
  </div>

  <script>
    $('.sorts').on("click", function(e) {
      var sortingBy = $(this).data('sort');
      var ascDESC = 'ASC';
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "APP/ACT/action_form_order.php",
        data: "sortBy="+sortingBy+"&ascDESC="+ascDESC,
        success: function(data) {
          $('#select').html(data);
        }
      });
    });
    /*$('#sortVOTE').click(function(e){
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "APP/ACT/action_form_order.php",
        data: "ID=" + id+ "&vote=" + vote,
        success: function(data) {
          $('#select').html(data);
        }
      });
    });*/
    //funtions that trigger when voting up
    $('.upvote').click(function(e){
      e.preventDefault();
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
            alert("You need to login first!");
          }
          //changes color of vote button after voting
          $.ajax({
            type: "POST",
            url: "APP/ACT/action_form_color.php",
            data: "ID=" + id+ "&vote=" + vote,
            success: function(data) {
              var classa = "#statusplus"+id;
              $(classa).css("color", data);
              var classa = "#statusminus"+id;
              $(classa).css("color", "");
            }
          });
          //changes value of vote button after voting
          $.ajax({
            type: "POST",
            url: "APP/ACT/action_form_select.php",
            data: "ID=" + id+ "&vote=" + vote,
            success: function(data) {
              var classa = ".vote"+id;
              $(classa).html(data);
            }
          });
        }
      });
    });
    //funtions that trigger when voting down
    $('.downvote').click(function(e){ 
      e.preventDefault();
      var id = $(this).attr('id');
      var vote = $(this).attr('class');
      //changes values in database
      $.ajax({
        type: "POST",
        url: "APP/ACT/action_form_vote.php",
        data: "ID=" + id+ "&vote=" + vote,
        success: function(data) {
          if (data == 'prihlaseni') {
            alert("You need to login first!");
          }
          //changes color of vote button after voting
          $.ajax({
            type: "POST",
            url: "APP/ACT/action_form_color.php",
            data: "ID=" + id+ "&vote=" + vote,
            success: function(data) {
              var classa = "#statusminus"+id;
              $(classa).css("color", data);
              var classa = "#statusplus"+id;
              $(classa).css("color", "");
            }
          });
          //changes value of vote button after voting
          $.ajax({
            type: "POST",
            url: "APP/ACT/action_form_select.php",
            data: "ID=" + id+ "&vote=" + vote,
            success: function(data) {
              var classa = ".vote"+id;
              $(classa).html(data);
            }
          });
        }
      });
    });
  </script>
  </body>
</html>
