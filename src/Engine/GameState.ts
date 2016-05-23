namespace Engine{
	export abstract class GameState{

		game: Game;
		abstract update(): void;
		abstract render(): void;

	}
}