import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

const root = createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<CssBaseline />
		<App />
	</BrowserRouter>
);
