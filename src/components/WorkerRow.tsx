import { useEffect, useState } from 'react';
import { Autocomplete, Button, Input, AutocompleteItem } from "@heroui/react";
import { Worker, WorkerRowProps } from "../types/Worker";
import { useDispatch, useSelector } from 'react-redux';
import { removeWorker, fetchWorkers, updateWorker } from '../store/slices/workerSlice';
import { RootState, AppDispatch } from '../store';

function WorkerRow({ worker, index, onView }: WorkerRowProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { dropdownWorkers, loading } = useSelector((state: RootState) => state.workers);
  const [note, setNote] = useState(worker.note || "");

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  const handleView = () => {
    const updatedWorker = {
      ...worker,
      note
    };
    dispatch(updateWorker(updatedWorker));
    onView(updatedWorker);
  };

  const handleSelectionChange = (key: string | number | null) => {
    if (!key) return;
    
    const selected = dropdownWorkers.find(w => w.id === key.toString());
    if (selected) {
      const updatedWorker = {
        ...worker,
        employeeId: selected.employeeId,
        name: selected.name,
        note
      };
      dispatch(updateWorker(updatedWorker));
    }
  };

  return (
    <tr>
      <td className="p-3">{index + 1}</td>
      <td className="p-3 min-w-xs">
        <Autocomplete
          className="max-w-md bg-[#f4f4f5]"
          items={dropdownWorkers}
          isLoading={loading}
          onSelectionChange={handleSelectionChange}
          classNames={{
            base: "w-full",
            listbox: "bg-white rounded-lg",
            listboxWrapper: "max-h-[300px] scrollbar-hide",
            popoverContent: "bg-white border border-gray-200 shadow-lg rounded-lg",
            endContentWrapper: "bg-[#f4f4f5] rounded-lg",
            selectorButton: "text-default-500"
          }}
          label={<span className="text-[#71717A] text-sm">İşçilər</span>}
        >
          {(item: Worker) => (
            <AutocompleteItem 
              key={item.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0"
            >
              {`${item.employeeId} - ${item.name}`}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </td>
      <td className="p-3">
        <Input 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          label={<span className="text-[#71717A]">Xüsusi qeyd</span>}
          className="bg-[#f4f4f5]" 
        />
      </td>
      <td className="p-3">
        <div className="flex justify-evenly gap-2">
          <Button
            variant="solid"
            size="lg"
            onClick={handleView}
            className="bg-[#17c964] hover:bg-[#45D483] cursor-pointer text-white rounded-[14px] transition-colors"
          >
            Baxış
          </Button>
          <Button
            variant="solid"
            size="lg"
            onClick={() => dispatch(removeWorker(worker.id))}
            className="bg-[#F31260] hover:bg-[#F54180] cursor-pointer text-white rounded-[14px] transition-colors"
          >
            Sil
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default WorkerRow;
