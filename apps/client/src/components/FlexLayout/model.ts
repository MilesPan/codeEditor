import { IJsonModel, IJsonRowNode, IJsonTabSetNode } from 'flexlayout-react';

export const MinTabSet = { width: 40, height: 36 };
export const TabName = {
  desc: '题目描述',
  record: '提交记录',
  solution: '题解',
  code: '代码',
  testCase: '测试用例',
  testResponse: '测试结果',
  meeting: '视频会议'
};
export type TABNAME = keyof typeof TabName;
export default {
  global: {
    tabSetMinWidth: MinTabSet.width,
    tabSetMinHeight: MinTabSet.height,
    tabEnableClose: false,
    tabEnableRename: false
  },
  layout: {
    type: 'row',
    children: [
      {
        type: 'tabset',
        weight: 20,
        foldBeforeWeight: 59.05,
        children: [
          {
            type: 'tab',
            name: TabName.desc,
            component: TabName.desc
          },
          {
            type: 'tab',
            name: TabName.solution,
            component: TabName.solution
          },
          {
            type: 'tab',
            name: TabName.record,
            component: TabName.record
          }
        ],
        selected: 0
      },
      {
        type: 'row',
        weight: 50,
        children: [
          {
            type: 'tabset',
            weight: 40.40650406504065,
            foldBeforeWeight: 35,
            children: [
              {
                type: 'tab',
                name: TabName.code,
                component: TabName.code,
                enableRenderOnDemand: false
              }
            ],
            selected: 0
          },
          {
            type: 'tabset',
            weight: 29.59349593495935,
            foldBeforeWeight: 35,
            children: [
              {
                type: 'tab',
                name: TabName.testCase,
                component: TabName.testCase
              },
              {
                type: 'tab',
                name: TabName.testResponse,
                component: TabName.testResponse
              }
            ],
            selected: 0
          }
        ] as (IJsonTabSetNode & { foldBeforeWeight: number })[]
      },
      {
        type: 'tabset',
        weight: 1,
        children: [
          {
            type: 'tab',
            name: TabName.meeting,
            component: TabName.meeting
          }
        ],
        selected: 0
      }
    ]
  }
} as IJsonModel;
