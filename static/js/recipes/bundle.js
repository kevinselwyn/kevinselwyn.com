import React from 'react';
import ReactDOM from 'react-dom';

import Recipes from './recipes';

const root = document.querySelector('#root');
const recipe_url = document.querySelector('script[type="application/ld+json"]');

ReactDOM.render((
    <Recipes
        url={recipe_url.getAttribute('src')} />
), root);
