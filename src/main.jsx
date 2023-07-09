import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material'
import {
  RouterProvider
} from "react-router-dom";

// Pages and Assets
import { router } from './router';
import './utils/pagesLoader';
import './index.css';

// MUI Default Font
const theme = createTheme({
  typography: {
    "fontFamily": `"Nunito", sans-serif`,
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} fallbackElement={<h1>Loading..</h1>} />
    </ThemeProvider>
  </React.StrictMode>
)
