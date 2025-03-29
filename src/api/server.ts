import app from './index';

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Online na porta ${PORT}`));