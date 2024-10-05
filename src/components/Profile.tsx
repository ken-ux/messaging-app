import { useEffect, useState } from "react";
import { Profile as ProfileType } from "../types";

function Profile({
  username,
  setProfileUsername,
}: {
  username: string | null;
  setProfileUsername: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/profile?username=" + username,
        );
        if (response.status === 200) {
          const data: ProfileType = await response.json();
          setDescription(data.description);
          setColor(data.color);
        } else {
          setDescription("Description unavailable.");
          setColor(null);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDescription();
  }, [username]);

  return !loading ? (
    <div className="page flex max-w-80 flex-col self-start p-6" tabIndex={0}>
      <p>
        <span className="font-semibold">Profile</span>: {username}
      </p>
      <p>
        <span className="font-semibold">Description</span>: {description}
      </p>
      <div className="flex items-center gap-1">
        <p>
          <span className="font-semibold">Favorite Color</span>:
        </p>
        <input
          type="color"
          value={color ? color : "#ffffff"}
          readOnly
          disabled
          className="flex-1"
        />
      </div>
      <button
        type="button"
        className="mt-2 self-end rounded bg-slate-400 px-1.5 py-0.5 text-sm text-white transition-all hover:bg-slate-500"
        onClick={() => setProfileUsername(null)}
      >
        Close
      </button>
    </div>
  ) : (
    <div>
      <p>Profile loading...</p>
    </div>
  );
}

export default Profile;
