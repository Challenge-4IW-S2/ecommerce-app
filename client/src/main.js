import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
server.get('/', async (req, res) => {
    try {
        const data =  await pool.query('SELECT * FROM users');
        res.status(200).send(data.rows );
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

server.post('/',async (req, res) => {
    try {
        await pool.query('INSERT INTO users (name, location) VALUES ($1, $2)', ['brianc', 'San Francisco']);
        res.status(200).send({ message: 'User added.' });
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

