"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "@/store/slices/authSlice";
import {
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  getCurrentUser,
  signUp as amplifySignUp,
  fetchUserAttributes,
  confirmSignUp,
  resendSignUpCode,
  confirmResetPassword,
  resetPassword as amplifyForgotPassword,
  ResetPasswordOutput,
} from "@aws-amplify/auth";
import { AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      dispatch(setLoading(true));
      try {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();

        if (currentUser) {
          localStorage.setItem("user_id", currentUser.userId);
        }

        dispatch(
          setUser({
            id: currentUser.userId,
            name: attributes.preferred_username || attributes.email || "",
            email: attributes.email || "",
            picture: attributes.picture || undefined,
          })
        );
      } catch (error) {
        dispatch(setUser(null));
        if (error instanceof Error) {
          dispatch(setError(error.message));
        }
      } finally {
        dispatch(setLoading(false));
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [dispatch]);

  const signIn = async (username: string, password: string) => {
    dispatch(setLoading(true));
    try {
      await amplifySignIn({ username, password });
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      dispatch(
        setUser({
          id: currentUser.userId,
          name: attributes.preferred_username || attributes.email || "",
          email: attributes.email || "",
          picture: attributes.picture || undefined,
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signOut = async () => {
    dispatch(setLoading(true));
    try {
      await amplifySignOut();
      localStorage.removeItem("user_id");
      dispatch(setUser(null));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signUp = async (
    username: string,
    password: string,
    email: string,
    givenName: string,
    familyName: string,
    birthdate: string,
    gender: string,
    phoneNumber: string
  ) => {
    dispatch(setLoading(true));
    try {
      await amplifySignUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            given_name: givenName,
            family_name: familyName,
            birthdate,
            gender,
            phone_number: phoneNumber,
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const verifyEmail = async (
    email: string,
    code: string,
    resend: boolean = false
  ) => {
    dispatch(setLoading(true));
    try {
      if (resend) {
        await resendSignUpCode({ username: email });
        return;
      }

      await confirmSignUp({ username: email, confirmationCode: code });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const output = await amplifyForgotPassword({ username: email });
      localStorage.setItem("reset_email", email);
      handleResetPasswordNextSteps(output);
    } catch (error) {
      return error;
    }
  };

  function handleResetPasswordNextSteps(output: ResetPasswordOutput) {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case "CONFIRM_RESET_PASSWORD_WITH_CODE":
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case "DONE":
        console.log("Successfully reset password.");
        break;
    }
  }

  const resetPassword = async (
    confirmationCode: string,
    newPassword: string
  ) => {
    try {
      const username = localStorage.getItem("reset_email") || "";
      await confirmResetPassword({ username, confirmationCode, newPassword });
    } catch (error) {
      return error;
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        verifyEmail,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
