
var level=0;
var cnt=1;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;

  $(document).keypress(function(){
    if(cnt==1){
      nextSequence();
      cnt=0;
    }
  });


function startOver(){
  level=0;
  cnt=1;
  gamePattern = [];
  userClickedPattern = [];
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(event){
  var userChosenColour = (event.target.id);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  if(userClickedPattern[userClickedPattern.length-1]!=gamePattern[userClickedPattern.length-1]){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
});

function checkAnswer(level){

    if(gamePattern[level]==userClickedPattern[level])
      {
        if(userClickedPattern.length===gamePattern.length){
          setTimeout(function(){
            nextSequence();
          }, 1000);
        }
      }
      else{

      }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
