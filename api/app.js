const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");

//AI TRAINING
const tf = require("@tensorflow/tfjs-node")
let allWords = [];
let wordReference = {};
const model = tf.sequential();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

(async () => {
  let data = fs.readFileSync( "data/emotions_es.tsv", "utf8");
  let lines = data.split("\n").filter((x) => !!x); // Split & remove empty lines

  // Randomize the lines
  shuffleArray(lines);

  // Process 200 lines to generate a "bag of words"
  const numSamples = 200;
  let bagOfWords = {};
  let sentences = lines.slice(0, numSamples).map((line) => {
    let sentence = line.split("\t")[0];
    return sentence;
  });

  sentences.forEach((s) => {
    let words = s
      .replace(/[^a-z ]/gi, "")
      .toLowerCase()
      .split(" ")
      .filter((x) => !!x);
    words.forEach((w) => {
      if (!bagOfWords[w]) {
        bagOfWords[w] = 0;
      }
      bagOfWords[w]++; // Counting occurrence just for word frequency fun
    });
  });

  allWords = Object.keys(bagOfWords);
  allWords.forEach((w, i) => {
    wordReference[w] = i;
  });

  // Generate vectors for sentences
  let vectors = sentences.map((s) => {
    let vector = new Array(allWords.length).fill(0);
    let words = s
      .replace(/[^a-z ]/gi, "")
      .toLowerCase()
      .split(" ")
      .filter((x) => !!x);
    words.forEach((w) => {
      if (w in wordReference) {
        vector[wordReference[w]] = 1;
      }
    });
    return vector;
  });

  let outputs = lines.slice(0, numSamples).map((line) => {
    let categories = line
      .split("\t")[1]
      .split(",")
      .map((x) => parseInt(x));
    let output = [];
    //TO-DO 28 was emotions.length
    for (let i = 0; i < 28; i++) {
      output.push(categories.includes(i) ? 1 : 0);
    }
    return output;
  });

  // Define our model with several hidden layers
  model.add(
    tf.layers.dense({
      units: 100,
      activation: "relu",
      inputShape: [allWords.length],
    })
  );
  model.add(tf.layers.dense({ units: 50, activation: "relu" }));
  model.add(tf.layers.dense({ units: 25, activation: "relu" }));
  model.add(
    tf.layers.dense({
      //TO-DO 28 was emotions.length
      units: 28,
      activation: "softmax",
    })
  );

  model.compile({
    optimizer: tf.train.adam(),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  const xs = tf.stack(vectors.map((x) => tf.tensor1d(x)));
  const ys = tf.stack(outputs.map((x) => tf.tensor1d(x)));
  await model.fit(xs, ys, {
    epochs: 50,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log("Epoch #", epoch, logs);
      },
    },
  });
})();
//END AI

//API CALLS
const cors = require('cors')
const app = express();
const server = http.createServer(app);
app.use(cors())
app.use(express.json())
// See: http://expressjs.com/en/4x/api.html#app.settings.table
const PRODUCTION = app.get("env") === "production";

app.get("/", (req, res) => {
  res.send("Hi!");
});

//Evaluation of message
app.post("/evaluate", async (req, res) => {
  const sentence = req.body.sentence;
  console.log(sentence);
  // Generate vectors for sentences
  let vector = new Array(allWords.length).fill(0);
  // Use a regex to only get spaces and letters and remove any blank elements
  let words = sentence
    .replace(/[^a-z ]/gi, "")
    .toLowerCase()
    .split(" ")
    .filter((x) => !!x);
  words.forEach((w) => {
    if (w in wordReference) {
      vector[wordReference[w]] = 1;
    }
  });

  let prediction = await model.predict(tf.stack([tf.tensor1d(vector)])).data();
  // Get the index of the highest value in the prediction
  let id = prediction.indexOf(Math.max(...prediction));
  res.send(JSON.stringify({id:id}));
});

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});


// Listen and serve.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App started on PORT ${PORT}`);
});
