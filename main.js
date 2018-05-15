class Game {
    constructor (canvas) {
        this.canvas = canvas 
        this.screen = this.canvas.getContext('2d');
        this.player = new Player(this)
} 
    draw() {  
        this.screen.fillStyle = 'black';
        this.screen.fillRect(0,0,500,500);
        this.screen.strokeStyle = 'white'
        this.screen.lineWidth = 10;
        this.screen.strokeRect(150,150,200,200)
        this.player.draw()


    }
    tick() { 
        this.update()
        this.draw() 
        requestAnimationFrame(this.tick.bind(this))

    }
    update() {
        this.player.update()
    }
}

class Player {
    constructor (game) {
        this.game = game
        this.keyboarder = new Keyboarder()
        this.intiallocation = {x:230,y:230}
    }
    draw() {
        this.game.screen.fillStyle = 'red';
        this.game.screen.fillRect(this.intiallocation.x,this.intiallocation.y,40,40)
        
    }
    update() {
        if (this.keyboarder.isDown(Keyboarder.KEYS.DOWN)) {
            this.intiallocation.y += 3
        } else if (this.keyboarder.isDown(Keyboarder.KEYS.UP)) {
            this.intiallocation.y += -3
        } else if (this.keyboarder.isDown(Keyboarder.KEYS.LEFT)) {
            this.intiallocation.x += -3
        } else if (this.keyboarder.isDown(Keyboarder.KEYS.RIGHT)) {
            this.intiallocation.x += 3
        }
    }
}

class Keyboarder {
    constructor () {
        this.keyState = {}
            
        window.addEventListener('keydown', function(e) {
            this.keyState[e.keyCode] = true
            }.bind(this))
            
        window.addEventListener('keyup', function(e) {
            this.keyState[e.keyCode] = false
            }.bind(this))
    }
    isDown (keyCode) {
    return this.keyState[keyCode] === true
    }
        
    on (keyCode, callback) {
    window.addEventListener('keydown', function (e) {
    if (e.keyCode === keyCode) {
        callback()
    }
    })
}                      
}

Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 };


window.addEventListener('load', function() {
    var start = new Game(document.getElementById('gamearea'))
    start.tick()
})
