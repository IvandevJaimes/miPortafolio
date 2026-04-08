interface FileIconProps {
  type: "pdf" | "docx" | "generic";
  className?: string;
}

const FileIcon = ({ type, className = "" }: FileIconProps) => {
  const baseClasses = "rounded-lg flex items-center justify-center flex-shrink-0";

  if (type === "pdf") {
    return (
      <div className={`${baseClasses} bg-red-600 ${className}`}>
        <svg
          className="w-7 h-7 sm:w-10 sm:h-10 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1zm4 3.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5zm3.5-3.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5zm0 3.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5z" />
        </svg>
      </div>
    );
  }

  if (type === "docx") {
    return (
      <div className={`${baseClasses} bg-blue-600 ${className}`}>
        <svg
          className="w-7 h-7 sm:w-10 sm:h-10 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 3h8v2H8v-2zm0 3h5v2H8v-2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} bg-gray-600 ${className}`}>
      <svg
        className="w-7 h-7 sm:w-10 sm:h-10 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      </svg>
    </div>
  );
};

export default FileIcon;