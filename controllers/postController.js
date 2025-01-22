import connection from "../connection.js";

export function index(req, res) {
    const sql = "SELECT * FROM `posts`"

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        let data = results
        const response = {
            total: results.length,
            data,
        };

        if (response.data.length < 1) {
            res.status(404);
            response = {
                error: 404,
                message: "Post not found",
            };
        }
        res.json(response);
    });

};

export function show(req, res) {
    const id = parseInt(req.params.id);
    const sql = "SELECT * FROM `posts` WHERE `id`= ?";

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        const obj = results[0]
        if (!obj) {
            return res.status(404).json("Object does not exist")
        }

        const sqlTags = `
            SELECT tags.id, tags.label FROM tags
            JOIN post_tag ON post_tag.tag_id = tags.id
            JOIN posts ON posts.id = post_tag.post_id
            WHERE posts.id = ?;
        `

        connection.query(sqlTags, [id], (err, results) => {
            if (err) return res.status(500).json({ error: "Database query failed" });
            obj.tags = results;
            res.json({ success: true, obj })
        })
    })

};

export function store(req, res) {
    let newId = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id > newId) {
            newId = posts[i].id
        };
    };
    newId += 1;

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        img: req.body.img,
    };
    posts.push(newPost);
    console.log(posts);
    res.status(201).json(newPost);
};

export function update(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        res.status(404).json({ success: false, message: "The post does not exist" })
        return;
    }
    for (let key in post) {
        if (key !== "id") {
            post[key] = req.body[key];
        }
    }
    console.log(posts);
    res.json(post);
};

export function modify(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (post) {
        res.send("Item patched")
    } else {    // --> if post does not exist
        res.send("Cannot patch what does not exist")
    }

};

export function destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(item => item.id === id);
    //
    if (index !== -1) {
        posts.splice(index, 1);
        res.sendStatus(204) // --> no content
        console.log(posts);
        //
    } else { // --> if post does not exist
        res.status(404);
        res.json({
            error: 404,
            message: "Cannot destroy what does not exist"
        });
    };
};