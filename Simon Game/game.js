var buttonsColour = ["red", "blue", "green", "yellow"];
var gamePatteren = [];
var userClickedPattern = [];

var gamestart = false;
var level = 0; 

$(document).keypress(function(){
 if(!gamestart){
     $("#level-title").text("level " + level);
     nextSequence();
     gamestart = true;
 }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
         userClickedPattern.push(userChosenColour);
         playSound(userChosenColour);
         animatePress(userChosenColour);

         checkAnswer(userClickedPattern.length-1);
 })  

 function checkAnswer(currentLevel){
    if(gamePatteren[currentLevel] === userClickedPattern[currentLevel]){
        if( userClickedPattern.length === gamePatteren.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else{
        playSound("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart")
       setTimeout(function(){
           $("body").removeClass("game-over");
       }, 200);
       startOver();
    }
}
 
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomeNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonsColour[randomeNumber];
    gamePatteren.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);

}
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100);
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
function startOver(){
    level = 0;
    gamestart = false;
    gamePatteren = []
}