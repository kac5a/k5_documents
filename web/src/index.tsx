import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './components/App';
import { VisibilityProvider } from './providers/VisibilityProvider';
import theme from './theme/theme';
import { createRoot } from 'react-dom/client';
import { GlobalStyles } from '@mui/material';
import { Box } from '@mui/system';
import { DocumentProvider } from './providers/DocumentProvider';
import DocumentViewFromPlayer from './components/Components/DocumentViewFromPlayer';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    
    <ThemeProvider theme={theme}>
      <VisibilityProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: "transparent"},
          }}
        />
        <Box style={{position: "fixed", top:0, left: 0, height: "100vh", width: "100vw", display: 'flex', justifyContent: "center", alignItems: "center"}}>
          <App />
        </Box>
      </VisibilityProvider>

      <DocumentProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: "transparent"},
          }}
        />
        <Box style={{position: "fixed", top:0, left: 0, height: "100vh", width: "100vw", display: 'flex', justifyContent: "center", alignItems: "center"}}>
          <DocumentViewFromPlayer/>
        </Box>
      </DocumentProvider>
    </ThemeProvider>
    
  </React.StrictMode>
);