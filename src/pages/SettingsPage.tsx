import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Profile as ProfileType } from "../types";

function SettingsPage() {
  const navigate = useNavigate();
  const [textLength, setTextLength] = useState(0);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [valid, setValid] = useState(false);

  // Populates previous settings into UI.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/profile?username=" + user,
        );
        if (response.status === 200) {
          const data: ProfileType = await response.json();
          setDescription(data.description);
          setColor(data.color);
          if (description) {
            setTextLength(description.length);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [description]);

  // Handles updating settings.
  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as HTMLFormControlsCollection & {
      description: HTMLTextAreaElement;
      color: HTMLInputElement;
    };

    const formData = {
      description: elements.description.value,
      color: elements.color.value,
    };

    try {
      const user = localStorage.getItem("user");
      const url = import.meta.env.VITE_API_URL + "/profile?username=" + user;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setValid(true);
        setMessage("Settings saved!");
        setTimeout(() => {
          setMessage("");
        }, 4000);
      } else {
        setValid(false);
        setMessage("Error saving settings. Try again later.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handles account deletion.
  const buttonHandler = async () => {
    try {
      const user = localStorage.getItem("user");
      const url = import.meta.env.VITE_API_URL + "/delete?username=" + user;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        setValid(true);
        setMessage("Account deleted. Redirecting to homepage.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("recents");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        setValid(false);
        setMessage(
          "Error deleting account. Try again later or email website administrator.",
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={formHandler}
      className="page flex grow flex-col gap-2 self-start p-6 transition-all hover:shadow-md sm:max-w-96"
    >
      <h1 className="text-lg font-semibold">User Settings</h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          maxLength={100}
          onChange={(e) => {
            setTextLength(e.target.value.length);
          }}
          defaultValue={description ? description : ""}
          className="rounded border border-slate-300 p-2"
        />
        <span className="text-right">{textLength}/100</span>
      </div>
      <div className="flex gap-2">
        <label htmlFor="color" className="font-medium">
          Favorite Color
        </label>
        <input
          type="color"
          id="color"
          name="color"
          defaultValue={color ? color : "#000000"}
          className="max-w-24 grow"
        />
      </div>
      <button
        type="submit"
        className="self-end rounded bg-indigo-400 px-2 py-1 text-sm text-white transition-all hover:bg-indigo-500"
      >
        Save Settings
      </button>
      <button
        type="button"
        onClick={buttonHandler}
        className="self-end rounded bg-red-400 px-2 py-1 text-sm text-white transition-all hover:bg-red-700"
      >
        Delete Account
      </button>
      {message && (
        <div
          className={
            "flex items-center gap-2 rounded px-2 py-1 font-medium " +
            (valid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")
          }
        >
          {valid ? (
            <CheckCircleIcon className="h-5 w-5" />
          ) : (
            <ExclamationCircleIcon className="h-5 w-5" />
          )}
          <p>{message}</p>
        </div>
      )}
    </form>
  );
}

export default SettingsPage;
