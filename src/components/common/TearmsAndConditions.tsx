"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ExternalLink, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetUserConsentQuery,
  useSubmitUserConsentMutation,
} from "@/store/api/user/consentSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { signOut } from "@aws-amplify/auth";
import Link from "next/link";

const TermsAndConditions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreement, setAgreement] = useState<"AGREE" | "DISAGREE" | null>(null);
  const router = useRouter();
  const user = useSelector((state: RootState) => state?.auth?.user);

  const { data: consentData, error: consentError } = useGetUserConsentQuery(
    user?.id || "",
    {
      skip: !user?.id,
    }
  );
  const [submitConsent, { isLoading }] = useSubmitUserConsentMutation();

  useEffect(() => {
    if (consentData && consentData.consent !== "AGREED") {
      setIsModalOpen(true);
    }
    if (consentError) {
      setIsModalOpen(true);
      toast.error("Failed to check terms status");
    }
  }, [consentData, consentError]);

  const handleAgreementSubmit = async () => {
    if (!agreement || !user?.id) return;

    if (agreement === "AGREE") {
      try {
        await submitConsent({
          userId: user?.id,
          firstName: user?.name,
          lastName: user?.name,
          email: user?.email,
          consent: "AGREED",
        }).unwrap();

        setIsModalOpen(false);
        toast.success("Terms and conditions accepted");
      } catch (error) {
        console.error("Error submitting agreement:", error);
        toast.error("Failed to submit agreement");
      }
    } else {
      setIsModalOpen(false);
      await signOut();
      window.location.href = "/";
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => {
        if (!agreement) {
          return;
        }
        setIsModalOpen(false);
      }}
    >
      <DialogContent
        className="sm:max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="terms-content">
            <h3 className="font-semibold mb-2">
              <Link href="/terms">
                Please read and accept our terms and conditions
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              By accepting these terms, you agree to our service conditions.
            </p>
          </div>

          <RadioGroup
            value={agreement || ""}
            onValueChange={(value: "AGREE" | "DISAGREE") => setAgreement(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="AGREE" id="agree" />
              <Label htmlFor="agree">I agree to the terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="DISAGREE" id="disagree" />
              <Label htmlFor="disagree">I do not agree</Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button
            variant="link"
            className="-ml-3 mr-auto text-muted-foreground"
            onClick={() => router.push("/terms")}
          >
            Terms and Conditions <ExternalLink />
          </Button>
          <Button variant="outline" onClick={() => setAgreement("DISAGREE")}>
            Cancel
          </Button>
          <Button onClick={handleAgreementSubmit} disabled={!agreement}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;
