import { Worker } from "./Worker";

export interface WorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: Worker | null;
}

export interface ModalItemProps {
  label: string;
  value: string;
  isBlue?: boolean;
} 