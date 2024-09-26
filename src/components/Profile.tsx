import { useEffect, useState } from "react";
import { Profile as ProfileType } from "../types";

function Profile({ username }: { username: string | null }) {
  const [description, setDescription] = useState("Description loading...");

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
      } catch (err) {
        console.log(err);
      }
    };
    fetchDescription();
  }, [username]);

  return (
    <div className="test-border">
      <p>
        <span className="font-semibold">Profile</span>: {username}
      </p>
      <p>
        <span className="font-semibold">Description</span>: {description}
      </p>
    </div>
  );
}

export default Profile;
