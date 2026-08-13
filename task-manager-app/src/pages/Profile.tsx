import React, { useState } from "react";
import { toast } from "react-toastify";
import PageLayout from "../components/layout/PageLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const saveProfile = () => {
    toast.success("Profile updated");
  };

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="font-h1 text-h1 text-on-surface mb-8">User Profile</h1>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <InputField
            label="Name"
            value={username}
            placeholder="Your Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            label="Email Address"
            value={email}
            placeholder="name@company.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={saveProfile} className="w-full">
            Save Profile
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
