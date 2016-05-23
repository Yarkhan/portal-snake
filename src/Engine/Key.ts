namespace Engine {
	export class Key {

		pressed: boolean;
		code: number;
		constructor(code, pressed = false) {
			this.code = code;
			this.pressed = pressed;
		}
	}
}