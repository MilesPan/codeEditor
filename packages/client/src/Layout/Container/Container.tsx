import Header from '../Header/Header';
import Main from '../Main/Main';
import { FC } from 'react';

const Container: FC = () => {
  return (
    <>
      <div className="flex flex-col h-full min-w-[1000px]">
        <Header></Header>
        <Main></Main>
      </div>
    </>
  );
};

export default Container;
