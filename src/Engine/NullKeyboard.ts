/// <reference path="Key.ts" />

namespace Engine {
	export class NullKeyboard {

		keys = {
			"a": new Key(65),
			"s": new Key(83),
			"d": new Key(68),
			"w": new Key(87)
		};
		pressed(key: string) {
			return this.keys[key].pressed;
		}
		press(key: string) {
			this.keys[key].pressed = true;
		}
		unpress(key: string) {
			this.keys[key].pressed = false;
		}
		init() {

		}
	}
}