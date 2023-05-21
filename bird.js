class Bird {
    constructor(bird) {
        this.x = 60
        this.y = height / 2
        this.radius = 30

        this.velocity = 0;
        this.gravity = 0.5
        this.lift = -12

        if (bird) {
            this.brain = bird.brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }
        this.score = 0;
        this.fitness = 0;
    }
    mutate(func) {
        this.brain.mutate(func);
    }
    think(pipes) {
        let closest = null;
        let closest_d = Infinity;
        for (let i of pipes) {
            let d = i.x + i.w - this.x;
            if (d < closest_d && d > 0) {
                closest = i;
                closest_d = d;
            }
        }

        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;
        inputs[4] = map(this.velocity, -20, 20, 0, 1);
        let output = this.brain.predict(inputs);

        if (output[0] > output[1]) {
            this.up();
        }
    }
    up() {
        this.velocity += this.lift
    }
    update() {
        this.score++;
        this.velocity += this.gravity;
        this.y += this.velocity;
    }
    show() {
        fill(255, 100);
        ellipse(this.x, this.y, this.radius, this.radius);
    }
}