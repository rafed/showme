<?php
session_start();

//Include Google client library 
include_once 'src/Google_Client.php';
include_once 'src/contrib/Google_Oauth2Service.php';

/*
 * Configuration and setup Google API
 */
$clientId = '297850790878-enpulgpkqli184kc87g5l0uikrqo0n6o.apps.googleusercontent.com';
$clientSecret = 'qW-ArWP3t6A0yyYnu4rJNoT2';
$redirectURL = 'http://localhost/showMe/';

//Call Google API
$gClient = new Google_Client();
$gClient->setApplicationName('showMe');
$gClient->setClientId($clientId);
$gClient->setClientSecret($clientSecret);
$gClient->setRedirectUri($redirectURL);

$google_oauthV2 = new Google_Oauth2Service($gClient);
?>