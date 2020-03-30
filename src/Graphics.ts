import Vector from "./vector";

class Graphics {
  ctx: CanvasRenderingContext2D;

  fillStyles: string[] = [];
  strokeStyles: string[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.fillStyles = [];
    this.strokeStyles = [];
  }

  drawCircle(point: Vector, radius: number) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2*Math.PI);
    ctx.stroke();
  }

  strokeCircle(point: Vector, radius: number) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2*Math.PI);
    ctx.stroke();
  }

  fillCircle(point: Vector, radius: number) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2*Math.PI);
    ctx.fill();
  }

  pushFillStyle(style: string) {
    this.fillStyles.push(style);
    this.ctx.fillStyle = style;
  }

  popFillStyle() {
    const style = this.fillStyles.pop();
    if (!style) {
      this.ctx.fillStyle = '#000000';
    } else {
      this.ctx.fillStyle = style
    }
  }

  pushStrokeStyle(style: string) {
    this.strokeStyles.push(style);
    this.ctx.strokeStyle = style;
  }

  popStrokeStyle() {
    const style = this.strokeStyles.pop();
    if (!style) {
      this.ctx.strokeStyle = '#000000';
    } else {
      this.ctx.strokeStyle = style
    }
  }
}

export default Graphics;