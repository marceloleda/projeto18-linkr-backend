import { db } from "../database/database.connection.js";

export async function list (req, res) {
  const limit = req.params.limit ?? 10;

  try {
    const hashtags = await db.query(`
      SELECT
        h.title,
        count(hashtag_id) as quantity
      FROM post_hashtags ph
      JOIN hashtags h ON ph."hashtag_id" = h."id"
      GROUP BY h.hashtag_id
      ORDER BY 2 DESC
      LIMIT $1
    `, [limit]);
    return res.send(hashtags.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function show (req, res) {
  const { id } = req.params;

  try {
    const hashtag = await db.query(`SELECT * FROM hashtags WHERE id = $1`, [id]);
    return res.send(hashtag.rows[0]);
  } catch (err) {
    return res.status(500).send(err);
  }
}