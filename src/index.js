import express from 'express';
// import userRepo from './utils/userRepository.js';
import blogPepo from './utils/blogPepository.js';
import path from 'path';
import { engine } from 'express-handlebars';

const app = express();

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    })
);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

/// static file
app.use(express.static(path.resolve('src/public')));

app.use(express.urlencoded({ extended: true })); // note
app.use(express.json());

// API endpoints
// app.get('/api/users', async (req, res) => {
//     const result = await userRepo.getUsers();
//     res.send({
//         data: result,
//     });
// });

// app.post('/api/users', async (req, res) => {
//     const result = await userRepo.createUser(req.body);

//     if (result.affectedRows !== 0) {
//         return res.status(201).send({
//             message: 'User created successfully',
//         });
//     }

//     res.statusCode(400).send({
//         messsage: "Data can't insert into database",
//     });
// });

// app.put('/api/users', async (req, res) => {
//     const result = await userRepo.updateUser(req.body);

//     if (result.affectedRows !== 0) {
//         return res.status(201).send({
//             message: 'User updated successfully',
//         });
//     }

//     res.statusCode(400).send({
//         messsage: "Data can't updated into database",
//     });
// });

// app.delete('/api/users/:id', async (req, res) => {
//     const result = await userRepo.deleteUser(req.params.id);

//     if (result.affectedRows !== 0) {
//         return res.status(201).send({
//             message: 'User deleted successfully',
//         });
//     }

//     res.statusCode(400).send({
//         messsage: "Data can't updated into database",
//     });
// });

// BLOGS

app.get('/api/blogs', async (req, res) => {
    const result = await blogPepo.getBlogs();
    res.send({
        data: result,
    });
});

app.post('/api/blogs', async (req, res) => {
    const result = await blogPepo.createBlog(req.body);
    console.log(result);

    if (result === 'title invalid') {
        return res.send({
            message: 'Title must be at least 5 characters',
        });
    } else if (result === 'author invalid') {
        return res.send({
            message: 'author must be at least 3 characters',
        });
    }

    if (result.affectedRows !== 0) {
        return res.status(201).send({
            message: 'Blog created successfully',
        });
    }

    res.statusCode(400).send({
        messsage: "Data can't insert into database",
    });
});

app.put('/api/blogs', async (req, res) => {
    const result = await blogPepo.updateBlog(req.body);

    if (result.affectedRows !== 0) {
        return res.status(201).send({
            message: 'blog updated successfully',
        });
    }

    res.statusCode(400).send({
        messsage: "Data can't updated into database",
    });
});

app.delete('/api/blogs/:id', async (req, res) => {
    const result = await blogPepo.deleteBlog(req.params.id);

    if (result.affectedRows !== 0) {
        return res.status(201).send({
            message: 'Blog deleted successfully',
        });
    }

    res.statusCode(400).send({
        messsage: "Data can't updated into database",
    });
});

// Render view endpoints
// app.get('/add-user', async (req, res) => {
//     res.render('users/addUser');
// });

app.get('/add-blog', async (req, res) => {
    res.render('blogs/addBlog');
});

app.get('/blog/:id', async (req, res) => {
    const result = await blogPepo.getBlogById(req.params.id);
    res.render('blogs/blogDetail', { blogs: result });
});

app.get('/delete-blog/:id', async (req, res) => {
    const result = await blogPepo.deleteBlog(req.params.id);
    res.redirect('/');
});

// app.get('/home', async (req, res) => {
//     const result = await userRepo.getUsers();
//     res.render('home', { users: result });
// });

app.get('/', async (req, res) => {
    const result = await blogPepo.getBlogs();
    res.render('blogs/blogs', { blogs: result });
});

app.listen(3000, (req, res) => {
    console.log('listening http://localhost:3000');
});
