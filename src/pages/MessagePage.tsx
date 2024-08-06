import { useParams } from "react-router-dom";

function MessagePage() {
  const { user } = useParams();

  return (
    <div className="flex flex-col gap-2">
      <div className="max-h-96 bg-white p-2">
        <p>{user}: Hello</p>
        <p>me: hi</p>
      </div>

      <form action="" className="flex gap-2">
        <textarea
          name="message"
          id="message"
          aria-label="message"
          className="grow"
        ></textarea>
        <button type="submit" className="bg-slate-100 px-4">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessagePage;
