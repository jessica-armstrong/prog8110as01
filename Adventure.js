
const GameState = Object.freeze({
    WELCOMING:      Symbol("welcoming"),
    STARTPROMPT:    Symbol("startprompt"),
    START:          Symbol("start"),
    QUIT:           Symbol("quit"),
    SPEAK:          Symbol("speak"),
    HELP:           Symbol("help"),
    CALL:           Symbol("call"),
    QUEST:          Symbol("accept"),
    CONTINUE:       Symbol("continue"),
    DIRECTION:      Symbol("forward"),
    FAIL:           Symbol("back"),
    FOLLOW:         Symbol("follow"),
    WINNER:         Symbol("stop")

})

module.exports = class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING; // this constructs a new game and sets the current value to zero
    }

    makeAMove(sInput){ // when the user enters some input, the makeAMove method is called and carrys the input value (sInput)
        // then this would returm a array of strings, shown below as output from the Game
        let sReply = "";
        switch(this.stateCur){
            case GameState.WELCOMING:
                sReply = 
                        "Welcome to your adventure.\n \n" +
                        "You will make a series of choices to make your way through the game.\n \n" +
                        "Type START to begin!";
                this.stateCur = GameState.START;
                break;
            case GameState.START: // when the user types start to begin the game or enters any text after the welcoming
                if(sInput.toLowerCase().match("start")){
                    sReply = 
                            "A gnome appears infront of you. Do you want to speak to him?\n\n" + 
                            "Type SPEAK to speak with the gnome.";
                    this.stateCur = GameState.SPEAK;
                }
                else{
                    sReply = "Please type START to begin. You can end the game anytime by typing QUIT";
                }
                break;
            case GameState.QUIT: // if the user decides to end the game
                if(sInput.toLowerCase().match("quit")){
                    sReply = "Game Over";
                    this.StateCur = GameState.WELCOMING;
                }
                break;
            case GameState.SPEAK: // when the user chooses to speak to the gnome
                if(sInput.toLowerCase().match("speak")){
                    sReply = 
                            "The gnome quietly says 'I've lost track of time. Can you help me stop the clocks?'\n\n" +
                            "Do you HELP the gnome stop the clocks?";
                    this.stateCur = GameState.HELP;
                }
                else{
                    sReply = 
                            "The gnome disappears after a few moments of silence.\n\n"+
                            "Do you try to CALL the gnome?";
                    this.stateCur = GameState.CALL;
                }
                break;
            case GameState.HELP: // when the user agrees to help the gnome
                if(sInput.toLowerCase().match("help")){
                    sReply = 
                            "The gnome offers you a pocket watch to guide you, and asks that you find all his clocks.\n\n"+
                            "Do you ACCEPT the quest?";
                    this.stateCur = GameState.QUEST;
                }
                else{
                    sReply = 
                            "The gnome looks very sad and turns his back to you.\n"+
                            "After a few moments of silence, the gnome disappears.\n\n"+
                            "Do you try to CALL the gnome back?";
                    this.stateCur = GameState.CALL;
                }
                break;
            case GameState.CALL: // when the user agrees to call the gnome back
                if(sInput.toLowerCase().match("call")){
                    sReply = "The gnome appears infront of you. Do you speak to the gnome?";
                    this.stateCur = GameState.SPEAK;
                }
                else{
                    sReply = 
                            "The gnome looks very sad and turns his back to you.\n"+
                            "After a few moments of silence, the gnome disappears.\n\n"+
                            "Do you try to CALL the gnome back?";
                    this.stateCur = GameState.CALL;
                }
                break;
            case GameState.QUEST: // this is when the user agrees to accept the gnomes quest
                if(sInput.toLowerCase().match("accept")){
                    sReply = 
                            "You take the pocket watch in your hand and notice the clock is not ticking.\n"+
                            "Do you ask any questions or do you CONTINUE on the quest with the stopped clock?";
                    this.stateCur = GameState.CONTINUE;
                }
                else{
                    sReply = 
                            "The gnome disappears when you try to speak to him this time\n\n"+
                            "Do you call back the gnome or would you like to quit?"
                    this.stateCur = GameState.CALL;
                }
                break;
            case GameState.CONTINUE: 
                if(sInput.toLowerCase().match("continue")){
                    sReply = 
                            "You hear a clock ticking, but it's not the one in your pocket\n\n"+
                            "Do you FOLLOW the sound of the clock, or keep going on your way?";
                    this.stateCur = GameState.FOLLOW;
                }
                else{
                    sReply = "You have discovered nothing. Would you like to go FORWARDS or BACKWARDS?";
                    this.stateCur = GameState.DIRECTION;
                }
                break;
            case GameState.DIRECTION:
                if(sInput.toLowerCase().match("forward")){
                    sReply = "You chose to go forward. It is now year 3020.";
                    this.stateCur = GameState.FORWARD;
                }
                else if(sInput.toLowerCase().match("back")){
                    sReply = 
                            "You hear a clock ticking, but it's not the one in your pocket\n"+
                            "Do you FOLLOW the sound of the clock, or keep going on your way?";
                    this.stateCur = GameState.FOLLOW;
                }
                else{
                    sReply = 
                            "You have failed the quest.\n\n"+
                            "Would you like to try to CALL the gnome back or QUIT the game?";
                    this.stateCur = GameState.FAIL;
                }
                break;
            case GameState.FAIL:
                if(sInput.toLowerCase().match("call")){
                    sReply = "The gnome appears infront of you. Do you speak to the gnome?";
                    this.stateCur = GameState.SPEAK;
                }
                else if(sInput.toLowerCase().match("quit")){
                    sReply = "Game Over";
                    this.StateCur = GameState.WELCOMING;
                }
                break;
            case GameState.FOLLOW:
                if(sInput.toLowerCase().match("follow")){
                    sReply = "You found a clock stuck at 1 O'Clock! Do you STOP the clock?";
                    this.StateCur = GameState.ONEOCLOCK;
                }
                else{
                    sReply = 
                            "You have failed the quest.\n\n"+
                            "Would you like to try to CALL the gnome back or QUIT the game?";
                    this.stateCur = GameState.FAIL;
                }
                break;
            case GameState.ONEOCLOCK:
                if(sInput.toLowerCase().match("stop")){
                    sReply ="You have stopped the clock! CONGRATULATIONS!";
                    this.stateCur = GameState.WINNER;
                }
                else{
                    sReply = 
                    "You have failed the quest.\n\n"+
                    "Would you like to try to CALL the gnome back or QUIT the game?";
                    this.stateCur = GameState.FAIL;
                }
                break;
        }
        return([sReply]);
    }
}