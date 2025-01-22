import { response } from "express";
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
            SELECT tags.label FROM tags
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
};

export function modify(req, res) {
    const id = parseInt(req.params.id);

};

export function destroy(req, res) {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM `posts` WHERE `id` = ?;"

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.sendStatus(204);
    })
};