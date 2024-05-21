import { ConfigProvider, theme } from 'antd';
import Header from './Layout/Header/Header';
import Main from './Layout/Main/Main';
import './styles/App.css';
import { useTheme } from './components/ThemeProvider';

const App = () => {
  const { resolvedTheme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm: resolvedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: {
          Button: {
            colorPrimary: '#2cbb5d',
            algorithm: true
          }
        }
      }}
    >
      <div className="app flex flex-col w-full  px-4 overflow-x-auto h-[100vh]">
        <div className="flex flex-col h-full min-w-[1000px]">
          <Header></Header>
          <Main></Main>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
