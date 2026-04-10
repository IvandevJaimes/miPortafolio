import { useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profileApi";
import { useModal } from "../context/ModalContext";
import FileIcon from "../components/ui/icons/FileIcon";
import { ModalSkeleton } from "../components/ui/skeletons/ModalSkeleton";
import { NormalButton } from "../components/ui/buttons/NormalButton";

interface Profile {
  cv: string;
  updated_at?: string;
}

interface UseCVDownloadReturn {
  handleDownloadCV: () => void;
  isLoading: boolean;
  profile: Profile | undefined;
}

export const useCVDownload = (): UseCVDownloadReturn => {
  const { openModal } = useModal();
  const modalOpenedWithSkeleton = useRef(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  const getFileName = (url: string): string => {
    const parts = url.split("/");
    const fullName = parts[parts.length - 1];
    const name = fullName.split("_")[0] + "." + fullName.split(".").pop();
    if (name.length > 30) {
      const ext = name.split(".").pop() || "";
      const baseName = name.slice(0, 25);
      return `${baseName}...${ext}`;
    }
    return name;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getFileType = (url: string): "pdf" | "docx" | "generic" => {
    if (url.toLowerCase().endsWith(".pdf")) return "pdf";
    if (url.toLowerCase().endsWith(".docx")) return "docx";
    return "generic";
  };

  const getFileTypeLabel = (type: "pdf" | "docx" | "generic"): string => {
    switch (type) {
      case "pdf":
        return "Documento PDF";
      case "docx":
        return "Documento Word";
      default:
        return "Archivo";
    }
  };

  const openCVDownloadModal = useCallback(
    (showSkeleton = false) => {
      if (showSkeleton) {
        modalOpenedWithSkeleton.current = true;
        openModal(
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Descargar CV
          </h2>,
          <ModalSkeleton />,
        );
        return;
      }

      if (!profile?.cv) {
        openModal(
          <h2 className="text-xl font-bold text-white">CV no disponible</h2>,
          <div className="text-gray-300">
            <p>El CV no está disponible actualmente.</p>
          </div>,
        );
        return;
      }

      const cvUrl = profile.cv;
      const fileType = getFileType(cvUrl);
      const fileName = getFileName(cvUrl);

      openModal(
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Descargar CV
        </h2>,
        <div className="text-gray-300">
          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6 min-w-0">
            <FileIcon type={fileType} className="w-12 h-12 sm:w-16 sm:h-16" />
            <div className="min-w-0">
              <p className="text-base sm:text-lg font-semibold text-white break-all">
                {fileName}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                {getFileTypeLabel(fileType)}
                {profile?.updated_at && (
                  <> · Actualizado el {formatDate(profile.updated_at)}</>
                )}
              </p>
            </div>
          </div>
          <NormalButton
            onClick={() => {
              window.open(cvUrl);
            }}
            className="!py-2 !px-4 !text-sm"
          >
            Descargar
          </NormalButton>
        </div>,
      );
    },
    [openModal, profile],
  );

  const handleDownloadCV = useCallback(() => {
    if (isLoading) {
      openCVDownloadModal(true);
      return;
    }
    openCVDownloadModal(false);
  }, [isLoading, openCVDownloadModal]);

  return {
    handleDownloadCV,
    isLoading,
    profile: profile as Profile | undefined,
  };
};
