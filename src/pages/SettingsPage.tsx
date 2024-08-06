import { useState } from "react";

function SettingsPage() {
  const [textLength, setTextLength] = useState(0);

  return (
    <form action="">
      <div>
        <label htmlFor="display_name">Display Name</label>
        <input type="text" id="display_name" name="display_name" maxLength={20} />
      </div>
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
    </form>
  );
}

export default SettingsPage;
