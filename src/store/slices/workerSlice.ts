import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserResponse, WorkerState } from '../../types/WorkerSliceTypes';

// Fetch workers from API
export const fetchWorkers = createAsyncThunk(
  'workers/fetchWorkers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data: UserResponse[] = await response.json();
    return data.map((user) => ({
      id: user.id.toString(),
      employeeId: Math.floor(20000 + Math.random() * 79999).toString(),
      name: user.name,
      note: ""
    }));
  }
);

const initialState: WorkerState = {
  workers: [
    {
      id: "1",
      employeeId: "63731",
      name: "İşçilər",
      note: ""
    }
  ],
  dropdownWorkers: [],
  loading: false,
  error: null
};

const workerSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    // Add new worker
    addWorker: (state) => {
      const newId = (state.workers.length + 1).toString();
      state.workers.push({
        id: newId,
        employeeId: "63731",
        name: "İşçilər",
        note: ""
      });
    },
    // Remove worker by id
    removeWorker: (state, action) => {
      state.workers = state.workers.filter(worker => worker.id !== action.payload);
    },
    // Update worker data
    updateWorker: (state, action) => {
      const index = state.workers.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.workers[index] = {
          ...state.workers[index],
          ...action.payload
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.dropdownWorkers = action.payload;
        state.loading = false;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching workers';
      });
  },
});

export const { addWorker, removeWorker, updateWorker } = workerSlice.actions;
export default workerSlice.reducer; 