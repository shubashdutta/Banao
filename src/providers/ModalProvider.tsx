import React, { createContext, useContext, useState, ReactNode } from "react";
import { Modal } from "antd";

type ModalSize = "small" | "medium" | "large" | "xlarge";

interface ModalContextType {
  openModal: (title: string, content: ReactNode, size?: ModalSize) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const modalWidths: Record<ModalSize, number> = {
  small: 400,
  medium: 600,
  large: 800,
  xlarge: 1100,
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode>(null);
  const [size, setSize] = useState<ModalSize>("medium");

  const openModal = (
    modalTitle: string,
    modalContent: ReactNode,
    modalSize: ModalSize = "medium",
  ) => {
    setTitle(modalTitle);
    setContent(modalContent);
    setSize(modalSize);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Modal
        open={isOpen}
        title={title}
        onCancel={closeModal}
        footer={null}
        width={modalWidths[size]}
        centered
        destroyOnHidden
        className="custom-modal"
        styles={{
          mask: {
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
          content: {
            padding: 0,
            borderRadius: 14,
            overflow: "hidden",
          },

          header: {
            margin: 0,
            padding: "24px 36px 18px",
            borderBottom: "1px solid #E5E7EB",
            background: "#FFFFFF",
          },

          body: {
            padding: "10px ",
          },
        }}
      >
        {content}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }

  return context;
};
