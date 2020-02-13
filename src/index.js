import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';

import App from './App';

const Root = hot(App);

render(<Root />, document.getElementById('root'));
