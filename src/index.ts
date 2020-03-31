import { GameState } from "./GameState";
import Graphics from "./Graphics";
import Player from "./Player";
import Vector from "./vector";
import { inputController } from './InputController'
import Minimap from "./Minimap";
import Level from "./Level";
import { Line, LineUtil } from "./Line";
import Raymarcher from "./Raymarcher";

const player = new Player(new Vector(100, 100));
const state = new GameState(player);
const graphics = new Graphics(800, 600);
const minimap = new Minimap(new Vector(200, 200));

const level = new Level([
  LineUtil.create(300, 20, 300, 800),
  LineUtil.create(100, 20, 100, 800),
  LineUtil.create(20, 200, 800, 200),
]);

inputController.subscribe(player);

let prevTimestamp = new Date();
const sleep = 20;

//  Draw view fustrum.
const marcher = new Raymarcher(graphics.camera);

const rayCount = 401;
const viewAngle = Math.PI/2;

for (let i=0;i<rayCount;i++) {
  const angle = -viewAngle/2 + viewAngle/rayCount * i;
  marcher.addRay(player.orientation.rotate(angle), angle);
}

function loop() {
  const currentTimestamp = new Date();
  const delta = (currentTimestamp.getTime() - prevTimestamp.getTime())/ 1000;

  state.delta = delta;
  prevTimestamp = currentTimestamp;
  
  player.update(state);
  player.draw(graphics);

  minimap.draw(graphics, player, level);
  marcher.render(level, graphics, player.position, player.orientation);
}

window.setInterval(loop, sleep);