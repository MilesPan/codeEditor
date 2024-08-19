import Collapse from '@/components/Collapse/Collapse';
import debugStore from '@/store/debugStore';
import { ScanEyeIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import ReactJson from '@uiw/react-json-view';
import { vscodeTheme } from '@uiw/react-json-view/vscode';
import { lightTheme } from '@uiw/react-json-view/light';
import { useTheme } from '../ThemeProvider';
import { useMemo } from 'react';

const DebugTab = observer(() => {
  const { resolvedTheme } = useTheme();
  const jsonTheme = useMemo(() => {
    if (resolvedTheme === 'dark') {
      vscodeTheme.backgroundColor = 'transparent';
      return vscodeTheme;
    } else {
      return lightTheme;
    }
  }, [resolvedTheme]);
  return (
    <>
      <div className="px-4 py-5 overflow-x-hidden overflow-y-auto">
        <Collapse TitleIcon={ScanEyeIcon} titleContent="作用域" initStatus={true}>
          <div className="h-fit">
            <ReactJson value={debugStore.result} style={jsonTheme}></ReactJson>
          </div>
        </Collapse>
      </div>
    </>
  );
});

export default DebugTab;
