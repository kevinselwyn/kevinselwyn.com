import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Resume from './static/js/resume/resume';

const json_path = './static/data/resume.json';
const json = JSON.parse(fs.readFileSync(json_path).toString());

const output = ReactDOMServer.renderToString((
    <Resume
        data={json.data} />
));

const html_path = './public/resume/index.html';
const html = fs
    .readFileSync(html_path)
    .toString()
    .replace('<div id="root"></div>', `<div id="root">${output}</div>`);

fs.writeFileSync(html_path, html);
