class Portal{

	p1: any;
	p2: any;
	points: any[];
	radius: number;
	constructor(p1,p2){
		this.p1 = p1;
		this.p2 = p2;
		this.points = [this.p1,this.p2];
		this.radius = 30;
	}

	render(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.arc(this.p1.x,this.p1.y,this.radius,0,Math.PI*2);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(this.p2.x,this.p2.y,this.radius,0,Math.PI*2);
		ctx.stroke();
		ctx.restore();
	}

	collideSegment(seg, p){
			var dist = Math.sqrt(Math.pow(seg.getBottom().x - p.x, 2) + Math.pow(seg.getBottom().y - p.y, 2));
			return (dist - this.radius -seg.length/2 < 0);
	}

	update(segments){
		for (var j = 0; j < this.points.length;j++){
			for (var i = 0; i < segments.length;i++){
				var seg = segments[i],
					nxt = segments[i + 1],
					prev = segments[i - 1];

				if (seg.parent) continue;

				if(this.collideSegment(seg,this.points[j])){
					var exit = this.points[j == 0 ? 1 : 0];
						seg.x = exit.x + Math.cos(seg.angle) * this.radius+2;
						seg.y = exit.y + Math.sin(seg.angle) * this.radius+2;
					if(nxt){
						nxt.parent = undefined;
					}
					if(prev && i!=0){
						seg.parent = prev;
					}
				}
			}
		}
	}
}