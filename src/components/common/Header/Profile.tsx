"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "react-oidc-context";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Profile = () => {
  const auth = useAuth();
  const user = useSelector((state: any) => state.meta.user);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      await auth.removeUser();
      await auth.signoutRedirect({
        post_logout_redirect_uri: window.location.origin,
      });
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  if (!user) {
    return (
      <Button
        className="rounded-full"
        variant="outline"
        onClick={() => auth.signinRedirect()}
      >
        <LogIn className="w-4 h-4" /> Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* {user.picture && <AvatarImage src={user.picture} alt={user.name} />} */}
        {user && (
          <Avatar>
            <AvatarFallback>
              {user.email.toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuItem className="font-medium">{user.name}</DropdownMenuItem> */}
        <DropdownMenuItem className="text-sm text-muted-foreground">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
