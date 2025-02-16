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
import { useRouter } from "next/navigation";

const Profile = () => {
  const auth = useAuth();
  const user = useSelector((state: any) => state.meta.user);
  const router = useRouter();

  const signOutRedirect = () => {
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const logoutUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI || "";
    const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_AUTHORITY || "";
    router.push(
      `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
        logoutUri
      )}`
    );
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {/* {user.picture && <AvatarImage src={user.picture} alt={user.name} />} */}
          {user && (
            <AvatarFallback>
              {user.email.toUpperCase().slice(0, 2)}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuItem className="font-medium">{user.name}</DropdownMenuItem> */}
        <DropdownMenuItem className="text-sm text-muted-foreground">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onClick={() => {
            auth.removeUser();
            signOutRedirect();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
