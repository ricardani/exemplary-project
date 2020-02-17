import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';

import App from './App';

const Root = hot(App);

render(<Root />, document.getElementById('root'));
