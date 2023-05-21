

class NeuralNetwork {
    constructor(a, b, c, epochs = 50) {
        if (a instanceof NeuralNetwork) {
            this.weights_ih = a.weights_ih.copy();
            this.weights_ho = a.weights_ho.copy();

            this.bias_ih = a.bias_ih.copy();
            this.bias_ho = a.bias_ho.copy();

            this.epochs = a.epochs;
            this.learning_rate = 0.1;
        } else {
            this.weights_ih = new Matrix(b, a);
            this.weights_ho = new Matrix(c, b);
            this.weights_ih.randomize();
            this.weights_ho.randomize();

            this.bias_ih = new Matrix(b, 1);
            this.bias_ho = new Matrix(c, 1);
            this.bias_ih.randomize();
            this.bias_ho.randomize();

            this.epochs = epochs;
            this.learning_rate = 0.1;
        }
    }
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
    d_sigmoid(x) {
        return x * (1 - x);
    }
    predict(input_arr) {
        let input = Matrix.fromArray(input_arr);
        let hidden_hz = Matrix.multiply(this.weights_ih, input);
        hidden_hz.add(this.bias_ih);
        hidden_hz.map(this.sigmoid);

        let output = Matrix.multiply(this.weights_ho, hidden_hz);
        output.add(this.bias_ho);
        output.map(this.sigmoid);

        return output.toArray();
    }

    fit(input_arr, target_arr) {
        let input = Matrix.fromArray(input_arr);
        let target = Matrix.fromArray(target_arr);

        for (let i = 0; i < this.epochs * 100; i++) {

            let hidden_hz = Matrix.multiply(this.weights_ih, input);
            hidden_hz.add(this.bias_ih);
            hidden_hz.map(this.sigmoid);

            let output = Matrix.multiply(this.weights_ho, hidden_hz);
            output.add(this.bias_ho);
            output.map(this.sigmoid);

            let error = Matrix.subtract(target, output);
            let weights_ho_T = Matrix.transpose(this.weights_ho);
            let hidden_error = Matrix.multiply(weights_ho_T, error);

            let gradient_ih = Matrix.map(hidden_hz, this.d_sigmoid);
            gradient_ih.multiply(hidden_error);
            gradient_ih.multiply(this.learning_rate);
            let weights_ih_del = Matrix.multiply(gradient_ih, Matrix.transpose(input));

            let gradient_ho = Matrix.map(output, this.d_sigmoid);
            gradient_ho.multiply(error);
            gradient_ho.multiply(this.learning_rate);
            let weights_ho_del = Matrix.multiply(gradient_ho, Matrix.transpose(hidden_hz));

            this.weights_ih.add(weights_ih_del);
            this.weights_ho.add(weights_ho_del);
            this.bias_ih.add(gradient_ih);
            this.bias_ho.add(gradient_ho);
        }
    }
    copy() {
        return new NeuralNetwork(this);
    }
    mutate(func) {
        this.weights_ih.map(func);
        this.weights_ho.map(func);
        this.bias_ih.map(func);
        this.bias_ho.map(func);
    }
}


// let nn = new NeuralNetwork(2, 2, 1, 50);
// console.log(nn.predict([1, 0]));
// nn.fit([1, 0], [1]);
// console.log(nn.predict([1, 0]));