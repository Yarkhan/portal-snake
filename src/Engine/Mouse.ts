namespace Engine{
	export class Mouse {

		static x: number;
		static y: number;
		static clickLeft: boolean;
		static mouseUp: boolean;
		static mouseDown: boolean;
		static ups: number;
		static downs: number;

		static init(canvas) {
			this.x = 0;
			this.y = 0;
			this.mouseUp = false;
			this.mouseDown = false;
			this.clickLeft = false;
			this.ups = 0;
			this.downs = 0;
			canvas.addEventListener('mousemove', (e) => {
				var rect = canvas.getBoundingClientRect();
				this.x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
				this.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
			});
			canvas.addEventListener('mousedown', (e) => {
				this.clickLeft = true;
				this.mouseDown = true;
				this.downs++;
				this.mouseUp = false;
				console.log(e);
			});
			canvas.addEventListener('mouseup', (e) => {
				this.clickLeft = false;
				this.mouseDown = false;
				this.mouseUp = true;
				setTimeout(() => {
					this.ups++;
					this.mouseUp = false;
				}, 20);
			});
		}
		static update() {
			if(this.mouseUp && !this.mouseDown){
				this.mouseUp == false;
			}
		}
	}


}