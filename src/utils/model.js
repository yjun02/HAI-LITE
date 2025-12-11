import * as tf from '@tensorflow/tfjs';

// Define the model architecture: 64 -> 8 -> 1
export const createModel = () => {
    const model = tf.sequential();
    
    // First Hidden Layer: 64 inputs -> 16 units
    model.add(tf.layers.dense({
        inputShape: [64],
        units: 16,
        activation: 'sigmoid',
        kernelInitializer: 'leCunNormal',
        useBias: true
    }));

    // Second Hidden Layer: 16 -> 8 units
    model.add(tf.layers.dense({
        units: 8,
        activation: 'sigmoid',
        kernelInitializer: 'leCunNormal',
        useBias: true
    }));

    // Output Layer: 8 -> 1 unit
    model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid',
        kernelInitializer: 'leCunNormal',
        useBias: true
    }));

    model.compile({
        optimizer: tf.train.adam(0.01),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    return model;
};

// Train the model
export const trainModel = async (model, inputs, labels, onEpochEnd) => {
    // Convert data to Tensors
    const xs = tf.tensor2d(inputs, [inputs.length, 64]);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    const history = await model.fit(xs, ys, {
        epochs: 50,
        batchSize: 4,
        shuffle: true,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                if (onEpochEnd) onEpochEnd(epoch, logs);
            }
        }
    });

    xs.dispose();
    ys.dispose();
    return history;
};

// Predict
export const predict = (model, inputData) => {
    return tf.tidy(() => {
        const xs = tf.tensor2d([inputData], [1, 64]);
        const output = model.predict(xs);
        return output.dataSync()[0];
    });
};
