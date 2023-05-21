function mutate(val) {
    if (random() < 0.1) {
        return val + randomGaussian();
    } else {
        return val;
    }
}

function nextGeneration() {
    calculateFitness();
    for (let i = 0; i < TOTAL; i++) {
        birds[i] = pickOne();
    }
    savedBirds = []
}

function pickOne() {
    let r = random();
    let index = 0;
    while (r > 0) {
        r -= savedBirds[index].fitness;
        index++
    }
    index--;
    let bird = savedBirds[index];
    let child = new Bird(bird);
    child.mutate(mutate);
    return child;
}

function calculateFitness() {
    let sum = 0;
    for (let i of savedBirds) {
        sum += i.score;
    }
    for (let i = 0; i < savedBirds.length; i++) {
        savedBirds[i].fitness = savedBirds[i].score / sum;
    }
}