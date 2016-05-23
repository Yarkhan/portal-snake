/// <reference path="../Entities/Segment.ts" />
/// <reference path="../Entities/Portal.ts" />
/// <reference path="../../Engine/Assets.ts" />


class TestState extends Engine.GameState{

	snake: Snake;
	portal: Portal;
	constructor(){
		super();
		this.snake = new Snake(100, 100, 10, Engine.Assets.images["head"],Engine.Assets.images["segment"]);
		this.snake.keyboard = new Engine.Keyboard;
		this.portal = new Portal(
			{x:300,y:60},
			{x:160,y:300}
		);
	}
	public render(){
		this.game.clear();
		this.game.context.save();
		this.snake.render(this.game.context);
		this.portal.render(this.game.context);

	}
	public update(){
		this.snake.update();
		this.portal.update(this.snake.segments);
	}
}