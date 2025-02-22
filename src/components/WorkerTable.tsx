import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@heroui/react";
import WorkerRow from "./WorkerRow";
import WorkerModal from "./ui/WorkerModal";
import { Worker } from "../types/Worker";
import { addWorker } from '../store/slices/workerSlice';
import { RootState } from '../store';

export default function WorkerTable() {
  const dispatch = useDispatch();
  const workers = useSelector((state: RootState) => state.workers.workers);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const handleView = (worker: Worker) => {
    setSelectedWorker(worker);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-white">İşçi Məlumatları</h2>
        <Button
          variant="solid"
          size="lg"
          onClick={() => dispatch(addWorker())}
          className="bg-[#006FEE] hover:bg-[#005BC4] text-white rounded-[14px] mt-5 mr-5"
        >
          Əlavə Et
        </Button>
      </div>

      <div className="bg-white p-4 rounded-[14px] shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f4f4f5] text-[#71717a] text-xs text-center">
              <th className="py-3 px-2 rounded-l-[8px]">Sıra</th>
              <th className="py-3 px-2">İşçi</th>
              <th className="py-3 px-2">Xüsusi qeyd</th>
              <th className="py-3 px-2 rounded-r-[8px]">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, index) => (
              <WorkerRow 
                key={worker.id} 
                worker={worker} 
                index={index} 
                onView={handleView} 
              />
            ))}
          </tbody>
        </table>
      </div>

      <WorkerModal isOpen={!!selectedWorker} worker={selectedWorker} onClose={() => setSelectedWorker(null)} />
    </div>
  );
}
