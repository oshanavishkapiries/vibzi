"use client";
import { AuthProvider, useAuth } from "react-oidc-context";
import cognitoAuthConfig from "@/utils/authConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/metaSlice";

const AWSProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider {...cognitoAuthConfig}>
      <StateProvider>{children}</StateProvider>
    </AuthProvider>
  );
};

export default AWSProvider;

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
     
      dispatch(
        setUser({
          id: auth.user.profile.sub || "",
          name: (auth.user.profile["cognito:username"] as string) || "",
          email: auth.user.profile.email || "",
          picture: auth.user.profile.picture,
        })
      );
    } else {
      dispatch(setUser(null));
    }
  }, [auth.isAuthenticated, auth.user, dispatch]);

  return <>{children}</>;
};
