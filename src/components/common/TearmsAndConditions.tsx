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
import { useAuth } from "react-oidc-context";

// GET http://localhost:8082/api/v1/common-service/user-consent
//   AGREED / DISAGREED / PENDING

// POST   http://localhost:8082/api/v1/common-service/user-consent/12345
// {
//     "userId": "12345",
//     "consent": "AGREED"
//   }

interface ConsentResponse {
  consent: "AGREED" | "DISAGREED" | "PENDING";
}

const TermsAndConditions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreement, setAgreement] = useState<"AGREE" | "DISAGREE" | null>(null);
  const auth = useAuth();

  useEffect(() => {
    checkTermsStatus();
  }, []);

  const host = process.env.NEXT_PUBLIC_API_URL;

  const client_url = process.env.NEXT_PUBLIC_COGNITO_AUTHORITY;
  const client_id = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  const key = `oidc.user:${client_url}:${client_id}`;

  const checkTermsStatus = async () => {
    try {
      const token = JSON.parse(
        sessionStorage.getItem(key) || "{}"
      ).access_token;
      const userId = JSON.parse(sessionStorage.getItem(key) || "{}").profile
        .sub;

      if (!token) return;

      const response = await fetch(
        `${host}/common-service/user-consent/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data: ConsentResponse = await response.json();

      console.log("Data", data);

      if (data.consent !== "AGREED") {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error checking terms status:", error);
      toast.error("Failed to check terms status");
    }
  };

  const handleAgreementSubmit = async () => {
    if (!agreement) return;

    const token = JSON.parse(sessionStorage.getItem(key) || "{}").access_token;
    const userId = JSON.parse(sessionStorage.getItem(key) || "{}").profile.sub;
    const firstName = JSON.parse(sessionStorage.getItem(key) || "{}").profile
      .sub;
    const lastName = JSON.parse(sessionStorage.getItem(key) || "{}").profile
      .sub;
    const email = JSON.parse(sessionStorage.getItem(key) || "{}").profile.email;

    if (!token) return;

    if (agreement === "AGREE") {
      try {
        const response = await fetch(`${host}/common-service/user-consent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            consent: "AGREED",
          }),
        });

        if (response.ok) {
          setIsModalOpen(false);
          toast.success("Terms and conditions accepted");
        } else {
          throw new Error("Failed to submit agreement");
        }
      } catch (error) {
        console.error("Error submitting agreement:", error);
        toast.error("Failed to submit agreement");
      }
    } else {
      toast.warning(
        "Please agree to terms and conditions to use the application"
      );
      auth.removeUser();
      auth.signoutSilent();
      window.location.href = "/";
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="terms-content">
            <h3 className="font-semibold mb-2">
              Please read and accept our terms and conditions
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {/* Your terms and conditions text here */}
              By accepting these terms, you agree to our service conditions...
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
          <Button variant="outline" onClick={() => setAgreement("DISAGREE")}>
            Cancel
          </Button>
          <Button onClick={handleAgreementSubmit} disabled={!agreement}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;
