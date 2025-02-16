"use client";
import { useAuth } from "react-oidc-context";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const auth = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (auth.isLoading) {
    return (
      <div className="container mx-auto min-h-[500px] flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      </div>
    );
  }

  if (!auth.isLoading && !auth.isAuthenticated) {
    return (
      <div className="container mx-auto min-h-[500px] flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Sign In Required</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-center text-muted-foreground">
              Please sign in to access this content
            </p>
            <Button onClick={() => auth.signinRedirect()}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="container mx-auto min-h-[500px] flex justify-center items-center">
        Error: {auth.error.message}
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="container mx-auto min-h-[500px] flex justify-center items-center">
        Redirecting to login...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthMiddleware;
