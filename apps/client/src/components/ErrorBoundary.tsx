import { FC } from 'react';

const ErrorBoundary: FC = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-10">
      <h1 className="text-3xl">Oops!</h1>
      <p className="text-lg">Sorry, an unexpected error has occurred.</p>
    </div>
  );
};

export default ErrorBoundary;
