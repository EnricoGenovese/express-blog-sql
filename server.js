import express from "express";

import errorsHandler from "./middlewares/errorsHandler.js";
import notFound from "./middlewares/notFound.js";
import corsPolicy from "./middlewares/corsPolicy.js";
import postsRouter from "./routes/posts.js";


const app = express()
const PORT = process.env.PORT

app.use(corsPolicy)

app.get("/", (req, res) => {
    res.send("<h1>Server del mio blog</h1>")
});

app.use("/posts", postsRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});