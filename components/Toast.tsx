import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ToastContext } from "../stores/context/toastContext";

const Toast = () => {
  const { show, data, hideToast } = useContext(ToastContext);
  const toastElm = useRef<HTMLDivElement>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const color = useMemo(() => {
    switch (data?.color) {
      case "info":
        return "bg-sky-400";
      case "warning":
        return "bg-ember-400";
      case "success":
        return "bg-green-400";
      case "danger":
        return "bg-red-400";
      default:
        return "bg-white";
    }
  }, [data]);

  useEffect(() => {
    if (show) {
      setToastVisible(true);
      const timeout = setTimeout(() => {
        toastElm.current?.classList.add('hide');
        clearTimeout(timeout);
        toastElm.current?.addEventListener('animationend', () => {
          setToastVisible(false);
          hideToast();
        });
      }, 3000);
    }
  }, [show, toastElm]);

  if (!toastVisible) {
    return null
  }

  return (
    <div ref={toastElm} className={`toast absolute w-10/12 top-20 left-1/2 -translate-x-1/2 ${color} text-neutral-800 rounded-md shadow-2xl p-3 z-10`}>
      {data?.message}
    </div>
  );
}

export default Toast;