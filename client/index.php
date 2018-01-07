<?php
include_once("config.php");
include_once("dbConfig.php");
include_once("includes/functions.php");

if (isset($_POST['signIn'])){
    $email = stripslashes($_REQUEST['email']); // removes backslashes
    $email = mysqli_real_escape_string($mysqli,$email); //escapes special characters in a string
    $password = stripslashes($_REQUEST['password']);
    $password = mysqli_real_escape_string($mysqli,$password);
    $password = md5($password);

    $query = "SELECT * FROM users WHERE email='$email' and password='$password'";
    $result = mysqli_query($mysqli,$query);
    $rows = mysqli_num_rows($result);
    if($rows==1){
        $_SESSION['email'] = $email;
        header("Location: searchAuth.php");
    }
    else{
         echo '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Your credentials are wrong. Try again.</div><div id="returnVal" style="display:none;">false</div>';
    }     
}    

if(isset($_REQUEST['code'])){
	$gClient->authenticate();
	$_SESSION['token'] = $gClient->getAccessToken();
	header('Location: ' . filter_var($redirectUrl, FILTER_SANITIZE_URL));
}

if (isset($_SESSION['token'])) {
	$gClient->setAccessToken($_SESSION['token']);
}

if ($gClient->getAccessToken()) {
	$userProfile = $google_oauthV2->userinfo->get();
	//DB Insert
	$gUser = new Users();
	$gUser->checkUser('google',$userProfile['id'],$userProfile['given_name'],$userProfile['family_name'],$userProfile['email'],$userProfile['gender'],$userProfile['locale'],$userProfile['link'],$userProfile['picture']);
	$_SESSION['google_data'] = $userProfile; // Storing Google User Data in Session
	header("location: account.php");
	$_SESSION['token'] = $gClient->getAccessToken();
} else {
	$authUrl = $gClient->createAuthUrl();
}

if(isset($authUrl)) {
	echo '<a href="'.$authUrl.'"><img src="images/glogin.png" alt=""/></a>';
} else {
	echo '<a href="logout.php?logout">Logout</a>';
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
                            <h3>Login to ShowMe</h3>
                            <p>Enter your Email address and Password to log in:</p>
                        </div>
                        <div class="form-top-right">
                            <i class="fa fa-lock"></i>
                        </div>
                    </div>
                    <div class="form-bottom">
                        <form role="form" action="" method="post" class="login-form">
                            <div class="form-group">
                                <label class="sr-only" for="form-username">Email Adress</label>
                                <input type="text" name="email" placeholder="Email..." class="form-username form-control" id="form-username">
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">Password</label>
                                <input type="password" name="password" placeholder="Password..." class="form-password form-control" id="form-password">
                            </div>
                            <button name="signIn" type="submit" class="btn">Sign in!</button>
                        </form>
                        <div class="form-bottom-left">
                            <p>Need an Account? <a href="signUp.php">Sign Up Now!</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 col-sm-offset-3 social-login">
                    <h3>or</h3>
                    <div class="social-login-buttons">
                        <a class="btn btn-link-1 btn-link-1-google-plus" href="<?php echo $authUrl?>"><i class="fa fa-google-plus"></i> Sign in with Google</a>
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