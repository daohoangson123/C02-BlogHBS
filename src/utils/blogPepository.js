import { connectToDatabase } from '../configDatabase.js';

// Connect to database
const db = await connectToDatabase();

class BlogRepository {
    constructor() {
        this.db = db;
    }

    async getBlogById(id) {
        const [result] = await this.db.query(
            'SELECT * FROM blogs WHERE id = ?',
            [id]
        );
        return result;
    }

    async getBlogByTitle(title) {
        const [result] = await this.db.query(
            `SELECT * FROM blogs WHERE title LIKE '%${title}%'`,
            [title]
        );
        return result;
    }

    async getBlogs() {
        const [result] = await this.db.query('SELECT * FROM blogs');
        return result;
    }

    async createBlog(body) {
        const { title, description, author, image } = body;

        // Validation
        if (title.length < 5) {
            return 'title invalid';
        }

        if (author.length < 3) {
            return 'author invalid';
        }

        const [result] = await db.query(
            'INSERT INTO `blogs` (`title`, `description`, `author`, `image`) VALUES(?, ?, ?, ?)',
            [title, description, author, image]
        );
        return result;
    }

    async updateBlog(body) {
        const { id, title, description, author, image } = body;

        const existingBlog = await this.getBlogById(id);
        if (!existingBlog) {
            throw new Error('User not found');
        }

        const [result] = await db.query(
            'UPDATE `blogs` SET `title`, `description`, `author`, `image` WHERE id = ?',
            [title, description, author, image, id]
        );
        return result;
    }

    async deleteBlog(id) {
        const existingBlog = await this.getBlogById(id);
        if (!existingBlog) {
            throw new Error('User not found');
        }

        const [result] = await db.query('DELETE FROM `blogs` WHERE id = ?', [
            id,
        ]);
        return result;
    }
}

export default new BlogRepository();
