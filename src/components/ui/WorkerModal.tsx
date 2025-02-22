import { Modal, ModalContent, Button } from "@heroui/react";
import { WorkerModalProps, ModalItemProps } from "../../types/Modal";

function WorkerModal({ isOpen, onClose, worker }: WorkerModalProps) {
  if (!worker) return null;

  const modalLabels: ModalItemProps[] = [
    { label: "İşçi Nömrəsi", value: worker.employeeId, isBlue: true },
    { label: "Adı Soyadı", value: worker.name },
    { label: "Əmrin əsas səbəbi", value: `${worker.name} Ərizəsi` },
    { label: "Qeyd", value: worker.note || "-" }
  ];

  const renderModalItem = ({ label, value, isBlue }: ModalItemProps) => (
    <div key={label}>
      <p className="text-[#11181c] font-bold mb-1">{label}:</p>
      <p className={`${isBlue ? "text-[#0066FF]" : "text-gray-900"} font-medium`}>{value}</p>
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      placement="center"
      size="md"
      backdrop="blur"
      classNames={{
        backdrop: "bg-[#000000]/50 backdrop-opacity-40",
        base: "border-none"
      }}
    >
      <ModalContent className="bg-white rounded-lg py-4 p-6 w-[600px] sm:w-[700px] md:w-[800px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">İşçi Məlumatı</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            {modalLabels.slice(0, 2).map(renderModalItem)}
          </div>
          <div className="grid grid-cols-2 gap-8">
            {modalLabels.slice(2).map(renderModalItem)}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            variant="solid"
            className="bg-[#0066FF] hover:bg-blue-700 text-white rounded-lg px-6 cursor-pointer"
            onClick={onClose}
          >
            Bağla
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default WorkerModal; 