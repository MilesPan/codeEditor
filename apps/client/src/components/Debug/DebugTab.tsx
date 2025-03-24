import Collapse from '@/components/Collapse/Collapse';
import debugStore from '@/store/debugStore';
import { ScanEyeIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
// import ReactJson from '@uiw/react-json-view';
import { vscodeTheme } from '@uiw/react-json-view/vscode';
import { lightTheme } from '@uiw/react-json-view/light';
// import { useTheme } from '../ThemeProvider';
// import { useMemo } from 'react';

lightTheme.fontFamily = 'Menlo';
vscodeTheme.backgroundColor = 'transparent';
vscodeTheme.fontFamily = 'Menlo';

const DebugTab = observer(() => {
  // const { resolvedTheme } = useTheme();
  // const jsonTheme = useMemo(() => {
  //   if (resolvedTheme === 'dark') {
  //     return vscodeTheme;
  //   } else {
  //     return lightTheme;
  //   }
  // }, [resolvedTheme]);
  const onClickObjectVariable = (v: any) => {
    console.log('v', v);
    debugStore.getVariable(v.variablesReference, true);
  };

  return (
    <>
      <div className="px-4 py-5 overflow-x-hidden overflow-y-auto">
        <Collapse TitleIcon={ScanEyeIcon} titleContent="作用域" initStatus={true}>
          <div className="h-fit flex flex-col gap-1">
            <div className="flex flex-wrap gap-1">
              {debugStore.variableStack.map((v, i) => {
                return (
                  <>
                    <div key={v} className="flex items-center gap-2">
                      <span
                        className="text-gray-500 _hoverBtnRight min-w-3"
                        onClick={() => debugStore.getVariable(v.variablesReference)}
                      >
                        {debugStore.variablesMap.get(v.variablesReference)?.evaluateName ?? 'scope'}
                      </span>
                      {i !== debugStore.variableStack.length - 1 && <span className="text-gray-500">{'>'}</span>}
                    </div>
                  </>
                );
              })}
            </div>

            {debugStore.variables.length ? (
              debugStore.variables.map(v => {
                return (
                  <>
                    <div className="flex items-center gap-2" key={v.name}>
                      <div className="text-gray-500">{v.name}:</div>
                      {debugStore.isObjectVariable(v) ? (
                        <div
                          className="text-blue-500 cursor-pointer hover:opacity-80"
                          onClick={() => onClickObjectVariable(v)}
                        >
                          {v.value}
                        </div>
                      ) : (
                        <div className="text-gray-300">{v.value}</div>
                      )}
                    </div>
                  </>
                );
              })
            ) : (
              <div className="text-gray-300">暂无变量</div>
            )}
          </div>
        </Collapse>
        <Collapse TitleIcon={ScanEyeIcon} titleContent="输出" initStatus={true}>
          <div className="h-fit flex flex-col gap-1">
            {debugStore.outputs.map((v, i) => {
              return (
                <div key={i} className="text-green-400">
                  {v}
                </div>
              );
            })}
          </div>
        </Collapse>
      </div>
    </>
  );
});

export default DebugTab;
