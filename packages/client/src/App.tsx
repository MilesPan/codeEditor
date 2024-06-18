import { ConfigProvider, theme } from 'antd';

import './styles/App.css';
import '@livekit/components-styles';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { observer } from 'mobx-react-lite';
import { useTheme } from './components/ThemeProvider';
import { CodeProvider } from './contexts/CodeContext';
import { TabProvider } from './contexts/TabContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect } from 'react';

const App = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: resolvedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: {
          Button: {
            colorPrimary: '#2cbb5d',
            algorithm: true
          },
          Popover: {
            colorBgElevated: 'var(--popover-bgColor)'
          }
        }
      }}
    >
      <CodeProvider>
        <TabProvider>
          <div className="app flex flex-col w-full  px-4 overflow-x-auto h-[100vh]">
            <RouterProvider router={router}></RouterProvider>
          </div>
        </TabProvider>
      </CodeProvider>
    </ConfigProvider>
  );
};

export default App;
