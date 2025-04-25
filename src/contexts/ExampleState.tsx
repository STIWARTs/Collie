import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import router from 'next/router';

export interface ExampleStateInterface {
  show: boolean;
}

const ExampleStateContext = createContext({
  Loader: {} as Partial<ExampleStateInterface>,
  setLoader: {} as Dispatch<SetStateAction<Partial<ExampleStateInterface>>>,
});

const ExampleState = ({
  children,
  value = {} as ExampleStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<ExampleStateInterface>;
}) => {
  const [Loader, setLoader] = useState(value);
  useEffect(() => {
    const ShowLoading = () => {
      setLoader({ show: true });
    };
    const HideLoading = () => {
      setLoader({ show: false });
    };
    if (Loader.show === true) {
      router.events.on('routeChangeStart', ShowLoading);
      router.events.on('routeChangeComplete', HideLoading);
      router.events.on('routeChangeError', HideLoading);
      return () => {
        router.events.off('routeChangeStart', ShowLoading);
        router.events.off('routeChangeComplete', HideLoading);
        router.events.off('routeChangeError', HideLoading);
      };
    }
  }, [setLoader, Loader]);
  return (
    <ExampleStateContext.Provider value={{ Loader, setLoader }}>
      {children}
    </ExampleStateContext.Provider>
  );
};

const useExampleState = () => {
  const context = useContext(ExampleStateContext);
  if (!context) {
    throw new Error(
      'useExampleState must be used within a ExampleStateContext'
    );
  }
  return context;
};

export { ExampleState, useExampleState };
