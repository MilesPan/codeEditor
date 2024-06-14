import './joinRoom.css';
import { FC, useEffect, useMemo, useState } from 'react';
import { LocalUserChoices, PreJoin } from '@livekit/components-react';
import { useTheme } from '@/components/ThemeProvider';
import { Input, message } from 'antd';
import cs from 'classnames';
import { ArrowLeft, ArrowRight, Shuffle } from 'lucide-react';
import * as utils from '@Utils/index';
import { findOrCreateRoomReq } from '@Request/room';
import { useRequest } from 'ahooks';
const JoinRoom: FC = () => {
  const { resolvedTheme } = useTheme();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);
  const preJoinDefaults = useMemo(() => {
    return {
      username: '',
      videoEnabled: true,
      audioEnabled: true
    };
  }, []);

  const [step, setStep] = useState(1);
  const nextStep = () => setStep(_step => _step + 1);
  const prevStep = () => setStep(_step => _step - 1);

  const [roomId, setRoomId] = useState('');
  const handleSubmit = (choices: LocalUserChoices) => {
    console.log(choices);
  };

  const generateRoomId = () => {
    setRoomId(utils.generateRoomId());
  };

  const { loading, runAsync } = useRequest(findOrCreateRoomReq, { manual: true });
  const goToPreJoin = async () => {
    if (!utils.validRoomId(roomId)) return messageApi.error('房间ID只可以输入字母和数字');
    await runAsync(roomId);
    // nextStep();
  };
  return (
    <>
      {contextHolder}
      <div className="joinRoom flex items-center justify-center h-full">
        {step === 1 && (
          <>
            <div data-aos="fade-up">
              <div className="flex items-center gap-2">
                <label className="text-nowrap cursor-text text-lg">房间号</label>
                <Input
                  className="flex-1"
                  value={roomId}
                  onChange={e => setRoomId(e.target.value)}
                  suffix={<Shuffle size={16} className="opacity-75 _hoverBtnRight" onClick={generateRoomId} />}
                ></Input>
                <ArrowRight
                  className={cs(roomId ? '_hoverBtnRight opacity-100' : 'opacity-0')}
                  onClick={goToPreJoin}
                  size={20}
                />
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className={cs('card')} data-aos="fade-up">
              <div className="header flex items-center mb-2 absolute -left-10 top-1/2 -translate-y-1/2">
                <ArrowLeft size={24} className="_hoverBtnLeft" onClick={prevStep}></ArrowLeft>
              </div>
              <PreJoin
                defaults={preJoinDefaults}
                micLabel="麦克风"
                camLabel="摄像头"
                joinLabel="加入"
                userLabel="用户名"
                data-lk-theme="default"
                onSubmit={handleSubmit}
              ></PreJoin>
            </div>
          </>
        )}
        {loading && <div>loading...</div>}
      </div>
    </>
  );
};

export default JoinRoom;
