const canvas = document.getElementById("WhiteCanvas");
const context = canvas.getContext("2d");

const rectanWidth  = 90;
const rectanHeight = 130;

const targetFPS = 60;

let timeLast = 0;

let rectanX = 480;
let rectanY = 0;
let rectanSpeed = 155;

class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    static add(a, b)
    {
        var result = new Vector2(a.x + b.x, a.y + b.y);
        return result;
    }

    static diff(a, b)
    {
        var result = new Vector2(a.x - b.x, a.y - b.y);
        return result;
    }

    normalize()
    {
        let magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
        if (magnitude === 0)
            return new Vector2(0, 0);

        let normalized = new Vector2(this.x / magnitude, this.y / magnitude);
        return normalized;
    }

    scale(fraction)
    {
        this.x *= fraction;
        this.y *= fraction;
    }
}

class Entity
{
    constructor(type, pos, w, h, speed)
    {
        this.type     = type;
        this.position = pos;
        this.width    = w;
        this.height   = h;
        this.speed    = speed;
    }

    move(step)
    {
        this.position = Vector2.add(this.position, step);
    }
}



const rectan = new Entity(
    "rectan",
    new Vector2(rectanX, rectanY),
    rectanWidth,
    rectanHeight,
    rectanSpeed);

const game_entities = [];
game_entities.push(rectan);


function update(timeCurrent)
{
    const deltaTime = (timeCurrent - timeLast) / 1000;
    const singleFrameTime = (1000 / targetFPS) / 1000;

    // console.log(`${deltaTime} < ${singleFrameTime}`);

    if (deltaTime < singleFrameTime)
    {
        requestAnimationFrame(update);
        return;
    }

    let moveDirection = new Vector2(0, 0);


        moveDirection.y += rectan.speed;

    moveDirection.scale(deltaTime);
    rectan.move(moveDirection);


    if ((rectan.position.x + (rectan.width / 2)) >= canvas.width)
    {
        rectan.position.x = canvas.width - (rectan.width / 2);
    }

    if ((rectan.position.x - (rectan.width / 2)) < 0)
    {
        rectan.position.x = rectan.width / 2;
    }

    if ((rectan.position.y + (rectan.height / 2)) >= canvas.height)
    {
        rectan.position.y = canvas.height - (rectan.height / 2);
    }

    if ((rectan.position.y - (rectan.height / 2)) < 0)
    {
        rectan.position.y = rectan.height / 2;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (entity of game_entities)
    {

        if (entity.type === "rectan")
        {
            context.fillStyle = "#ffffff";
        }

        context.fillRect(
            entity.position.x - (entity.width  / 2),
            entity.position.y - (entity.height / 2),
            entity.width,
            entity.height);
    }

    timeLast = timeCurrent;

    requestAnimationFrame(update);
}


requestAnimationFrame(update);