import { Worker } from "./Worker";

export interface UserResponse {
  id: number;
  name: string;
}

export interface WorkerState {
  workers: Worker[];
  dropdownWorkers: Worker[];
  loading: boolean;
  error: string | null;
} 