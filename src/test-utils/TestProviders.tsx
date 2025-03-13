import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "../lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { store,persistor } from "../store";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const TestProviders = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                    {children}
            </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};
