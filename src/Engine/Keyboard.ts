/// <reference path="Key.ts" />
/// <reference path="NullKeyboard.ts" />

namespace Engine {
	export class Keyboard extends NullKeyboard {


		keys = {
			"a": new Key(65),
			"s": new Key(83),
			"d": new Key(68),
			"w": new Key(87)
		};

		constructor() {
			super();
			window.addEventListener("keydown", (e) => {
				var key = String.fromCharCode(e.which).toLowerCase();
				this.press(key);
			});
			window.addEventListener("keyup", (e) => {
				var key = String.fromCharCode(e.which).toLowerCase();
				this.unpress(key);
			});

		}
		pressed(key: string) {
			return this.keys[key].pressed;
		}
		press(key: string) {
			this.keys[key].pressed = true;
		}
		unpress(key: string) {
			this.keys[key].pressed = false;
		}

	}
}