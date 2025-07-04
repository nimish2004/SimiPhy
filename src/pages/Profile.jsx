// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Profile = () => {
  const user = auth.currentUser;
  const [info, setInfo] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const ref = doc(db, "profiles", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setInfo(snap.data());
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const ref = doc(db, "profiles", user.uid);
    await setDoc(ref, info);
    alert("Profile updated!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">👤 My Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            name="name"
            value={info.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Address</label>
          <textarea
            name="address"
            value={info.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter your address"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
