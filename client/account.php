<?php
session_start();
if(!isset($_SESSION['google_data'])):header("Location:index.php");endif;
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login with Google Account by CodexWorld</title>
<style type="text/css">
h1
{
font-family:Arial, Helvetica, sans-serif;
color:#999999;
}
.wrapper{width:600px; margin-left:auto;margin-right:auto;}
.welcome_txt{
	margin: 20px;
	background-color: #EBEBEB;
	padding: 10px;
	border: #D6D6D6 solid 1px;
	-moz-border-radius:5px;
	-webkit-border-radius:5px;
	border-radius:5px;
}
.google_box{
	margin: 20px;
	background-color: #FFF0DD;
	padding: 10px;
	border: #F7CFCF solid 1px;
	-moz-border-radius:5px;
	-webkit-border-radius:5px;
	border-radius:5px;
}
.google_box .image{ text-align:center;}
</style>
</head>
<body>
<div class="wrapper">
    <h1>Google Profile Details </h1>
    <?php
    echo '<div class="welcome_txt">Welcome <b>'.$_SESSION['google_data']['name'].'</b></div>';
    echo '<div class="google_box">';
    echo '<p><b>Email : </b>' . $_SESSION['google_data']['email'].'</p>';
    echo '<p><b>You are login with : </b>Google</p>';
    echo '<p><b>Logout from <a href="logout.php?logout">Google</a></b></p>';
    echo '</div>';
    ?>
</div>
</body>
</html>