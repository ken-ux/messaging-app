function SettingsPage() {
  return (
    <form action="">
      <div>
        <label htmlFor="display_name">Display Name</label>
        <input type="text" id="display_name" name="display_name" />
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
