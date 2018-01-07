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


  <link type="text/css" rel="stylesheet" href="assets/jquery.qtip.min.css" />
    <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.css">
    <script src='assets/jquery-3.2.1.min.js'></script>
    <script src='assets/jquery.qtip.min.js'></script>
    <script src='assets/cytoscape-qtip.js'></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.1.3/cytoscape.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.1.3/cytoscape.min.js"></script>
    
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.js"></script>
    <script src="https://unpkg.com/cytoscape/dist/cytoscape.min.js"></script>
    <script src="assets/cytoscape-qtip.js"></script>

<style>
  body {
      font: 400 15px/1.8 Lato, sans-serif;
     
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


  #cy {
        width: 90%;
        height: 90%;
        position: absolute;
        left: 80px;
     
        top: 50;
        right: 40px;
        bottom: 50;
       
      }
    
  
.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}

</style>
</head>
<body id="myPage" onload="buildGraph()" data-spy="scroll" data-target=".navbar" data-offset="50">

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
            <div class="input-group" id="adv-search">
                <input type="text" class="form-control" placeholder="Enter paper title" />
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
                        <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>

            <br>
     
  <ul class="nav nav-tabs">
    <li><a  href="searchResult.php">Search Result</a></li>
    <li class = "active"><a  href="graph.php">Graph</a></li>
  </ul>
    <br>
    <button type="button" data-toggle="modal" data-target="#myModal" class="btn center-block btn-primary">Filter Graph</button>
    <button type="button" class="btn center-block btn-primary">Batch Download</button>
 

  
		<div class="well" id = "cy">
			<span id="para" class="tooltiptext">Tooltip text</span>
		</div>
		<input type="hidden" id="pdfURL" value=<?php echo $_POST['pdfURL'];?>>
		<input type="hidden" id="pdfID" value=<?php echo $_POST['pdfID'];?>>
  
    




  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</div>




<!-- Footer -->
<footer class="text-center">

  <p>Developed by Team ARME</p> 
</footer>



<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Graph filter</h4>
      </div>
      <div class="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
	<script>
		var server="http://127.0.0.1:9999/";
		var cy = cytoscape({
			container: document.getElementById('cy'), 
			style: [ 
				{
				  selector: 'node',
				  style: {
						'background-color': '#FFC0CB',
						'label': 'data(id)', 
						'width': '40',
						'height': '40',
						'text-valign' : 'center',
						'font-size': '8',
						'text-max-width':'35',
						'text-wrap':'ellipsis',
					}
				},

				{
				  selector: 'edge',
				  style: {
					'width': 1,
					'line-color': '#FF6347', 
					'target-arrow-color': '#ccc', //keno dorkar bujhi ni
					'target-arrow-shape': 'triangle' //keno dorkar bujhi ni
				  }
				}
			],
			
		});
		
		function requestPDFData() {
			var xhttp = new XMLHttpRequest();
			var v;
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					
					var x=JSON.parse(this.responseText);
					v = x[0];
				}
			};
			var id=document.getElementById("pdfID").value;
			
			//alert("GIVE ME:"+id);
			xhttp.open("GET", server+"api/bibtex/"+id, false);
			xhttp.send();

			return v;
		}
		
		function requestReferenceData() {
			var xhttp = new XMLHttpRequest();
			var v;
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					alert("PELAM ref"+this.responseText);
					// return JSON.parse(this.responseText);
					v=JSON.parse(this.responseText);
					//v = x[0];
					//alert("T " +v.title);
					//return v;
				}
			};
			var url=document.getElementById("pdfURL").value;
			
			//alert("GIVE ME:"+id);
			xhttp.open("GET", server+"api/parse/"+url, false);
			xhttp.send();

			return v;
		}
		
		function buildGraph() {
			
			var mainPDF = requestPDFData();
			//alert("HI" + mainPDF);
			//alert("TITLE "+mainPDF.title);
			var reference=requestReferenceData();

			var newNodes=[];
			var newEdges=[];
			
			newNodes.push(
				{ 
					group: "nodes", 
					data: { 
						id: mainPDF.title, 
					}, 
				},
			);
			for(var i=0;i<reference.length;i++){
				var value = reference[i];
				//alert(value);
				//alert(i+" "+value["title"]);
				newNodes.push(
					{ 
						group: "nodes", 
						data: { 
							id: value["title"], 
							Journal: value["journal"],
						}, 
					},
				);
				newEdges.push(
					{ 
						group: "edges", 
						data: { 
							id:i,
							source: mainPDF.title, 
							target: value["title"],
						}, 
					},
				);
			}
			
			cy.add(newNodes);
			cy.add(newEdges);
			
			// on click
			cy.elements().qtip({
				overwrite: false,
				
				content: function(){ return this.id() },
				position: {
					my: 'top center',
					at: 'bottom center'
				},
				style: {
					tip: {
						width: 16,
						height: 8
					}
				}		
			});
			// outside node on click
			cy.qtip({
				content: 'kono node nai mama ekhane',
				position: {
					my: 'top center',
					at: 'bottom center'
				},
				show: {
					cyBgOnly: true
				},
				style: {

					tip: {
						width: 16,
						height: 8
					}
				}
			});

			// hover
			cy.elements().qtip({
				overwrite: false,
				show: {
					event: 'mouseover'
				},
				hide: {
					event: 'mouseout'
				},
				content: function(){ return this.id() },
				position: {
					my: 'top center',
					at: 'bottom center'
				},
				style: {
					classes: 'qtip-bootstrap',
					tip: {
						width: 16,
						height: 8
					}
				}		
			});

			cy.nodes().style({"text-max-width":'35'});
			cy.nodes().style({"text-wrap": "ellipsis"});
			
			var layout = cy.layout({ name: 'concentric' }); //concentric, cose, circle

			layout.run();
			/*cy.viewport({
				zoom:2,
				pan: { x: 10, y: 10 }
			});*/
		}
		</script>

</body>
</html>
