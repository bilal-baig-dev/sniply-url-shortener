import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";

type ModalProps = {
  title: string;
  description: string;
  open: boolean;
  handleAction: () => void;
  setCloseModal: (state: boolean) => void;
};

function Modal({ title, description, open, handleAction, setCloseModal }: ModalProps) {
  return (
    <>
      {open && (
        <AlertDialog open={open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setCloseModal(false)}>No</AlertDialogCancel>
              <AlertDialogAction onClick={handleAction}>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default Modal;
