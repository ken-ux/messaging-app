import { XMarkIcon } from "@heroicons/react/20/solid";

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="test-border min-w-96">
      <div className="test-border flex h-6 justify-end">
        <XMarkIcon className="h-full" />
      </div>
      {children}
    </div>
  );
}

export default ContentWrapper;
