import { XMarkIcon } from "@heroicons/react/20/solid";

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="test-border min-w-96 bg-green-100">
      <div className="m-2 flex h-6 justify-end bg-red-100">
        <XMarkIcon className="h-full" />
      </div>
      <div className="m-2 bg-red-100 p-2">{children}</div>
    </div>
  );
}

export default ContentWrapper;
