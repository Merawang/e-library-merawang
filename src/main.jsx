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

// Context
import BookContextProvider from '@/contexts/BookContext';
import BorrowContextProvider from '@/contexts/BorrowContext';
import AuthContextProvider from '@/contexts/AuthContext';

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BookContextProvider>
          <BorrowContextProvider>
            <RouterProvider router={router} fallbackElement={<h1>Loading..</h1>} />
          </BorrowContextProvider>
        </BookContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
)
