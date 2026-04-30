import React, { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const saveProfile = () => {
    alert("Profile updated");
  };

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="font-h1 text-h1 text-on-surface mb-8">User Profile</h1>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <InputField
            label="Name"
            value={name}
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
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
