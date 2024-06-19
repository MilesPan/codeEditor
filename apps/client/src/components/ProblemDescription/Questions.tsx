import { Search } from 'lucide-react';
import { createElement, useCallback, useState } from 'react';
import { Button, Input } from 'antd';
const Question1 = (props: { step: number; stepCount: number; handleNext: (step: number, value: any) => void }) => {
  const { step, stepCount, handleNext } = props;
  return (
    <>
      <div className="question">
        面试中遇到过这道题?
        <span className="ml-3">
          {step}/{stepCount}
        </span>
      </div>
      <div className="answer  flex gap-2">
        <div onClick={() => handleNext(step, 'yes')} className="questionTag">
          是
        </div>
        <div onClick={() => handleNext(step, 'no')} className="questionTag">
          否
        </div>
      </div>
    </>
  );
};
const Question2 = (props: { step: number; stepCount: number; handleNext: (step: number, value: any) => void }) => {
  const { handleNext, step, stepCount } = props;
  const companies = ['字节跳动', 'Meta', '谷歌', 'Google', '亚马逊', '微软', 'Microsoft'];
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <div className="question">
        请问您应聘的哪家公司?
        <span className="ml-3">
          {step}/{stepCount}
        </span>
      </div>
      <div className="answer">
        <div className="preset flex gap-2 flex-wrap">
          {companies.map(company => (
            <div className="questionTag" onClick={() => handleNext(step, company)}>
              {company}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <Input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="w-48"
            prefix={<Search opacity={0.5} size={14}></Search>}
            placeholder="搜索"
          ></Input>
          <Button className="" type="primary" autoInsertSpace={false} onClick={() => handleNext(step, searchValue)}>
            确定
          </Button>
        </div>
      </div>
    </>
  );
};
const Question3 = (props: { step: number; stepCount: number; handleNext: (step: number, value: any) => void }) => {
  const types = ['后端', '前端', '软件开发', '机器学习', '游戏开发', '数据开发', '数据分析', '客户端', '运维', '测试', '其他'];
  return (
    <>
      <div className="question">
        请问您应聘的岗位类型？
        <span>
          {props.step}/{props.stepCount}
        </span>
      </div>
      <div className="answer flex gap-2 flex-wrap">
        {types.map(type => (
          <div className="questionTag" key={type} onClick={() => props.handleNext(props.step, type)}>
            {type}
          </div>
        ))}
      </div>
    </>
  );
};
const Question4 = (props: { step: number; stepCount: number; handleNext: (step: number, value: any) => void }) => {
  const times = ['过去 1 周', '过去 1 个月', '过去 3 个月', '过去 6 个月', '6 个月前'];
  return (
    <>
      <div className="question">
        您是在什么时候遇到该题的？
        <span>
          {props.step}/{props.stepCount}
        </span>
      </div>
      <div className="answer flex gap-2 flex-wrap">
        {times.map(time => (
          <div className="questionTag" key={time} onClick={() => props.handleNext(props.step, time)}>
            {time}
          </div>
        ))}
      </div>
    </>
  );
};
const Question5 = (props: { step: number; stepCount: number; handleNext: (step: number, value: any) => void }) => {
  const mode = ['笔试测评', '视频面试', '现场面试', '其他'];
  return (
    <>
      <div className="question">
        请问您进行了哪种形式的面试？
        <span>
          {props.step}/{props.stepCount}
        </span>
      </div>
      <div className="answer flex gap-2">
        {mode.map(m => (
          <div
            className="questionTag"
            key={m}
            onClick={() => {
              props.handleNext(props.step, m);
            }}
          >
            {m}
          </div>
        ))}
      </div>
    </>
  );
};

const Questions = () => {
  const [step, setStep] = useState(1);
  const [payloads, setPayloads] = useState<string[]>([]);
  const handleNext = (step: number, payload: any) => {
    setStep(step + 1);
    setPayloads([...payloads, payload]);
  };

  const StepFactory = [
    Question1,
    Question2,
    Question3,
    Question4,
    Question5,
    () => (
      <>
        {' '}
        <div className="question">🎉 谢谢您的反馈!</div>
      </>
    )
  ];
  const CurrentStepComponent = StepFactory[step - 1];
  return (
    <>
      <CurrentStepComponent step={step} stepCount={StepFactory.length - 1} handleNext={handleNext}></CurrentStepComponent>
      <div className="information flex gap-5 mt-3 text-[--question-text_color]">
        <div className="passedCount">通过次数<span className='questionInformation'>24K</span></div>
        <div className="submitCount">提交次数<span className='questionInformation'>51K</span></div>
        <div className="passedRatio">通过率<span className='questionInformation'>47.0%</span></div>
      </div>
    </>
  );
};

export default Questions;
