"use client";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useSelector(
    (state: RootState) => state.auth
  );

  if (loading) {
    return (
      <div className="container mx-auto min-h-[500px] flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <>
      {!user && (
        <div className="container mx-auto min-h-[500px] flex flex-col justify-center items-center gap-4">
          <h2 className="text-xl font-semibold">Sign In Required</h2>
          <p className="text-center text-muted-foreground">
            Sign in to plan your Perfect Trip
          </p>
          <Button
            className="rounded-md px-4 py-2 bg-primary text-white"
            variant="outline"
            onClick={() => router.push("/auth/signin")}
          >
            <LogIn className="w-4 h-4" /> Sign In
          </Button>
        </div>
      )}
      {user && children}
    </>
  );
};

export default AuthMiddleware;
