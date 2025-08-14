# API-RATE-LIMTER
API Rate Limiter built with Node.js &amp; Express to control incoming request rates per IP. Implements in-memory tracking, customizable limits, and CORS support. Ideal for preventing abuse, DDoS mitigation, and ensuring fair API usage in small to medium-scale apps.
Here’s a clean **README.md** for your API Rate Limiter project:

---

# API Rate Limiter

A simple middleware-based **rate limiting** implementation for **Node.js + Express** that helps control API request traffic and prevent abuse. It limits the number of requests from each IP within a set time window, making it ideal for securing small to medium-scale APIs.

---

## Features

* 🚦 **Customizable rate limits** – define max requests and window size.
* ⏳ **Time-based reset** – request count resets after each window.
* 🛡 **In-memory storage** – no external database needed.
* ⚡ Lightweight and easy to integrate into any Express app.
* 🌐 **CORS** support for cross-origin requests.

---

## Tech Stack

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [dotenv](https://github.com/motdotla/dotenv)
* [Nodemon](https://nodemon.io/)

---

## Installation

```bash
# Clone repository
git clone https://github.com/your-username/api-rate-limiter.git

# Navigate into the project
cd api-rate-limiter

# Install dependencies
npm install
```

---

## Usage

```bash
# Development mode
npm run dev

# Production mode
npm start
```

**Project Structure**

```
api-rate-limiter/
├── src/
│   ├── index.js         # Main server file
│   └── rateLimiter.js   # Middleware logic
├── package.json
├── .env
└── .gitignore
```

**Example `.env`**

```env
PORT=8000
```

---

## Example Code

**`src/rateLimiter.js`**

```js
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

let ipRequestMap = {};

const rateLimiter = (req, res, next) => {
  const IP = process.env.TEST_IP || req.ip.replace('::ffff:', '');
  const now = Date.now();

  if (!ipRequestMap[IP]) {
    ipRequestMap[IP] = { count: 1, startTime: now };
    return next();
  }

  const userData = ipRequestMap[IP];
  const diff = now - userData.startTime;

  if (diff > WINDOW_SIZE) {
    ipRequestMap[IP] = { count: 1, startTime: now };
    return next();
  }

  userData.count++;
  if (userData.count > MAX_REQUESTS) {
    return res.status(429).json({ error: "Too many requests" });
  }

  next();
};

export default rateLimiter;
```

**`src/index.js`**

```js
import express from "express";
import dotenv from "dotenv";
import rateLimiter from "./rateLimiter.js";

dotenv.config();
const app = express();

app.use(rateLimiter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "HELLO, YOU ARE WITHIN THE RATE LIMIT" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`SERVER CONNECTED TO PORT: ${PORT}`);
});
```

---

## Testing with Postman

1. Send a `GET` request to `http://localhost:8000/`
2. Within 60 seconds:

   * First **5 requests** → ✅ success.
   * **6th request** → ❌ HTTP 429 Too Many Requests.
3. Wait for 1 minute to reset the limit.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

If you want, I can also make you a **badge-rich GitHub README** with shields for Node.js, Express, and license so it looks more professional on your repo page.
Do you want me to prepare that version?
