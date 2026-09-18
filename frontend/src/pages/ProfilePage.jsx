import { useState } from "react";
import toast from "react-hot-toast";
import {
  Camera,
  Loader2,
  Mail,
  User,
  UserRound,
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore.js";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
  } = useAuthStore();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;

      setSelectedImage(base64Image);

      await updateProfile({
        profilePic: base64Image,
      });
    };
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Profile</h1>

            <p className="mt-2 text-base-content/60">
              Manage your profile picture and account information
            </p>
          </div>

          <div className="mb-8 flex flex-col items-center">
            <div className="relative">
              <div className="avatar">
                <div className="flex size-32 items-center justify-center overflow-hidden rounded-full bg-base-300">
                  {selectedImage || authUser?.profilePic ? (
                    <img
                      src={selectedImage || authUser.profilePic}
                      alt={`${authUser?.fullName}'s profile`}
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserRound className="size-16 text-base-content/40" />
                  )}
                </div>
              </div>

              <label
                htmlFor="profile-picture"
                className={`btn btn-circle btn-primary absolute bottom-0 right-0 ${
                  isUpdatingProfile
                    ? "pointer-events-none opacity-60"
                    : "cursor-pointer"
                }`}
              >
                {isUpdatingProfile ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Camera className="size-5" />
                )}

                <input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="mt-4 text-sm text-base-content/60">
              {isUpdatingProfile
                ? "Uploading profile picture..."
                : "Click the camera icon to upload a new picture"}
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-base-content/60">
                <User className="size-4" />
                Full name
              </div>

              <div className="rounded-lg border border-base-300 bg-base-200 px-4 py-3">
                {authUser?.fullName}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-base-content/60">
                <Mail className="size-4" />
                Email
              </div>

              <div className="rounded-lg border border-base-300 bg-base-200 px-4 py-3">
                {authUser?.email}
              </div>
            </div>

            <div className="divider">Account information</div>

            <div className="flex justify-between text-sm">
              <span className="text-base-content/60">Member since</span>

              <span>
                {authUser?.createdAt
                  ? new Date(authUser.createdAt).toLocaleDateString()
                  : "Unavailable"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-base-content/60">Account status</span>
              <span className="font-medium text-success">Active</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;