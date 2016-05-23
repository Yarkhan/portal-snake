/// <reference path="../../Engine/Keyboard.ts" />
/// <reference path="../../Engine/NullKeyboard.ts" />

class Snake{

		x: number;
		y: number;
		segments: Segment[];
		collidingSelf: boolean;
		keyboard: Engine.NullKeyboard;
		head: Segment;
		image: HTMLImageElement;	
		segmentImg: HTMLImageElement;
		constructor(x,y,segments,img:HTMLImageElement,segment_img:HTMLImageElement){
			this.x = x;
			this.y = y;
			this.image = img;
			this.segmentImg = segment_img;
			this.keyboard = new Engine.Keyboard;
			this.segments = [];
			this.add_segments(segments);
			this.head = this.segments[0];
		}

		render(ctx:CanvasRenderingContext2D){
			for (var segment of this.segments){
				segment.render(ctx);
			}
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(this.head.x, this.head.y);
			// ctx.lineTo(this.segments[0].getBottom().x, this.segments[0].getBottom().y);
			ctx.translate(this.head.getBottom().x, this.head.getBottom().y);
			ctx.rotate(this.segments[0].angle+Math.PI/2);
			ctx.drawImage(this.image, -this.head.length/2, -this.head.length/2, this.head.length,this.head.length*1.4);
			// ctx.arc(0, 0, 12, 0, Math.PI * 2);
			// ctx.stroke();
			ctx.restore();
		}
		add_segments(n:number){
			for (var i = 0; i < n; i++){
				var segment = new Segment(this.x-i*20,this.y,1,undefined,this.segmentImg);
				if(this.segments.length > 0){
					segment.parent = this.segments[this.segments.length - 1];
				}
				this.segments.push(segment);
			}
		}
		update(){
			if (this.keyboard.pressed("a")) this.segments[0].angle -= .1;
			if (this.keyboard.pressed("d")) this.segments[0].angle += .1;
			if(Engine.Mouse.clickLeft){
				this.segments[0].x = Engine.Mouse.x;
				this.segments[0].y = Engine.Mouse.y;
			}
			for(var seg of this.segments){
				seg.update();
			}
		}
	}

