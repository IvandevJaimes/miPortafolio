import { useModal } from "@/context/ModalContext";
import { ShareModal, type SharePlatform } from "./ShareModal";
import "./shareButton.css";

interface ShareButtonProps {
  title: string;
  description?: string;
  url?: string;
  platforms?: SharePlatform[];
  label?: string;
}

export const ShareButton = ({
  title,
  description,
  url,
  platforms,
  label = "Compartir",
}: ShareButtonProps) => {
  const { openModal } = useModal();
  const currentUrl = url || window.location.href;

  const handleClick = () => {
    openModal(
      <span className="text-lg font-semibold">Compartir proyecto</span>,
      <ShareModal
        url={currentUrl}
        title={title}
        description={description}
        platforms={platforms}
      />,
    );
  };

  return (
    <button
      className="share-button"
      onClick={handleClick}
      aria-label="Compartir"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
};

export default ShareButton;
