import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App.tsx';

try {
  renderToString(React.createElement(App));
  console.log("Render successful");
} catch (e) {
  console.error("Render failed:", e);
}