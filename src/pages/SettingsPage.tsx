import { useState } from "react";

function SettingsPage() {
  const [textLength, setTextLength] = useState(0);
  const [message, setMessage] = useState("");

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
    <form onSubmit={formHandler}>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          maxLength={100}
          onChange={(e) => {
            setTextLength(e.target.value.length);
          }}
        />
        <span>{textLength}/100</span>
      </div>
      <div>
        <label htmlFor="color">Profile Color</label>
        <input type="color" id="color" name="color" />
      </div>
      <button type="submit" className="bg-slate-100">
        Save
      </button>
      <p>{message}</p>
    </form>
  );
}

export default SettingsPage;
