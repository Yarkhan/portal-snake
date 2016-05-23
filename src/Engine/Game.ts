/// <reference path="Keyboard.ts" />
/// <reference path="Assets.ts" />

namespace Engine {
	export class Game {

		running: number;
		currentGameState: GameState;
		canvas: HTMLCanvasElement;
		context: CanvasRenderingContext2D;
		now: number;
		last: number;
		dt: number;
		constructor(canvas: HTMLCanvasElement, gameState: GameState) {
			this.running = 0;
			this.canvas = canvas;
			this.context = canvas.getContext('2d');
			this.last = 0;
			this.switchGameState(gameState);
			Mouse.init(this.canvas);
		}

		start() {
			if (!this.running) {
				this.running = window.requestAnimationFrame(this.loop);
			}
		}

		stop() {
			if (this.running) {
				window.cancelAnimationFrame(this.running);
			}
		}
		switchGameState(gameState: GameState) {
			this.currentGameState = gameState;
			gameState.game = this;
		}

		loop = () => {
			this.running = window.requestAnimationFrame(this.loop);
			this.now = new Date().getTime();
			this.dt = this.now - this.last;
			this.last = this.now;
			this.currentGameState.update();
			this.currentGameState.render();
		}

		clear() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}

		static wrapNum(num, value) {
			if (num > 0) {
				return num % value;
			}
			if (num < 0) {
				return ((num + 1) % value + value - 1);
			}
		}
	}

}