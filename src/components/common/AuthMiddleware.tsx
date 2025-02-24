"use client";
import { useAuth } from "react-oidc-context";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated && isClient) {
      setShowAuthDialog(true);
    }
  }, [auth.isLoading, auth.isAuthenticated, isClient]);

  const handleDialogChange = (open: boolean) => {
    setShowAuthDialog(open);
    if (!open) {
      router.push("/");
    }
  };

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

  if (auth.error) {
    return (
      <div className="container mx-auto min-h-[500px] flex justify-center items-center">
        Error: {auth.error.message}
      </div>
    );
  }

  return (
    <>
      {!auth.isAuthenticated && (
        <div className="container mx-auto flex justify-center items-center">
          <Dialog open={showAuthDialog} onOpenChange={handleDialogChange}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Sign In Required
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4">
                <Image src="/signin.gif" alt="Logo" width={100} height={100} />
                <p className="text-center text-muted-foreground">
                  Sign in to plan your Perfect Trip
                </p>
                <Button
                  onClick={() => auth.signinRedirect()}
                  className="w-full rounded-full"
                >
                  Sign In
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {auth.isAuthenticated && children}
    </>
  );
};

export default AuthMiddleware;
