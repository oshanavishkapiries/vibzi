export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (
    username: string,
    password: string,
    email: string,
    givenName: string,
    familyName: string,
    birthdate: string,
    gender: string,
    phoneNumber: string
  ) => Promise<void>;
  verifyEmail: (email: string, code: string, resend?: boolean) => Promise<void>;
}
