import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "src/app/store";
import routesName from "src/routes/enum.routes";
import { userLogin } from "src/slices/login/loginSlice";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onLogin = useCallback(
    async (username: any, password: string) => {
      await dispatch(userLogin({ username, password }));
      navigate(routesName.HOME);
    },
    [dispatch]
  );

  return { onLogin };
};
