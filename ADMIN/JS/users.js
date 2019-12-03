$(document).ready(function(e) {
	function display_users_ajax() {
		$.ajax({
		    type: "POST",
		    url: "../../PHP-request/display_users.php",
		    data: "",
		    success: function(data) {
		    	$('.users').html(data);
		    }
  		});
	}
	display_users_ajax();

	$("body").on("click","#admin_user", function(e) { // da uzivatele do metadat jako admin po kliknuti || Duchoslav
   		e.preventDefault();
    	var id = $(this).data('id');

	    $.ajax({
		    type: "POST",
		    url: "../../PHP-request/admin_user_action.php",
		    data: "id=" + id,
		   	success: function(data) {
		        alert(data);
		        display_users_ajax();
		   	}
	    });
	});

	$("body").on("click","#delete_user", function(e) { // smaze uzivatele po kliknuti || Duchoslav
   		e.preventDefault();
    	var id = $(this).data('id');

	    $.ajax({
		    type: "POST",
		    url: "../../PHP-request/delete_user_action.php",
		    data: "id=" + id,
		   	success: function(data) {
		        alert(data);
		        display_users_ajax();
		   	}
	    });
	});
});
