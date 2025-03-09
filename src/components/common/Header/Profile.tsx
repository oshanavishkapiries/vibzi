"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useAuth } from "@/components/common/Auth/AuthProvider";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import SignInPopup from "../Auth/SignInPopup";

const Profile = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return (
      <SignInPopup>
        <Button className="rounded-full" variant="outline">
          <LogIn className="w-4 h-4" /> Sign In
        </Button>
      </SignInPopup>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user && (
          <Avatar>
            <AvatarFallback>
              {user.email.toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
