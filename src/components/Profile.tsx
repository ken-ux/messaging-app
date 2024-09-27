import { useEffect, useState } from "react";
import { Profile as ProfileType } from "../types";

function Profile({ username }: { username: string | null }) {
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/profile?username=" + username,
        );
        if (response.status === 200) {
          const data: ProfileType = await response.json();
          setDescription(data.description);
        } else {
          setDescription("Description unavailable.");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDescription();
  }, [username]);

  return !loading ? (
    <div className="test-border">
      <p>
        <span className="font-semibold">Profile</span>: {username}
      </p>
      <p>
        <span className="font-semibold">Description</span>: {description}
      </p>
    </div>
  ) : (
    <div>
      <p>Profile loading...</p>
    </div>
  );
}

export default Profile;
