const compression = require('compression');
const ort = require('onnxruntime-node');
const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);
app.use(compression());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/Mnist-predict', async (req, res) => {
  const data = req.body.data;
  
  try {
    const session = await ort.InferenceSession.create('./model_final.onnx');
    const inputData = new Float64Array(data);
    const inputTensor = new ort.Tensor('float64', inputData, [1, 784]);

    const feeds = { input: inputTensor };
    const results = await session.run(feeds);

    const logits = results.output.data;

    function softmax(arr) {
      const maxLogit = Math.max(...arr); // Subtract maximum for numerical stability
      const exps = Array.from(arr).map(x => Math.exp(x - maxLogit));
      const sumExps = exps.reduce((a, b) => a + b, 0);
      return exps.map(x => x / sumExps);
    }

    const probabilities = softmax(logits);

    const maxProb = Math.max(...probabilities);
    const prediction = probabilities.indexOf(maxProb);

    console.log(`predicted digit: ${prediction}, accuracy: ${(maxProb * 100).toFixed(2)}%`);

    res.json({ 
      status: 'success', 
      prediction: prediction,      // predicted digit (0~9)
      confidence: maxProb,         // accuracy (0.99 etc)
      probabilities: probabilities // full probability distribution
    });

  } catch (e) {
    console.error("inference failed:", e);
    res.json({ status: 'error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});