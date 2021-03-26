<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="semantic/semantic.min.css">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="semantic/semantic.min.js"></script>
    <title>Alarme</title>
</head>
<body id="demo">
<?php
require "conection.php";
 echo "BORA!!!";
?>
    <div id="tempo" style="font-size: 300px; height: 300px; padding-top: 150px;">
        <span > 00 </span>
    </div>

    <div id="lista">

    </div>

    <div>
    <hr>
    <button id="botao" class="ui primary button">Add</button>

    <br>
    <br>

    <audio id="player" controls autoplay style="display: none;">
        <source src="2.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>

      <button class="ui labeled icon button" onclick="document.getElementById('player').pause()">
        <i class="pause icon"></i>
        Pause
      </button>

      
    
    </div>

      <br>
      <br>

   <script src="script.js"></script>
</body>
</html>