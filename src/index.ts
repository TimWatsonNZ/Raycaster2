import { GameState } from "./GameState";
import Graphics from "./Graphics";
import Player from "./Player";
import Vector from "./vector";
import { inputController } from './InputController'
import Minimap from "./Minimap";
import Level from "./Level";
import { Line, LineUtil } from "./Line";

const canvas = document.createElement('canvas');
canvas.height = 600;
canvas.width = 800;

const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

const player = new Player(new Vector(100, 100));
const state = new GameState(player);
const graphics = new Graphics(ctx);
const minimap = new Minimap(new Vector(200, 200));

const level = new Level([LineUtil.create(300, 20, 300, 300)]);

inputController.subscribe(player);

let prevTimestamp = new Date();
const sleep = 20;

function loop() {

  const currentTimestamp = new Date();
  const delta = (currentTimestamp.getTime() - prevTimestamp.getTime())/ 1000;

  state.delta = delta;
  prevTimestamp = currentTimestamp;
  
  player.update(state);
  player.draw(graphics);

  minimap.draw(graphics, player, level);
}

window.setInterval(loop, sleep);