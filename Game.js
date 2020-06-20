const GameState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    FLAT:  Symbol("flat"),
    WAIT: Symbol("wait"),
    MANSION: Symbol("mansion"),
    BUTLER: Symbol("butler"),
    TOAST: Symbol("toast")
});

module.exports = class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
    }
    
    makeAMove(sInput)
    {
        let sReply = "";
        switch(this.stateCur){
            case GameState.WELCOMING:
                sReply = "It is a dark and rainy night. Bang! You have a flat tire. Too bad you don't have a spare. Do you WAIT or GO to the spooky mansion for help?";
                this.stateCur = GameState.FLAT;
                break;
            case GameState.FLAT:
                if(sInput.toLowerCase().match("wait")){
                    sReply = "The road is deserted. After 1 hour there is still no help. Do you stay and WAIT or do you GO to the house?";
                }else{
                    sReply ="On the door is a large knocker. Do you KNOCK or RUN back to your car to wait?";
                    this.stateCur = GameState.MANSION;
                }
                break;
            case GameState.MANSION:
                if(sInput.toLowerCase().match("knock")){
                    sReply = "The door opens and you are greeted by a hunch-back butler. He asks you to come in. Do you GO in or RUN back to the car?"
                    this.stateCur = GameState.BUTLER;
                }else{
                    sReply = "The road is deserted. After 1 hour there is still no help. Do you stay and WAIT or do you go to the house?";
                    this.stateCur = GameState.FLAT;

                }
                break;
            case GameState.BUTLER:
                if(sInput.toLowerCase().match("run")){
                    sReply = "The road is deserted. After 1 hour there is still no help. Do you stay and WAIT or do you GO to the house?";
                    this.stateCur = GameState.FLAT;

                }else{
                    sReply = "You seem to have walked in to a party. The host offers you some toast. Do you take the TOAST or ask to call a tow truck?";
                    this.stateCur = GameState.TOAST;
    
                }
                break;
            case GameState.TOAST:
                if(sInput.toLowerCase().match("toast")){
                    sReply = "you enter a new world of adventure ... would you like to CONTINUE?";
                    this.stateCur = GameState.CONTINUE;
                }else{
                    sReply = "the phone lines are down ... Would you like some toast perhaps?";
                    this.stateCur = GameState.BUTLER;
                }
                // first statement
                break;
            case GameState.CONTINUE:
                if(sInput.toLowerCase().match("leave")){
                    sReply = "a gnome appears in front of you, as your entire surroundings dissapper... Do you speak to the gnome or LEAVE?";
                    this.stateCur = GameState.SPEAK;
                }
                else{
                    sReply = "the gnome dissappears and you land back at the party... would you like some toast perhaps?";
                    this.stateCur = GameState.SPEAK;
                }
                // second statement 
                break;
            case GameState.SPEAK:
                if(sInput.toLowerCase().match("speak")){
                    sReply = "The gnome quietly says 'I've lost track of time. Can you help me stop the clocks?' Do you help the gnome stop the CLOCKS?";
                    this.stateCur = GameState.CLOCKS;
                }
                else{
                    sReply = "The gnome checks his watch, only to disappear once more. You arrive back at the party. Do you run or go find the host?";
                    this.stateCur = GameState.WELCOMING;
                }
        }
        return([sReply]);
    }
}