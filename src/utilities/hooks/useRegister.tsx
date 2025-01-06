import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "src/app/store";
import routesName from "src/routes/enum.routes";
import { subscribePushNoti } from "src/serviceWorker";
import { userRegister } from "src/slices/login/loginSlice";

export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onRegister = useCallback(
    async (fullName: string, username: string, password: string, birthday: string) => {
      await dispatch(userRegister({ fullName, username, password, birthday }));

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

  return { onRegister };
};
