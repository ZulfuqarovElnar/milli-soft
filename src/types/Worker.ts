export interface Worker {
    id: string;
    name: string;
    employeeId: string;
    note?: string;
    selectedWorker?: {
        id: string;
        employeeId: string;
        name: string;
    };
}

export interface WorkerRowProps {
    worker: Worker;
    index: number;
    onView: (worker: Worker) => void;
}
