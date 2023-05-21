class Pipe {
    constructor() {
        this.gap = 130;
        this.top = random(height / 6, (3 * height) / 4);
        this.bottom = this.top + this.gap;
        this.x = width;
        this.w = 40;
        this.speed = 2
        this.highlight = false;
    }
    hit(bird) {
        if (bird.y - bird.radius / 2 < this.top || bird.y + bird.radius / 2 > this.bottom) {
            if (bird.x + bird.radius / 2 > this.x && bird.x + bird.radius / 2 < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }
    update() {
        this.x -= this.speed;
    }
    show() {
        if (this.highlight) {
            fill(255, 0, 0);
            rect(this.x, 0, this.w, this.top);
            rect(this.x, this.bottom, this.w, height - this.bottom);
        } else {
            fill(255);
            rect(this.x, 0, this.w, this.top);
            rect(this.x, this.bottom, this.w, height - this.bottom);
        }
    }
}