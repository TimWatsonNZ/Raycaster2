import Vector from "./vector";
import Level from "./Level";
import { LineUtil } from "./Line";

class Raymarcher {
  origin: Vector;
  rays: Vector[];
  horizonDistance = 800;
  epsilon = 0.5;

  constructor() {
    this.rays = [];
  }

  addRay(ray: Vector) {
    this.rays.push(ray);
  }

  setOrigin(origin: Vector) {
    this.origin = origin;
  }

  marchRays(level: Level) {
    return this.rays.map(ray => this.marchRay(ray, level));
  }

  marchRay(ray: Vector, level: Level) {
    let totalDistance = 0;
    let marchPoint = this.origin;
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

      marchPoint = ray.scale(leastDistance.distance).add(marchPoint);
    }

    return { orientation: ray, distance: totalDistance };
  }
}

export default Raymarcher;