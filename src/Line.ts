import Vector from "./vector";
import Graphics from "./Graphics";

interface Line { p1: Vector, p2: Vector };

class LineUtil {

  static create(x1: number, y1: number, x2: number, y2: number) {
    return { p1: new Vector(x1, y1), p2: new Vector(x2, y2) }
  }

  static draw(line: Line, graphics: Graphics) {
    const { ctx } = graphics;
    
    ctx.beginPath();
    
    ctx.moveTo(line.p1.x, line.p1.y);
    
    ctx.lineTo(line.p2.x, line.p2.y);
    ctx.stroke();
  }

  static scale(line: Line, scale: number): Vector[] {
    return [line.p1, line.p2].map(p => p.scale(scale));
  }

  static rotate(line: Line, rotation: number): Vector[] {
    return [line.p1, line.p2].map(p => p.rotate(rotation));
  }

  static translate(line: Line, translation: Vector): Vector[] {
    return [line.p1, line.p2].map(p => p.add(translation));
  }

  static transform(line: Line, scale: number, rotation: number, translation: Vector): Line {
    const [p1, p2] = [line.p1, line.p2]
      .map(p => 
        p.scale(scale)
        .rotate(rotation)
        .add(translation)
      );
    return { p1, p2 };
  }
}

export { Line, LineUtil }