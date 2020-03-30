import Player from "./Player";
import Level from "./Level";
import Graphics from "./Graphics";
import Vector from "./vector";
import { LineUtil } from "./Line";

class Minimap {
  position: Vector;
  constructor(position: Vector) {
    this.position = position;
  }

  draw(graphics: Graphics, player: Player, level: Level) {
    graphics.pushFillStyle('#FFFFFF');
    graphics.ctx.fillRect(0, 0, 200, 200);
    graphics.pushStrokeStyle('#000000');
    graphics.ctx.strokeRect(0, 0, 200, 200);
    graphics.popFillStyle();
    graphics.popStrokeStyle();

    graphics.pushFillStyle('#FF0000');
    const playerPosition = player.position.scale(0.2);
    graphics.fillCircle(playerPosition, 2);
    graphics.popFillStyle();

    graphics.pushStrokeStyle('#00FF00');
    level.geometry.forEach(line => {
      const transformedLine = { 
        p1: line.p1.scale(0.2),
        p2: line.p2.scale(0.2),
      }
      LineUtil.draw(transformedLine, graphics);
    });
    graphics.popStrokeStyle();
  }
}

export default Minimap;