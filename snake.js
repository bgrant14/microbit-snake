let difficulty: number = 500
class snake {
    playerLoc: number[] = []
    tail: game.LedSprite[] = []
    food: game.LedSprite
    tailLength: number
    foodX: number
    foodY: number
    constructor() {
        this.playerLoc[0, 0] = Math.randomRange(0, 4)
        this.playerLoc[0, 1] = Math.randomRange(0, 4)
        this.playerLoc[1, 0] = this.playerLoc[0, 0] - 1
        this.playerLoc[1, 1] = this.playerLoc[0, 1]
        this.tailLength = 1
        this.tail[0] = game.createSprite(this.playerLoc[0, 0], this.playerLoc[0, 1])
        this.tail[1] = game.createSprite(this.playerLoc[1, 0], this.playerLoc[1, 1])
        this.newFood()
    }
    newFood() {
        this.foodX = Math.randomRange(0, 4)
        this.foodY = Math.randomRange(0, 4)
        for (let i: number = 0; i <= this.tailLength; i++) {
            if (this.foodX == this.playerLoc[i, 0] && this.foodY == this.playerLoc[i, 1]) this.newFood()
        }
        this.food = game.createSprite(this.foodX, this.foodY)
    }
    edge(): boolean {
        if (this.tail[0].get(LedSpriteProperty.X) == 4 && this.tail[0].get(LedSpriteProperty.Direction) == 90) {
            this.tail[0].setX(0)
            return true
        } else if (this.tail[0].get(LedSpriteProperty.X) == 0 && this.tail[0].get(LedSpriteProperty.Direction) == -90) {
            this.tail[0].setX(4)
            return true
        } else if (this.tail[0].get(LedSpriteProperty.Y) == 4 && this.tail[0].get(LedSpriteProperty.Direction) == 180) {
            this.tail[0].setY(0)
            return true
        } else if (this.tail[0].get(LedSpriteProperty.Y) == 0 && this.tail[0].get(LedSpriteProperty.Direction) == 0) {
            this.tail[0].setY(4)
            return true
        }
        return false
    }
    slither() {
        //Checks for edge of screen
        if (this.edge()) {
            basic.pause(difficulty)
        } else {
            this.tail[0].move(1)
            basic.pause(difficulty)
        }
        //updates coordinates of player in array
        this.playerLoc[0, 0] = this.tail[0].get(LedSpriteProperty.X)
        this.playerLoc[0, 1] = this.tail[0].get(LedSpriteProperty.Y)
        for (let i: number = 1; i <= this.tailLength; i++) {
            //this.playerLoc[i, 0] = this.playerLoc[i - 1, 0]
            //this.playerLoc[i, 1] = this.playerLoc[i - 1, 1]
            this.tail[i].goTo(this.playerLoc[i-1, 0], this.playerLoc[i-1, 1])
        }
        if (this.playerLoc[0, 0] == this.foodX && this.playerLoc[0, 1] == this.foodY) {
            this.tailLength++
            this.playerLoc[this.tailLength, 0] = this.playerLoc[this.tailLength - 1, 0]
            this.playerLoc[this.tailLength, 1] = this.playerLoc[this.tailLength - 1, 1]
            this.tail[this.tailLength] = game.createSprite(this.playerLoc[this.tailLength, 0], this.playerLoc[this.tailLength, 1])
            this.food.delete()
            this.newFood()
        }
    }
    turnLeft() {
        this.tail[0].changeDirectionBy(-90)
    }
    turnRight() {
        this.tail[0].changeDirectionBy(90)
    }
}
let sGame = new snake()

input.onButtonPressed(Button.A, function () {
    sGame.turnLeft()
})

input.onButtonPressed(Button.B, function () {
    sGame.turnRight()
})

basic.forever(function () {
    sGame.slither()
})
