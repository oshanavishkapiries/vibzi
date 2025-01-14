import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  return (
    <Avatar>
      {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
      <AvatarFallback>
            CN
      </AvatarFallback>
    </Avatar>
  );
};

export default Profile;
