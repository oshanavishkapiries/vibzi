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
import { Trash2, Share2 } from "lucide-react";

const members = [
  { name: "Denver Simonsz", email: "simonszdenver@gmail.com", role: "Owner" },
  { name: "John Doe", email: "johndoe@gmail.com", role: "Member" },
];

const pendingInvites = ["simonszdenver@gmail.com"];

export function CircleDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState("");

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    // Add invite logic here
    setInviteEmail("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Your Circle</DialogTitle>
          <DialogDescription>
            This is your circle—people you&apos;ve invited to the trip. They can
            view the trip details anytime and help edit the plan.
          </DialogDescription>
        </DialogHeader>
        <Tabs.Root defaultValue="members" className="mt-4">
          <Tabs.List className="flex border-b mb-4">
            <Tabs.Trigger
              value="members"
              className="px-4 py-2 font-medium data-[state=active]:border-b-2 data-[state=active]:border-black"
            >
              Members
            </Tabs.Trigger>
            <Tabs.Trigger
              value="pending"
              className="px-4 py-2 font-medium data-[state=active]:border-b-2 data-[state=active]:border-black"
            >
              Pending Invitations
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="members">
            <div className="space-y-4">
              {members.map((member) => (
                <div key={member.email} className="flex items-center gap-4">
                  <Avatar.Root className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Avatar.Fallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <div className="flex-1">
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </div>
                  <div className="text-sm text-gray-400 mr-4">
                    {member.role}
                  </div>
                  {member.role !== "Owner" && (
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Tabs.Content>
          <Tabs.Content value="pending">
            <form onSubmit={handleInvite} className="flex gap-2 mb-4">
              <Input
                placeholder="Email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Invite</Button>
            </form>
            <div className="space-y-4">
              {pendingInvites.map((email) => (
                <div key={email} className="flex items-center gap-4">
                  <Avatar.Root className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Avatar.Fallback>{email[0].toUpperCase()}</Avatar.Fallback>
                  </Avatar.Root>
                  <div className="flex-1 text-gray-700">{email}</div>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </DialogContent>
    </Dialog>
  );
}
