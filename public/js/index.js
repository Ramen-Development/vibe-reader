const emotions = [
    "admiration",
    "amusement",
    "anger",
    "annoyance",
    "approval",
    "caring",
    "confusion",
    "curiosity",
    "desire",
    "disappointment",
    "disapproval",
    "disgust",
    "embarrassment",
    "excitement",
    "fear",
    "gratitude",
    "grief",
    "joy",
    "love",
    "nervousness",
    "optimism",
    "pride",
    "realization",
    "relief",
    "remorse",
    "sadness",
    "surprise",
    "neutral",
  ];
  
  let allWords = [];
  let wordReference = {};
  const model = tf.sequential();
  function setText(text) {
    document.getElementById("status").innerText = text;
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  (async () => {
    document.getElementById("message").disabled = true;
    document.getElementById("sendbtn").disabled = true;
    // Load GoEmotions data (https://github.com/google-research/google-research/tree/master/goemotions)
    let data = await fetch( "../data/emotions.tsv" ).then( r => r.text() );
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
      for (let i = 0; i < emotions.length; i++) {
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
        units: emotions.length,
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
          setText(`Training... Epoch #${epoch} (${logs.acc})`);
          console.log("Epoch #", epoch, logs);
        },
      },
    });
    setText("");
    document.getElementById("message").disabled = false;
    document.getElementById("sendbtn").disabled = false;
  })();
  
  async function evaluate(sentence) {
  
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
    botMsg(`Result: ${emotions[id]}`);
  }

  function userMsg() {
    let msgInput = document.getElementById("message");
    let msg = msgInput.value;
    msgInput.value = "";
    document.getElementById("chat").innerHTML += '<div class="flex"><div class="w-0 flex flex-1 items-center justify-end"><span class="flex p-2 rounded-lg bg-gray-600 text-black">'+msg+'</span></div></div>';
    evaluate(msg);
  }
  function botMsg(msg) {
    document.getElementById("chat").innerHTML += '<div class="flex"><div class="w-0 flex flex-1 items-center"><span class="flex p-2 rounded-lg bg-gray-600 text-white">'+msg+'</span></div></div>';
  }