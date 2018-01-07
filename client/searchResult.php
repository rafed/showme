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
	        width: auto;
	        margin: 0 auto;
	    }
	    .dropdown.dropdown-lg {
	        position: static !important;
	    }
	    .dropdown.dropdown-lg .dropdown-menu {
	        min-width: auto;
	    }
	}

</style>
</head>
<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="50" onload="requestPDFData()">
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="searchAuth.php">ShowMe</a>
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
<div id="band" class="container">
  	
	<!--search bar-->

            <div  id="adv-search">
              <form class="input-group" action = "#" method = "POST">  
                <input type="hidden" id="searchKey" value="<?php echo $_POST["paper"]; ?>"/>
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
                                  <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                </form>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                    </div> 
                </div>
              </form>
            </div>

            <br><br>
     
  <ul class="nav nav-tabs">
    <li class = "active"><a  href="searchResult.php">Search Result</a></li>
    <li><a  href="graph.php">Graph</a></li>
  </ul>


<div class="tab-content"> 
  <div id="showData" class="tab-pane fade in active">
    <table  id="huku" class="table">
        <thead class="thead-dark">
          <tr>
            <th>Title</th>
            <th>Site Link</th>
            <th>Description</th>
            <th>Graph</th>
          </tr>
        </thead>
      </table>
  </div>
 </div> 

<script type="text/javascript">  
    function requestPDFData() {
	var server="http://127.0.0.1:9999/";
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			
            var rdata = this.responseText;
			//alert(rdata);
            var data = JSON.parse(rdata);
			//alert(data.length);
			
            /*var col = [];
            for (var i = 0; i < data.length; i++) {
                for (var key in data[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }*/
            var table = document.getElementById("huku");
            for (var i = 0; i < data.length; i++) {
				//alert(data[i].title);
                var tr = table.insertRow(-1);

                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i].title;

                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i].sitelink;

                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i].description;

                var pdfID = data[i].data_cid;
				var pdfURL= data[i].pdflink;
                
                var form = document.createElement("form");
                form.setAttribute('method',"post");
                form.setAttribute('action',"graph.php");

                var input = document.createElement("input"); 
                input.setAttribute('type',"hidden");
                input.setAttribute('name',"pdfID");
                input.setAttribute('value', pdfID);
				
				var input2 = document.createElement("input"); 
                input2.setAttribute('type',"hidden");
                input2.setAttribute('name',"pdfURL");
                input2.setAttribute('value', pdfURL);

                var submit = document.createElement("button"); 
                submit.setAttribute('type',"submit");
                submit.className = "btn btn-default";
                submit.innerHTML = "Generate";

                form.appendChild(input);
                form.appendChild(input2);
                form.appendChild(submit);

                tabCell = tr.insertCell(-1);
                tr.appendChild(form);
            }

            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        }
      };
      var searchKey=document.getElementById("searchKey").value;
      var gurl = server+"api/search/" + searchKey;
      xhttp.open("GET", gurl, true);
      xhttp.send();

    }

 </script>

  <br><br><br><br><br><br><br><br>
</div>
<!-- Footer -->
<footer class="text-center">
  <p>Developed by Team ARME</p> 
</footer>



</body>
</html>
