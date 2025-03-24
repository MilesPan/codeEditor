import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ThemeProvider } from './components/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <ThemeProvider defaultTheme="dark" storageKey="theme">
    <App />
  </ThemeProvider>
);
