"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Tabs from "@radix-ui/react-tabs";
import * as Avatar from "@radix-ui/react-avatar";
import { Trash2, Loader2, X, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import {
  useGetTripMembersQuery,
  useSearchUsersMutation,
  useSendTripInviteMutation,
  useGetPendingInvitesQuery,
  useDeleteInviteMutation,
  useDeleteTripMemberMutation,
} from "@/store/api/collaboration/collaborationSlice";
import { toast } from "sonner";

interface SelectedUser {
  userId: string;
  email: string;
  fullName: string;
}

export function CircleDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<SelectedUser[]>([]);
  const [isInviting, setIsInviting] = React.useState(false);
  const tripid = useSelector((state: any) => state.meta.trip.tripId);
  const currentUser = useSelector((state: any) => state.auth.user);
  // const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  // const [memberToDelete, setMemberToDelete] = React.useState<string | null>(
  //   null
  // );
  const {
    data: tripMembersData,
    isLoading: isLoadingMembers,
    error: membersError,
    refetch: refetchMembers,
  } = useGetTripMembersQuery(tripid, {
    skip: !open || !tripid,
  });

  // Get pending invites
  const { data: pendingInvites, isLoading: isLoadingPendingInvites } =
    useGetPendingInvitesQuery(
      {
        tripId: tripid,
        tripInviteStatus: "PENDING",
      },
      {
        skip: !open || !tripid,
      },
    );

  // Search users mutation
  const [searchUsers] = useSearchUsersMutation();
  const [sendInvite] = useSendTripInviteMutation();
  const [deleteInvite] = useDeleteInviteMutation();
  const [deleteTripMember] = useDeleteTripMemberMutation();

  const isOwner = tripMembersData?.collaboratorUserDtos?.some(
    (member) =>
      member.email === currentUser?.email &&
      member.tripCollaboratorRole === "OWNER",
  );

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        try {
          const result = await searchUsers({
            email: searchQuery,
            givenName: null,
            familyName: null,
          }).unwrap();

          const filteredResults = result.filter(
            (user) =>
              !selectedUsers.some(
                (selected) => selected.userId === user.userId,
              ) &&
              !tripMembersData?.collaboratorUserDtos.some(
                (member) => member.email === user.email,
              ) &&
              !pendingInvites?.some((invite) => invite.email === user.email),
          );
          setSearchResults(filteredResults);
        } catch (error) {
          console.log(error);
          toast.error("Failed to search users");
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    searchQuery,
    searchUsers,
    selectedUsers,
    tripMembersData,
    pendingInvites,
  ]);

  const handleUserSelect = (user: SelectedUser) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleUserRemove = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.userId !== userId));
  };

  const handleInviteDelete = async (inviteId: string) => {
    try {
      await deleteInvite(inviteId).unwrap();
      toast.success("Invite deleted successfully");
      refetchMembers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete invite");
    }
  };

  const handleLeaveTrip = async (email: string) => {
    try {
      await deleteTripMember({
        tripId: tripid,
        email: email,
      }).unwrap();
      toast.success(
        isOwner ? "Member removed successfully" : "Left trip successfully",
      );
      refetchMembers();
    } catch (error) {
      console.log(error);
      toast.error(isOwner ? "Failed to remove member" : "Failed to leave trip");
    }
  };

  async function handleInvite() {
    if (selectedUsers.length === 0) return;

    setIsInviting(true);
    try {
      for (const user of selectedUsers) {
        await sendInvite({
          tripId: tripid,
          email: user.email,
          fullName: user.fullName,
          userId: user.userId,
        }).unwrap();
        toast.success(`Invitation sent to ${user.email}`);
      }
      setSelectedUsers([]);
      refetchMembers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to send invitations");
    } finally {
      setIsInviting(false);
    }
  }

  if (membersError) {
    toast.error("Failed to load trip members");
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle>Your Circle</DialogTitle>
            <DialogDescription>
              {isOwner
                ? "This is your circle people you've invited to the trip. They can view the trip details anytime and help edit the plan."
                : "View the members of this trip."}
            </DialogDescription>
            {isOwner && (
              <div className="flex flex-col gap-2 mb-4">
                <div className="relative">
                  <Input
                    placeholder="Search by email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {isSearching && (
                    <div className="absolute right-2 top-2">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                      {searchResults.map((user) => (
                        <div
                          key={user.userId}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleUserSelect(user)}
                        >
                          <div className="font-medium">{user.fullName}</div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedUsers.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedUsers.map((user) => (
                      <div
                        key={user.userId}
                        className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm"
                      >
                        <span>{user.email}</span>
                        <button
                          onClick={() => handleUserRemove(user.userId)}
                          className="hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {selectedUsers.length > 0 && (
                  <Button
                    onClick={handleInvite}
                    disabled={isInviting}
                    className="mt-2"
                  >
                    {isInviting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Invites...
                      </>
                    ) : (
                      `Invite ${selectedUsers.length} User${
                        selectedUsers.length > 1 ? "s" : ""
                      }`
                    )}
                  </Button>
                )}
              </div>
            )}
          </DialogHeader>
          <Tabs.Root defaultValue="members" className="mt-4">
            <Tabs.List className="flex border-b mb-4">
              <Tabs.Trigger
                value="members"
                className="px-4 py-2 font-medium data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Members
              </Tabs.Trigger>
              {isOwner && (
                <Tabs.Trigger
                  value="pending"
                  className="px-4 py-2 font-medium data-[state=active]:border-b-2 data-[state=active]:border-black"
                >
                  Pending
                </Tabs.Trigger>
              )}
            </Tabs.List>
            <Tabs.Content value="members">
              {isLoadingMembers ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                </div>
              ) : (
                <div className="space-y-4">
                  {tripMembersData?.collaboratorUserDtos.map((member) => (
                    <div key={member.email} className="flex items-center gap-4">
                      <Avatar.Root className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Avatar.Fallback>
                          {member.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <div className="flex-1">
                        <div className="font-semibold">{member.fullName}</div>
                        <div className="text-sm text-gray-500">
                          {member.email}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        {member.tripCollaboratorRole}
                      </div>
                      {member.tripCollaboratorRole !== "OWNER" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleLeaveTrip(member.email)}
                          className="mr-2"
                        >
                          {isOwner ? (
                            <Trash2 className="w-5 h-5 text-red-500" />
                          ) : member.email === currentUser?.email ? (
                            <LogOut className="w-5 h-5 text-red-500" />
                          ) : null}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Tabs.Content>
            {isOwner && (
              <Tabs.Content value="pending">
                {isLoadingPendingInvites ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                ) : pendingInvites && pendingInvites.length > 0 ? (
                  <div className="space-y-4">
                    {pendingInvites.map((invite) => (
                      <div key={invite.id} className="flex items-center gap-4">
                        <Avatar.Root className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Avatar.Fallback>
                            {invite.email.charAt(0).toUpperCase()}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <div className="flex-1">
                          <div className="font-semibold">
                            {invite.fullName || invite.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {invite.email}
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">Pending</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleInviteDelete(invite.id)}
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500 py-4">
                    No pending invitations
                  </div>
                )}
              </Tabs.Content>
            )}
          </Tabs.Root>
        </DialogContent>
      </Dialog>
    </>
  );
}
