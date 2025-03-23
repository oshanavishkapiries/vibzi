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
import { useAuth } from "@/components/common/Auth/AuthProvider";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import Link from "next/link";

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
      <div className="flex flex-row gap-2">
        <Link href="/auth/signin">
          <Button
            className="rounded-full font-semibold text-sm"
            variant="default"
          >
            Sign In
          </Button>
        </Link>

        <Link href="/auth/signup">
          <Button
            className="rounded-full font-semibold text-sm"
            variant="outline"
          >
            Sign Up
          </Button>
        </Link>
      </div>
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
