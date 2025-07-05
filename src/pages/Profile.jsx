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
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

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
    if (!user) return;
    setSaving(true);
    try {
      const ref = doc(db, "profiles", user.uid);
      await setDoc(ref, info);
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 mt-8 bg-white border border-gray-200 rounded-xl shadow-md animate-fade-in">
        {/* <div className="w-full px-4 sm:px-8 py-6 mt-8 bg-white shadow rounded-md"> */}

        <h2 className="text-3xl font-bold mb-6 text-blue-700">👤 My Profile</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              name="name"
              value={info.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
            <textarea
              name="address"
              value={info.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
              placeholder="Enter your shipping address"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 text-white rounded transition ${
              saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          {message && (
            <p className="text-sm mt-3 text-green-600 font-medium animate-fade-in">
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
