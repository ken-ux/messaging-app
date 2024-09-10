export const auth = async (): Promise<boolean> => {
  try {
    const url = import.meta.env.VITE_API_URL + "/auth";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ username: localStorage.getItem("user") }),
    });

    if (response.status !== 200) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return false;
  }
};
