class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background(255, 204, 0);
    fill(0);
    //write code to show a heading for showing the result of Quiz
    textSize(30)
    text("Result of the Quiz", 340, 50);
    text("------", 320, 65);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    if (allContestants !== undefined){
      debugger;
      var display_Answers = 230;
      fill("blue");
      textSize(30);
      text("*Note: Contestants who answer correct are highlighted in green.");
    }
    //write code to add a note here
    
    //write code to highlight contest who answered correctly
    for (var plr in allContestants){
      debugger;
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer) {
        fill("green");
      } else {
        fill("red");
        display_Answers+=30;
        textSize(20);
        text(allContestants[plr].name+":"+allContestants[plr].answer, 250, display_Answers);
      }
    }
    
  }

}
