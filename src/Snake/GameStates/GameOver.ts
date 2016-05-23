namespace Snake.GameStates{
	export class GameOver extends Engine.GameState{
		counter: number;
		lastX: number;
		lastY: number;
		constructor(){
			super();
			this.counter = 0;
			this.lastX = Mouse.x;
			this.lastY = Mouse.y;
		}
		update(){
		}
		render(){
			if(Mouse.mouseDown){
				this.game.context.beginPath();
				this.game.context.moveTo(this.lastX, this.lastY);
				this.game.context.lineTo(Mouse.x, Mouse.y);
				this.game.context.stroke();
				this.game.context.closePath();
				this.lastX = Mouse.x;
				this.lastY = Mouse.y;
			}
		}
	}
}
