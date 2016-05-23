class Segment {

	x: number;
	y: number;
	angle: number;
	parent: Segment;
	length: number;
	image: HTMLImageElement;
	constructor(x, y, angle = 0, parent, image:HTMLImageElement) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.parent = parent;
		this.length = 15;
		this.image = image;
	}
	update() {
		if(this.parent){
			this.angle = Math.atan2(this.parent.y - this.y, this.parent.x - this.x);
			this.x = this.parent.x - Math.cos(this.angle) * this.length;
			this.y = this.parent.y - Math.sin(this.angle) * this.length;
		}
		if(!this.parent){
			this.x += Math.cos(this.angle) * 2;
			this.y += Math.sin(this.angle) * 2;
		}
	}
	getTop(){
		return {
			x: this.x,
			y: this.y
		}
	}
	getBottom(){
		return {
			x: this.x + Math.cos(this.angle) * this.length,
			y: this.y + Math.sin(this.angle) * this.length
		}
	}
	render(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		// ctx.lineTo(this.getBottom().x, this.getBottom().y);
		ctx.translate(this.getBottom().x, this.getBottom().y);
		ctx.rotate(this.angle+Math.PI/2);
		ctx.drawImage(this.image, -this.length/2, -this.length/2, this.length,this.length*1.4);
		// ctx.arc(0, 0, this.length/3, 0, Math.PI * 2);
		// ctx.stroke();
		ctx.restore();
	}
}
