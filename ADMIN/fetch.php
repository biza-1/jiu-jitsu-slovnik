<?php
    if (!empty($_GET['q'])) {
    	include 'connect.php';
    	$q = $_GET['q'];
    	$query = "select * from slovicka where japanese like '%$q%'";
    	$result = mysqli_query($conn,$query);
    	while ($output=mysqli_fetch_assoc($result)) {
    		echo '<a class="waves-effect waves-light btn modal-trigger odkaz" href="#modal1" data-id="'.$output['ID'].'">'.$output['japanese'].'</a><br><span>'.$output['czech'].'</span><br><br>';
    	}
    }
?>