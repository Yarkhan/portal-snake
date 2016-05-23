namespace Engine {
	export class Assets {

		static assets: any[];
		static images: any[];
		static names: any[];
		static assetCount: number;
		static callback: any;
		static init(callback = undefined) {
			this.callback = callback;
			this.assetCount = 0;
			this.loadImages();
		}
		static onloadImg(e) {
			Assets.images[e.target.name] = e.target;
			Assets.assetCount++;
			if (Assets.images.length == Assets.assetCount) {
				if (Assets.callback) Assets.callback();
			}
		}
		static loadImages() {
			for (var image of this.images) {
				var img = document.createElement('img');
				img.src = image.src;
				img.name = image.name;
				img.addEventListener('load', this.onloadImg);
			}
		}
	}
}