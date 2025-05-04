"use client";
import { store } from "@/store/store";

import { Provider } from "react-redux";

const ReduxProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  store.subscribe(() => {
    console.log('Redux Store State:', store.getState());
  });
  
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
