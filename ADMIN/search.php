<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<title>Search</title>
</head>
<body>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);      
      
    });

    $(document).ready(function(e) {      
      $("#search").keyup(function() {
        $("#here").show();
        var x = $(this).val();
        $.ajax({
          type: 'GET',
          url: 'PHP-request/search_fetch.php',
          data: 'q=' + x,
          success: function(data) {
            $("#here").html(data);
            $('.odkaz').click(function() {
              var id = $(this).data('id');
              console.log(id);                          
              /*$(href).data('id', id);*/
              });
          },
        });
      });
      
    }); 
    //var id = document.getElementById()


    
  </script>
	<input type="search" name="search" id="search">
	<div id="here">
		
	</div>
  <!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
 


</body>
</html>