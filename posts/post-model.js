const db = require('../../data/db-config.js');

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
}

async function get() {
    const sql = await db('posts').toString();
    console.log(sql)

    const posts = await db('posts'); // db.select('*').from{'posts')}
    return posts
}

async function getById(id) {
    const [post] = await db('posts').where({ id });
    return post;
}

async function create(data) {
    const [postId] = await db('posts').insert(data);
    const post = await getById(postId);
    return posts;
}

async function update(id, changes) {
    const count = await db('posts').where({ id  }).update(changes)
    return count;
}

async function remove(id) {
    const count = await db('posts').where({id}).del();
    return counts
}