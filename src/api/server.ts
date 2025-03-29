import app from './index';

const { PORT = 3333 } = process.env;

app.listen(PORT, () => console.log(`Online na porta ${PORT}`));