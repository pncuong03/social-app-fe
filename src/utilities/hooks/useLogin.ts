import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "src/app/store";
import routesName from "src/routes/enum.routes";
import { subscribePushNoti } from "src/serviceWorker";
import { userLogin } from "src/slices/login/loginSlice";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onLogin = useCallback(
    async (username: any, password: string) => {
      await dispatch(userLogin({ username, password }));

      const registration = await navigator.serviceWorker.ready;

      if (registration) {
        subscribePushNoti(registration);
      } else {
        console.warn("Service Worker is not ready.");
      }

      navigate(routesName.HOME);
    },
    [dispatch]
  );

  return { onLogin };
};
