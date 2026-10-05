import { useModal } from "@/providers/ModalProvider";
import React, { FC } from "react";

interface BtnProps {
  label: string;
}

const SubmiteBtn: FC<BtnProps> = ({ label }) => {
  const { closeModal } = useModal();
  return (
    <div className=" space-x-2">
      <button
        type="button"
        onClick={closeModal}
        className=" cursor-pointer px-5 py-2.5 rounded-xl text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
      >
        Cancel
      </button>

      <button
        type="submit"
        className=" cursor-pointer px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#FF6B35] hover:bg-[#e85d28] shadow-lg shadow-[#FF6B35]/25 transition-all active:scale-95"
      >
        {label}
      </button>
    </div>
  );
};

export default SubmiteBtn;
