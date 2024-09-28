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

export const storeRecents = (user: string) => {
  const recents = localStorage.getItem("recents");

  // Create new list of recent chats if there isn't one.
  if (!recents) {
    localStorage.setItem("recents", JSON.stringify([user]));
    return;
  }

  const recentsArray: [string] = JSON.parse(recents);

  if (!recentsArray.includes(user)) {
    // Remove earliest user from recents lists.
    if (recentsArray.length > 5) {
      recentsArray.splice(4, 1);
    }
    recentsArray.splice(0, 0, user);
  } else {
    // Add user to top of recents list if they're already in it.
    const index = recentsArray.indexOf(user);
    if (index === 0) {
      return;
    } else {
      recentsArray.splice(index, 1);
      recentsArray.splice(0, 0, user);
    }
  }

  localStorage.setItem("recents", JSON.stringify(recentsArray));
};
