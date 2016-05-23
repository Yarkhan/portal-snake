var Engine;
(function (Engine) {
    var Assets = (function () {
        function Assets() {
        }
        Assets.init = function (callback) {
            if (callback === void 0) { callback = undefined; }
            this.callback = callback;
            this.assetCount = 0;
            this.loadImages();
        };
        Assets.onloadImg = function (e) {
            Assets.images[e.target.name] = e.target;
            Assets.assetCount++;
            if (Assets.images.length == Assets.assetCount) {
                if (Assets.callback)
                    Assets.callback();
            }
        };
        Assets.loadImages = function () {
            for (var _i = 0, _a = this.images; _i < _a.length; _i++) {
                var image = _a[_i];
                var img = document.createElement('img');
                img.src = image.src;
                img.name = image.name;
                img.addEventListener('load', this.onloadImg);
            }
        };
        return Assets;
    })();
    Engine.Assets = Assets;
})(Engine || (Engine = {}));
var Engine;
(function (Engine) {
    var Key = (function () {
        function Key(code, pressed) {
            if (pressed === void 0) { pressed = false; }
            this.code = code;
            this.pressed = pressed;
        }
        return Key;
    })();
    Engine.Key = Key;
})(Engine || (Engine = {}));
/// <reference path="Key.ts" />
var Engine;
(function (Engine) {
    var NullKeyboard = (function () {
        function NullKeyboard() {
            this.keys = {
                "a": new Engine.Key(65),
                "s": new Engine.Key(83),
                "d": new Engine.Key(68),
                "w": new Engine.Key(87)
            };
        }
        NullKeyboard.prototype.pressed = function (key) {
            return this.keys[key].pressed;
        };
        NullKeyboard.prototype.press = function (key) {
            this.keys[key].pressed = true;
        };
        NullKeyboard.prototype.unpress = function (key) {
            this.keys[key].pressed = false;
        };
        NullKeyboard.prototype.init = function () {
        };
        return NullKeyboard;
    })();
    Engine.NullKeyboard = NullKeyboard;
})(Engine || (Engine = {}));
/// <reference path="Key.ts" />
/// <reference path="NullKeyboard.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Engine;
(function (Engine) {
    var Keyboard = (function (_super) {
        __extends(Keyboard, _super);
        function Keyboard() {
            var _this = this;
            _super.call(this);
            this.keys = {
                "a": new Engine.Key(65),
                "s": new Engine.Key(83),
                "d": new Engine.Key(68),
                "w": new Engine.Key(87)
            };
            window.addEventListener("keydown", function (e) {
                var key = String.fromCharCode(e.which).toLowerCase();
                _this.press(key);
            });
            window.addEventListener("keyup", function (e) {
                var key = String.fromCharCode(e.which).toLowerCase();
                _this.unpress(key);
            });
        }
        Keyboard.prototype.pressed = function (key) {
            return this.keys[key].pressed;
        };
        Keyboard.prototype.press = function (key) {
            this.keys[key].pressed = true;
        };
        Keyboard.prototype.unpress = function (key) {
            this.keys[key].pressed = false;
        };
        return Keyboard;
    })(Engine.NullKeyboard);
    Engine.Keyboard = Keyboard;
})(Engine || (Engine = {}));
/// <reference path="Keyboard.ts" />
/// <reference path="Assets.ts" />
var Engine;
(function (Engine) {
    var Game = (function () {
        function Game(canvas, gameState) {
            var _this = this;
            this.loop = function () {
                _this.running = window.requestAnimationFrame(_this.loop);
                _this.now = new Date().getTime();
                _this.dt = _this.now - _this.last;
                _this.last = _this.now;
                _this.currentGameState.update();
                _this.currentGameState.render();
            };
            this.running = 0;
            this.canvas = canvas;
            this.context = canvas.getContext('2d');
            this.last = 0;
            this.switchGameState(gameState);
            Engine.Mouse.init(this.canvas);
        }
        Game.prototype.start = function () {
            if (!this.running) {
                this.running = window.requestAnimationFrame(this.loop);
            }
        };
        Game.prototype.stop = function () {
            if (this.running) {
                window.cancelAnimationFrame(this.running);
            }
        };
        Game.prototype.switchGameState = function (gameState) {
            this.currentGameState = gameState;
            gameState.game = this;
        };
        Game.prototype.clear = function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        Game.wrapNum = function (num, value) {
            if (num > 0) {
                return num % value;
            }
            if (num < 0) {
                return ((num + 1) % value + value - 1);
            }
        };
        return Game;
    })();
    Engine.Game = Game;
})(Engine || (Engine = {}));
var Engine;
(function (Engine) {
    var GameState = (function () {
        function GameState() {
        }
        return GameState;
    })();
    Engine.GameState = GameState;
})(Engine || (Engine = {}));
var Engine;
(function (Engine) {
    var Mouse = (function () {
        function Mouse() {
        }
        Mouse.init = function (canvas) {
            var _this = this;
            this.x = 0;
            this.y = 0;
            this.mouseUp = false;
            this.mouseDown = false;
            this.clickLeft = false;
            this.ups = 0;
            this.downs = 0;
            canvas.addEventListener('mousemove', function (e) {
                var rect = canvas.getBoundingClientRect();
                _this.x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
                _this.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
            });
            canvas.addEventListener('mousedown', function (e) {
                _this.clickLeft = true;
                _this.mouseDown = true;
                _this.downs++;
                _this.mouseUp = false;
                console.log(e);
            });
            canvas.addEventListener('mouseup', function (e) {
                _this.clickLeft = false;
                _this.mouseDown = false;
                _this.mouseUp = true;
                setTimeout(function () {
                    _this.ups++;
                    _this.mouseUp = false;
                }, 20);
            });
        };
        Mouse.update = function () {
            if (this.mouseUp && !this.mouseDown) {
                this.mouseUp == false;
            }
        };
        return Mouse;
    })();
    Engine.Mouse = Mouse;
})(Engine || (Engine = {}));
var Portal = (function () {
    function Portal(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.points = [this.p1, this.p2];
        this.radius = 30;
    }
    Portal.prototype.render = function (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.p1.x, this.p1.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.p2.x, this.p2.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    };
    Portal.prototype.collideSegment = function (seg, p) {
        var dist = Math.sqrt(Math.pow(seg.getBottom().x - p.x, 2) + Math.pow(seg.getBottom().y - p.y, 2));
        return (dist - this.radius - seg.length / 2 < 0);
    };
    Portal.prototype.update = function (segments) {
        for (var j = 0; j < this.points.length; j++) {
            for (var i = 0; i < segments.length; i++) {
                var seg = segments[i], nxt = segments[i + 1], prev = segments[i - 1];
                if (seg.parent)
                    continue;
                if (this.collideSegment(seg, this.points[j])) {
                    var exit = this.points[j == 0 ? 1 : 0];
                    seg.x = exit.x + Math.cos(seg.angle) * this.radius + 2;
                    seg.y = exit.y + Math.sin(seg.angle) * this.radius + 2;
                    if (nxt) {
                        nxt.parent = undefined;
                    }
                    if (prev && i != 0) {
                        seg.parent = prev;
                    }
                }
            }
        }
    };
    return Portal;
})();
var Segment = (function () {
    function Segment(x, y, angle, parent, image) {
        if (angle === void 0) { angle = 0; }
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.parent = parent;
        this.length = 15;
        this.image = image;
    }
    Segment.prototype.update = function () {
        if (this.parent) {
            this.angle = Math.atan2(this.parent.y - this.y, this.parent.x - this.x);
            this.x = this.parent.x - Math.cos(this.angle) * this.length;
            this.y = this.parent.y - Math.sin(this.angle) * this.length;
        }
        if (!this.parent) {
            this.x += Math.cos(this.angle) * 2;
            this.y += Math.sin(this.angle) * 2;
        }
    };
    Segment.prototype.getTop = function () {
        return {
            x: this.x,
            y: this.y
        };
    };
    Segment.prototype.getBottom = function () {
        return {
            x: this.x + Math.cos(this.angle) * this.length,
            y: this.y + Math.sin(this.angle) * this.length
        };
    };
    Segment.prototype.render = function (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        // ctx.lineTo(this.getBottom().x, this.getBottom().y);
        ctx.translate(this.getBottom().x, this.getBottom().y);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.drawImage(this.image, -this.length / 2, -this.length / 2, this.length, this.length * 1.4);
        // ctx.arc(0, 0, this.length/3, 0, Math.PI * 2);
        // ctx.stroke();
        ctx.restore();
    };
    return Segment;
})();
/// <reference path="../../Engine/Keyboard.ts" />
/// <reference path="../../Engine/NullKeyboard.ts" />
var Snake = (function () {
    function Snake(x, y, segments, img, segment_img) {
        this.x = x;
        this.y = y;
        this.image = img;
        this.segmentImg = segment_img;
        this.keyboard = new Engine.Keyboard;
        this.segments = [];
        this.add_segments(segments);
        this.head = this.segments[0];
    }
    Snake.prototype.render = function (ctx) {
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var segment = _a[_i];
            segment.render(ctx);
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.head.x, this.head.y);
        // ctx.lineTo(this.segments[0].getBottom().x, this.segments[0].getBottom().y);
        ctx.translate(this.head.getBottom().x, this.head.getBottom().y);
        ctx.rotate(this.segments[0].angle + Math.PI / 2);
        ctx.drawImage(this.image, -this.head.length / 2, -this.head.length / 2, this.head.length, this.head.length * 1.4);
        // ctx.arc(0, 0, 12, 0, Math.PI * 2);
        // ctx.stroke();
        ctx.restore();
    };
    Snake.prototype.add_segments = function (n) {
        for (var i = 0; i < n; i++) {
            var segment = new Segment(this.x - i * 20, this.y, 1, undefined, this.segmentImg);
            if (this.segments.length > 0) {
                segment.parent = this.segments[this.segments.length - 1];
            }
            this.segments.push(segment);
        }
    };
    Snake.prototype.update = function () {
        if (this.keyboard.pressed("a"))
            this.segments[0].angle -= .1;
        if (this.keyboard.pressed("d"))
            this.segments[0].angle += .1;
        if (Engine.Mouse.clickLeft) {
            this.segments[0].x = Engine.Mouse.x;
            this.segments[0].y = Engine.Mouse.y;
        }
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var seg = _a[_i];
            seg.update();
        }
    };
    return Snake;
})();
var Snake;
(function (Snake) {
    var GameStates;
    (function (GameStates) {
        var GameOver = (function (_super) {
            __extends(GameOver, _super);
            function GameOver() {
                _super.call(this);
                this.counter = 0;
                this.lastX = Mouse.x;
                this.lastY = Mouse.y;
            }
            GameOver.prototype.update = function () {
            };
            GameOver.prototype.render = function () {
                if (Mouse.mouseDown) {
                    this.game.context.beginPath();
                    this.game.context.moveTo(this.lastX, this.lastY);
                    this.game.context.lineTo(Mouse.x, Mouse.y);
                    this.game.context.stroke();
                    this.game.context.closePath();
                    this.lastX = Mouse.x;
                    this.lastY = Mouse.y;
                }
            };
            return GameOver;
        })(Engine.GameState);
        GameStates.GameOver = GameOver;
    })(GameStates = Snake.GameStates || (Snake.GameStates = {}));
})(Snake || (Snake = {}));
/// <reference path="../Entities/Segment.ts" />
/// <reference path="../Entities/Portal.ts" />
/// <reference path="../../Engine/Assets.ts" />
var TestState = (function (_super) {
    __extends(TestState, _super);
    function TestState() {
        _super.call(this);
        this.snake = new Snake(100, 100, 10, Engine.Assets.images["head"], Engine.Assets.images["segment"]);
        this.snake.keyboard = new Engine.Keyboard;
        this.portal = new Portal({ x: 300, y: 60 }, { x: 160, y: 300 });
    }
    TestState.prototype.render = function () {
        this.game.clear();
        this.game.context.save();
        this.snake.render(this.game.context);
        this.portal.render(this.game.context);
    };
    TestState.prototype.update = function () {
        this.snake.update();
        this.portal.update(this.snake.segments);
    };
    return TestState;
})(Engine.GameState);
var TitleScreen = (function (_super) {
    __extends(TitleScreen, _super);
    function TitleScreen() {
        _super.call(this);
    }
    TitleScreen.prototype.update = function () {
    };
    TitleScreen.prototype.render = function () {
    };
    return TitleScreen;
})(Engine.GameState);
