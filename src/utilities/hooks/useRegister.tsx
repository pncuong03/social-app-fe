import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "src/app/store";
import routesName from "src/routes/enum.routes";
import { userRegister } from "src/slices/login/loginSlice";

export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onRegister = useCallback(
    async (fullName: string, username: string, password: string, birthday: string) => {
      await dispatch(userRegister({ fullName, username, password, birthday }));
      navigate(routesName.HOME);
    },
    [dispatch]
  );

  return { onRegister };
};
