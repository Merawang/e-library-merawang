import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material'
import {
  RouterProvider
} from "react-router-dom";
import axios from 'axios';

// Pages and Assets
import { router } from './router';
import './utils/pagesLoader';
import './index.css';

// Context
import BookContextProvider from '@/contexts/BookContext';
import BorrowContextProvider from '@/contexts/BorrowContext';
import AuthContextProvider from '@/contexts/AuthContext';
import DisplayContextProvider from '@/contexts/DisplayContext';

// MUI Default Theme
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  typography: {
    "fontFamily": `"Nunito", sans-serif`,
  },
  palette: {
    mainBlue: createColor('#2563eb'),
  },
});

// Axios Default Config
const accessToken = import.meta.env.VITE_BEARERTOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers.common['Accept'] = `application/json`;
axios.defaults.headers.common['Content-Type'] = `application/json`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DisplayContextProvider>
        <AuthContextProvider>
          <BookContextProvider>
            <BorrowContextProvider>
              <RouterProvider router={router} fallbackElement={<h1>Loading..</h1>} />
            </BorrowContextProvider>
          </BookContextProvider>
        </AuthContextProvider>
      </DisplayContextProvider>
    </ThemeProvider>
  </React.StrictMode>
)
