import { useEffect, useState } from "react";
import { Profile as ProfileType } from "../types";

function SettingsPage() {
  const [textLength, setTextLength] = useState(0);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

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
        setMessage("Settings saved!");
        setTimeout(() => {
          setMessage("");
        }, 4000);
      } else {
        setMessage("Error saving settings. Try again later.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={formHandler}
      className="page flex flex-col gap-2 self-start p-6 transition-all hover:shadow-md"
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
      <div className="flex gap-1">
        <label htmlFor="color" className="font-medium">
          Favorite Color
        </label>
        <input
          type="color"
          id="color"
          name="color"
          defaultValue={color ? color : "#000000"}
          className="grow"
        />
      </div>
      {/* <button type="button">Delete Account</button> */}
      <button
        type="submit"
        className="self-center rounded bg-indigo-400 px-2 py-1 text-sm text-white transition-all hover:bg-indigo-500"
      >
        Save Settings
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default SettingsPage;
