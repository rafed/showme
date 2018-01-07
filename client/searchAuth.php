<?php
include 'auth.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>ShowMe</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,500">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<style>
  body {
      font: 400 15px/1.8 Lato, sans-serif;
      color: #777;
  }

  .container {
      padding: 80px 120px;
  }

  .bg-1 {
      background: #2d2d30;
      color: #bdbdbd;
  }

  .nav-tabs li a {
      color: #777;
  }

  .navbar {
      font-family: Montserrat, sans-serif;
      margin-bottom: 0;
      background-color: #2d2d30;
      border: 0;
      font-size: 15px !important;
      letter-spacing: 2px;
      opacity: 0.9;
  }
  .navbar li a, .navbar .navbar-brand { 
      color: #d5d5d5 !important;
  }
  .navbar-nav li a:hover {
      color: #fff !important;
  }
  .navbar-nav li.active a {
      color: #fff !important;
      background-color: #29292c !important;
  }


  footer {
      background-color: #2d2d30;
      color: #f5f5f5;
      padding: 32px;
  }


  .dropdown.dropdown-lg .dropdown-menu {
    margin-top: -1px;
    padding: 6px 20px;
	}
	.input-group-btn .btn-group {
	    display: flex !important;
	}
	.btn-group .btn {
	    border-radius: 0;
	    margin-left: -1px;
	}
	.btn-group .btn:last-child {
	    border-top-right-radius: 4px;
	    border-bottom-right-radius: 4px;
	}
	.btn-group .form-horizontal .btn[type="submit"] {
	  border-top-left-radius: 4px;
	  border-bottom-left-radius: 4px;
	}
	.form-horizontal .form-group {
	    margin-left: 0;
	    margin-right: 0;
	}
	.form-group .form-control:last-child {
	    border-top-left-radius: 4px;
	    border-bottom-left-radius: 4px;
	}

	@media screen and (min-width: 768px) {
	    #adv-search {
	        width: 700px;
	        margin: 0 auto;
	    }
	    .dropdown.dropdown-lg {
	        position: static !important;
	    }
	    .dropdown.dropdown-lg .dropdown-menu {
	        min-width: 700px;
	    }
	}

</style>
</head>
<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="50">

<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#myPage">ShowMe</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="history.php">History</a></li>
        <li><a href="logoutNonGmail.php">Log Out</a></li>
      </ul>
    </div>
  </div>
</nav>



<!-- Container -->
<div id="band" class="container text-center">
  <h3>Welcome<?php echo " " . $_SESSION["email"]; ?></h3>
  <p><em>Show me related work</em></p>
  <p>ShowMe is a web application that will help the research community to find related work and understand relationship among them.
  Finding related work and understanding the relation among papers is a non-trivial task. Many services offer help, e.g., GoogleScholar, but they lack many (dynamic) features. Ideally, we are be able to visualize relations among papers as graphs; each node is a paper and there is a directed edge between two nodes if one paper cites another. A click on a node in the graph will show the pdf (if available), and a click on an edge in the graph should show the way one paper cites another. Furthermore, the graph can be enhanced by users; the users can mark an edge as strong (i.e., paper is closely related) or weak.</p>
	
  <hr>

  <h4>Search paper here</h4>
	
	<!--search bar-->

            <div class="input-group" id="adv-search">
              <form action="searchResult.php" method="post">
                <input type="text" name="paper" class="form-control" placeholder="Enter paper title" />
                <div class="input-group-btn">
                    <div class="btn-group" role="group">
                        <div class="dropdown dropdown-lg">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <form class="form-horizontal" role="form">
                                  <div class="form-group">
                                    <label for="contain">Articles dated between</label>
                                    <input  type="text" /> -
                                    <input  type="text" />
                                  </div>
                                  <div class="form-group">
                                    <label for="contain">Author</label>
                                    <input class="form-control" type="text" />
                                  </div>
                                  <div class="form-group">
                                    <label for="contain">Contains the words</label>
                                    <input class="form-control" type="text" />
                                  </div>
                                  <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                </form>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                    </div>
                </div>
              </form>  
            </div>
     



  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</div>





<!-- Footer -->
<footer class="text-center">

  <p>Developed by Team ARME</p> 
</footer>



</body>
</html>
