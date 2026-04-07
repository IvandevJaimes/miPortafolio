import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { Modal } from "../components/ui/modal/Modal";

interface ModalState {
  isOpen: boolean;
  title: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

interface ModalContextType {
  openModal: (
    title: ReactNode,
    children?: ReactNode,
    footer?: ReactNode,
  ) => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: "",
    children: null,
    footer: null,
  });

  const openModal = useCallback(
    (title: ReactNode, children: ReactNode, footer?: ReactNode) => {
      setModalState({
        isOpen: true,
        title,
        children,
        footer: footer ?? null,
      });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  useEffect(() => {
    if (modalState.isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalState.isOpen]);

  const defaultFooter = (
    <button
      onClick={closeModal}
      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
    >
      Cerrar
    </button>
  );

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen: modalState.isOpen }}>
      {children}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        children={modalState.children}
        footer={modalState.footer ?? defaultFooter}
      />
    </ModalContext.Provider>
  );
};
