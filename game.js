

let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix Subs","50% Off","Amazon Voucher","2 Extra Spin", "CB T-shirt","CB Book"]
    // prize_names : ["CB Book","3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix Subs","50% Off","Amazon Voucher","2 Extra Spin","CB Tshirt"]

}

let config={
    type: Phaser.CANVAS,
    width: 1500,
    height: 1500,
    backgroundColor:0xffff00, //set background color
    scene: {
        preload : preloadFunction,
        create : createFunction,
        update : updateFunction

    }

}

let game=new Phaser.Game(config);

function preloadFunction(){
    console.log("preload")
    console.log(this)
    //this refers to scene object
    //load all images you want
    this.load.image("background",'images/back.jpg')
    this.load.image("wheel",'images/wheel.png')
    this.load.image("stand",'images/stand.png')
    this.load.image("pin",'images/pin.png')


}

function createFunction(){
    console.log("create")
    let w=game.config.width;
    let h=game.config.height;

    //displaying background image
    let background=this.add.sprite(w/2,h/2,'background')
    background.setScale(0.45)
    // background.depth=0;
   
    //wheel image and making wheel as a part of scene obj
    this.wheel=this.add.sprite(w/2,h/2,"wheel")
    this.wheel.setScale(0.45)//scaling wheel image
    
    


    //pin image
    let pin=this.add.sprite(w/2,h/2-444,"pin")
    pin.setScale(0.45)

    //stand image
    let stand=this.add.sprite(w/2,h/2+469,"stand")
    stand.setScale(0.45)
    // stand.depth=1;

    //adding text
    font_style={
        font:"Bold 50px Arial",
        color:"red",
        align:"center"
    }
    this.game_text=this.add.text(10,20,"Welcome! Tap/Click the wheel",font_style)
    // this.game_text=this.add.text(10,50,"Welcome to Spin and Win Game!",font_style)


    //adding event listner
    //input is event listner in scene object
    this.input.on("pointerdown",spinwheel,this)


}

function updateFunction(){
    console.log("update")
    // this.wheel.angle+=1;//rotating wheel angle by 1 deg
    //alpha property is used to cange the transperency if img
    // this.wheel.alpha -=0.01;


}    

function spinwheel(){
    // console.log("You clicked the mouse")
    // this.game_text.setText("You clicked the mouse!");
    
    let rounds=Phaser.Math.Between(2,5);
    let deg=Phaser.Math.Between(0,11)*30;
    
    let total_angle=rounds*360 + deg;
    console.log(total_angle,rounds)

    idx=11-deg/30;
    
    
    console.log(deg,idx)

    // console.log(rounds);
    tween = this.tweens.add({
        targets:this.wheel,
        angle:total_angle,
        duration:6000,
        ease:"Cubic.easeOut",
        callbackScope:this,
        onComplete:function(){
            if(idx==2){
                this.game_text.setText("Sorry hard luck!")

            }
            else{
                this.game_text.setText("You won "+prizes_config.prize_names[idx])
            }
        }

    });
}