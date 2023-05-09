import { ReactNode, createContext, useState } from "react";

type DataType = {
  color: 'info' | 'warning' | 'success' | 'danger',
  message: string,
}

type ToastContextType = {
  show: boolean,
  data: DataType | undefined,
  updateToast: (data: DataType) => void,
  hideToast: () => void,
};

export const ToastContext = createContext<ToastContextType>({} as ToastContextType);

type Props = {
  children: ReactNode
}

const ToastContextProvider: React.FC<Props> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState<DataType | undefined>();

  const updateToast = (data: DataType) => {
    setToast(data);
    setVisible(true);
  };

  const hideToast = () => {
    setVisible(false);
    setToast(undefined);
  }

  const value = {
    show: visible,
    data: toast,
    updateToast,
    hideToast
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastContextProvider;