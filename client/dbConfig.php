<?php

$mysqli = mysqli_connect("localhost","root","rafed","showme");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
 mysqli_set_charset($mysqli,"utf8"); 
?>