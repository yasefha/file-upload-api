'use strict';

const app = require('./app');
const { PORT } = require('./libraries/env-loader/env');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});