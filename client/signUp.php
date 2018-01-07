<?php
include 'dbConfig.php';
$newuser = $newpw = $pw1 = $pw2 = $password =  "";
if (isset($_POST['register'])){

    $newuser = stripslashes($_POST['email']); // removes backslashes
    $newuser = mysqli_real_escape_string($mysqli,$newuser);
    
    $password = stripslashes($_POST['password1']);
    $password = mysqli_real_escape_string($mysqli,$password);
    $password = md5($password);
    $pw1 = $_POST['password1'];
    $pw2 = $_POST['password2'];

    if ($pw1 != $pw2) {

        echo '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Password fields must match</div><div id="returnVal" style="display:none;">false</div>';

    } elseif (strlen($pw1) < 4) {

        echo '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Password must be at least 4 characters</div><div id="returnVal" style="display:none;">false</div>';

    } elseif (!filter_var($newuser, FILTER_VALIDATE_EMAIL) == true) {

        echo '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Must provide a valid email address</div><div id="returnVal" style="display:none;">false</div>';

    }else {

        $query = "INSERT into users (email, password) VALUES ('$newuser','$password')";
        mysqli_query($mysqli,$query);
        echo '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>You have registered successfully.<br/><a href="index.php">Sign in now!</a></div><div id="returnVal" style="display:none;">true</div>';
       
    } 
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ShowMe</title>
    <!-- CSS -->
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,500">
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/form-elements.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>
    <!-- Top content -->
    <div class="top-content">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-sm-offset-3 form-box">
                    <div class="form-top">
                        <div class="form-top-left">
                            <h3>Sign up in ShowMe</h3>
                            <p>Enter your Email address and Password to Register:</p>
                        </div>
                    </div>
                    <div class="form-bottom">
                        <form role="form" action="" name="register" method="post" class="login-form">
                            <div class="form-group">
                                <label class="sr-only" for="form-username">Email Adress</label>
                                <input type="text" name="email" placeholder="Email" class="form-username form-control" id="form-username">
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">Password</label>
                                <input type="password" name="password1" placeholder="Password" class="form-password form-control" id="form-password">
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">Confirm Password</label>
                                <input type="password" name="password2" placeholder="Confirm Password" class="form-password form-control" id="form-password">
                            </div>
                            <button type="submit" name= "register" class="btn">Sign up!</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Javascript -->
    <script src="assets/js/jquery-1.11.1.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/jquery.backstretch.min.js"></script>
    <script src="assets/js/scripts.js"></script>
</body>

</html>