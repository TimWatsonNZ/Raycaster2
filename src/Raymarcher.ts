import Vector from "./vector";
import Level from "./Level";
import { LineUtil } from "./Line";
import Graphics from "./Graphics";
import Camera from "./Camera";

class Raymarcher {
  rays: { ray: Vector, angle: number }[];
  horizonDistance = 800;
  epsilon = 0.5;
  camera: Camera;

  constructor(camera: Camera) {
    this.camera = camera;
    this.rays = [];
  }

  addRay(ray: Vector, angle: number) {
    this.rays.push({ ray, angle });
  }

  marchRays(level: Level, origin: Vector) {
    return this.rays.map(ray => this.marchRay(ray, level, origin));
  }

  marchRay(ray: { ray: Vector, angle: number}, level: Level, origin: Vector) {
    let totalDistance = 0;
    let marchPoint = origin;
    while (true) {
      const distances = level.geometry.map(line => LineUtil.distanceFromPoint(marchPoint, line));
      const leastDistance = distances.reduce((smallest, current, index) => {
        if (current < smallest.distance) {
          return { index, distance: current };
        } else {
          return smallest;
        }
      }, { index: 0, distance: Number.MAX_VALUE });

      totalDistance += leastDistance.distance;
      if (leastDistance.distance <= this.epsilon || leastDistance.distance >= this.horizonDistance) {
        break;
      }

      marchPoint = ray.ray.scale(leastDistance.distance).add(marchPoint);
    }

    return { ray, distance: totalDistance };
  }

  render(level: Level, graphics: Graphics, origin: Vector, orientation: Vector) {
    
    this.rays = [];
    for (let i=0;i<this.camera.rayCount;i++) {
      const angle = -this.camera.viewAngle/2 + this.camera.viewAngle/this.camera.rayCount * i;
      this.rays.push({ ray: orientation.rotate(angle), angle });
    }

    const rayDistances = this.marchRays(level, origin);

    rayDistances.forEach((ray, index) => {
      const o = ray.ray.ray.scale(ray.distance).add(origin);

      const wallHeight = 40;
      const wallWidth = graphics.width / rayDistances.length;
      
      const x = graphics.width / rayDistances.length * index;

      if (ray.distance < graphics.camera.horizon) {
        const adjustedDistance = Math.cos(ray.ray.angle) * ray.distance;
        const h = wallHeight / adjustedDistance * graphics.height;

        const start = { x, y: graphics.height/2 - h/2 - graphics.camera.height };
  
        const alpha = 1 - ray.distance / this.camera.horizon;
        graphics.pushFillStyle(`rgba(255,0,0,${alpha})`);
        graphics.ctx.fillRect(start.x, start.y, wallWidth, h);
        graphics.popFillStyle();

        graphics.pushFillStyle(`rgba(0,0,0,1)`);
        graphics.ctx.fillRect(start.x, 0, wallWidth, start.y);
        graphics.popFillStyle();

        graphics.pushFillStyle(`rgba(0,0,255,1)`);
        graphics.ctx.fillRect(start.x, start.y + h, wallWidth, graphics.height);
        graphics.popFillStyle();
        
      } else {
        graphics.pushFillStyle(`rgba(0,0,0,1)`);
        graphics.ctx.fillRect(x, 0, wallWidth, graphics.height / 2 - graphics.camera.height);
        graphics.popFillStyle();

        graphics.pushFillStyle(`rgba(0,0,255,1)`);
        graphics.ctx.fillRect(x, graphics.height / 2 - graphics.camera.height, wallWidth, graphics.height);
        graphics.popFillStyle();
      }
    });
  }
}

export default Raymarcher;