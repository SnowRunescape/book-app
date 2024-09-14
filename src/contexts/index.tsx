import ReactQueryProvider from "@/contexts/providers/react-query";
import { UserProvider } from "@/contexts/providers/user";
import { ReactNode } from "react";

const Providers = (props: {
  children: ReactNode
}) => {
  const { children } = props;

  return (
    <ReactQueryProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ReactQueryProvider>
  )
}

export default Providers;
