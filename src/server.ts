import express from 'express';

const app = express();

app.get('/', (req, res) => {
	return res.json({ message: 'Olá mundo 2' });
});

app.listen(3333, () => {
	console.log('Server iniciou');
});
