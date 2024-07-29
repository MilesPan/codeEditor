import { Drawer } from 'antd';
import { FC, useEffect } from 'react';
import './QuestionDrawer.css';
import { LevelCssMap, LevelTextMap, ProblemItemType } from '@Types/leetcode';
import questionStore from '@/store/questionStore';
import { observer } from 'mobx-react-lite';
import { generateUUID } from '@Utils/index';

const QuestionDrawer: FC<{ drawerStatus: boolean; openDrawer: () => void; closeDrawer: () => void }> = observer(
  ({ drawerStatus, closeDrawer }) => {
    const onClose = () => {
      closeDrawer();
    };

    const clickQuestionItem = (question: ProblemItemType) => {
      questionStore.setCurQuestion(question);
      closeDrawer();
    };
    return (
      <>
        <Drawer title={'题库'} open={drawerStatus} onClose={onClose} placement={'left'} width={600}>
          <div className="container flex flex-col gap-2">
            {questionStore.questions.map(
              (item, index) =>
                item && (
                  <div
                    className={`flex justify-between cursor-pointer rounded-xl _hoverBtnRight py-4 pr-6 pl-10 text-left ${(index + 1) % 2 && 'oddItem'}`}
                    onClick={() => clickQuestionItem(item)}
                    // key={item?.frontend_question_id}
                    key={generateUUID()}
                  >
                    <div className="title">
                      {item.frontend_question_id}.{item.title}
                    </div>
                    <div className={`level ${LevelCssMap[item.level]}`}>
                      {LevelTextMap[item.level]}
                    </div>
                  </div>
                )
            )}
          </div>
        </Drawer>
      </>
    );
  }
);

export default QuestionDrawer;
