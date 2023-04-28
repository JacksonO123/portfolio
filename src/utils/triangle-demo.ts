import {
  type Simulation,
  Vector,
  Color,
  SceneCollection,
  Circle,
  randInt,
  distance,
  clamp,
  degToRad,
  frameLoop,
  Polygon,
  transitionValues,
} from "simulationjs";
import triangulate from "delaunay-triangulate";

export const createTriangleDemo = (canvas: Simulation) => {
  let running = true;

  canvas.setBgColor(new Color(255, 255, 255));
  canvas.fitElement();

  const triangles = new SceneCollection("triangles");
  canvas.add(triangles);

  const outerBuffer = 80;
  // const outerBuffer = 0;

  const maxEffectDist = 225 * canvas.ratio;
  const rotationSpeed = 4;

  class Node extends Circle {
    direction: number; // 0 - 360
    speed = 0.025 * canvas.ratio;
    constructor(
      pos: Vector,
      radius: number,
      color?: Color,
      startAngle?: number,
      endAngle?: number,
      thickness?: number,
      rotation?: number,
      fill?: boolean,
      counterClockwise?: boolean
    ) {
      super(
        pos,
        radius,
        color,
        startAngle,
        endAngle,
        thickness,
        rotation,
        fill,
        counterClockwise
      );
      this.direction = randInt(360);
    }
    translate(mousePos: Vector | null, dt: number) {
      if (mousePos !== null) {
        const dist = distance(this.pos, mousePos);
        if (dist < maxEffectDist) {
          const ratio = (maxEffectDist - dist) / maxEffectDist;
          const amount = rotationSpeed * ratio;
          const vec = new Vector(1, 0).rotate(this.direction - 90);
          const dot = clamp(vec.dot(mousePos.clone().sub(this.pos)), -1, 1);
          this.direction += amount * dot;
        }
      }

      const xAmount = Math.cos(degToRad(this.direction)) * this.speed * dt;
      const yAmount = Math.sin(degToRad(this.direction)) * this.speed * dt;
      this.pos.x += xAmount;
      this.pos.y += yAmount;

      if (this.pos.x < -outerBuffer) {
        this.pos.x = canvas.width * canvas.ratio + outerBuffer;
      } else if (this.pos.x > canvas.width * canvas.ratio + outerBuffer) {
        this.pos.x = -outerBuffer;
      }

      if (this.pos.y < -outerBuffer) {
        this.pos.y = canvas.height * canvas.ratio + outerBuffer;
      } else if (this.pos.y > canvas.height * canvas.ratio + outerBuffer) {
        this.pos.y = -outerBuffer;
      }
    }
  }

  const numCircles = 200;
  const points = generatePoints(numCircles);
  const dots = generateCircles(points);

  const fromColorEnd = new Color(160, 160, 160);
  const fromColor = new Color(255, 255, 255);
  const toColor = new Color(255, 255, 255);

  function easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4);
  }

  (() => {
    const diff = new Color(
      fromColorEnd.r - fromColor.r,
      fromColorEnd.g - fromColor.g,
      fromColorEnd.b - fromColor.b
    );
    void transitionValues(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      (p) => {
        fromColor.r += diff.r * p;
        fromColor.g += diff.g * p;
        fromColor.b += diff.b * p;
        return true;
      },
      () => {
        fromColor.r = fromColorEnd.r;
        fromColor.g = fromColorEnd.g;
        fromColor.b = fromColorEnd.b;
      },
      0.8,
      easeOutQuart
    );
  })();

  let startPos: Vector | null = null;
  let pos: Vector | null = null;
  canvas.on("mousedown", (e: MouseEvent) => {
    pos = new Vector(e.offsetX, e.offsetY).multiply(canvas.ratio);
    startPos = pos.clone();
  });
  canvas.on("mouseup", (e: MouseEvent) => {
    if (pos !== null && startPos !== null) {
      const diff = pos.clone().sub(startPos);
      if (diff.getMag() === 0) {
        addNewPoint(new Vector(e.offsetX, e.offsetY).multiply(canvas.ratio));
      }
    }
    startPos = null;
    pos = null;
  });
  canvas.on("mousemove", (e: MouseEvent) => {
    if (pos) {
      pos = new Vector(e.offsetX, e.offsetY).multiply(canvas.ratio);
    }
  });

  frameLoop((p: number) => {
    movePoints(dots, pos, clamp(p, 0.01, 50));
    drawTriangles(dots);
    drawPoints(dots);
    if (!running) return false;
  })();

  function addNewPoint(pos: Vector) {
    dots.push(
      new Node(
        pos,
        randInt(3.25, 1.75) * canvas.ratio,
        new Color(255, 255, 255, 0.4)
      )
    );
  }

  function drawTriangles(circles: Node[]) {
    triangles.empty();

    const corners = [
      new Vector(-outerBuffer, -outerBuffer),
      new Vector(-outerBuffer, canvas.height * canvas.ratio + outerBuffer),
      new Vector(canvas.width * canvas.ratio + outerBuffer, -outerBuffer),
      new Vector(
        canvas.width * canvas.ratio + outerBuffer,
        canvas.height * canvas.ratio + outerBuffer
      ),
    ];
    const dots = [...generateCircles(corners), ...circles];
    const posArr = getPosArr(dots);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const triangulated = triangulate(posArr) as [number, number, number][];
    triangulated.forEach((triangle) => {
      const change = new Color(
        toColor.r - fromColor.r,
        toColor.g - fromColor.g,
        toColor.b - fromColor.b
      );

      const avgY = Math.min(
        canvas.height * canvas.ratio,
        Math.max(
          0,
          ((dots[triangle[0]]?.pos.y || 0) +
            (dots[triangle[1]]?.pos.y || 0) +
            (dots[triangle[2]]?.pos.y || 0)) /
            3
        )
      );
      const ratio = avgY / (canvas.height * canvas.ratio);
      const poly = new Polygon(
        new Vector(0, 0),
        [
          dots[triangle[0]]?.pos || new Vector(0, 0),
          dots[triangle[1]]?.pos || new Vector(0, 0),
          dots[triangle[2]]?.pos || new Vector(0, 0),
        ],
        new Color(
          fromColor.r + change.r * ratio,
          fromColor.g + change.g * ratio,
          fromColor.b + change.b * ratio
        )
      );
      triangles.add(poly);
    });
  }

  function getPosArr(points: Node[]) {
    return points.map((p) => [p.pos.x, p.pos.y]);
  }

  function movePoints(points: Node[], mousePos: Vector | null, dt: number) {
    points.forEach((p) => p.translate(mousePos, dt));
  }

  function generatePoints(num: number) {
    const res: Vector[] = [];
    for (let i = 0; i < num; i++) {
      res.push(
        new Vector(
          randInt(canvas.width + 2 * outerBuffer, -outerBuffer) * canvas.ratio,
          randInt(canvas.height + 2 * outerBuffer, -outerBuffer) * canvas.ratio
        )
      );
    }
    return res;
  }

  function generateCircles(points: Vector[]) {
    return points.map(
      (p) =>
        new Node(
          p,
          randInt(3.25, 1.75) * canvas.ratio,
          new Color(255, 255, 255, 0.4)
        )
    );
  }

  function drawPoints(points: Node[]) {
    points.forEach((p) => {
      if (!canvas.ctx) return;
      p.draw(canvas.ctx);
    });
  }

  function endCanvas() {
    canvas.empty();
    triangles.empty();
    running = false;
  }

  return endCanvas;
};
