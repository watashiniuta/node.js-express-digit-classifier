# 🧠 MNIST Digit Classification (Node.js express & ONNX)

It is a full-stack number recognition project that converts the learned PyTorch model to ONNX format and runs in a Node.js(Express) environment. When you draw a number in the Web browser's Canvas, the backend server will infer the model and return the results.

<p align="center">
  <img src="https://github.com/user-attachments/assets/4fd7c5e3-c5ba-4f7c-85aa-74b2e12d3bff" width="800" height="750">
</p>

This project is designed to achieve the following technical objectives:
- High-performance model inference with ONNX Runtime Node.js
- Building a Dynamic Web Interface with Express & EJS
- Optimizing Network Transmission with Compression Middleware

---

## 🛠️ Tech Stack
- Backend: Node.js, Express
- Inference: onnxruntime-node
- Optimization: compression
- Frontend: HTML5(EJS), JavaScript

---

## 📁 Project Structure

```text
node.js-express-digit-classifier/
 ├─ public/
 │   ├─ js/
 │   │   └─ sketch.js       # Canvas drawing logic & data preprocessing
 │   └─ style/
 │       └─ style.css       # Web UI styling
 ├─ views/
 │   └─ index.ejs           # Main UI template using EJS engine
 ├─ main.js                 # Express server & ONNX inference core
 ├─ model_final.onnx        # Pre-trained ONNX model weights
 ├─ .gitignore              # Files to be ignored by Git
 ├─ package.json            # Project dependencies & scripts
 ├─ package-lock.json       # Locked versions of dependencies
 └─ README.md               # Project documentation
```

---

## 🚀 How to Run

1. Clone the repository
```bash
git clone https://github.com/watashiniuta/node.js-express-digit-classifier.git
cd node.js-express-digit-classifier
```

2. install Dependencies
```bash
npm install express, onnxruntime-node, ejs, compression
```

3. Run the Server
```bash
node main.js
```