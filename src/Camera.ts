class Camera {
  viewAngle: number;
  rayCount: number;
  height: number;
  horizon: number;

  constructor(viewAngle: number, rayCount: number, height: number, horizon: number) {
    this.viewAngle = viewAngle;
    this.rayCount = rayCount;
    this.height = height;
    this.horizon = horizon;
  }
}

export default Camera;