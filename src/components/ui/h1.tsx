import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const H1 = (props: Props) => {
  const { children } = props;

  return (
    <h1 className="text-3xl font-bold tracking-tight">{children}</h1>
  );
}

export default H1;
