import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../_prototype';
import { ClipboardState } from './_prototype';

const defaultState: ClipboardState = {
  clipboards: [],
  status: '',
  response: {},
};

export const getUser = createAsyncThunk(
  'user/get',
  async (data: string, { getState }) => {
    const state = getState() as RootState;
    const res = await axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error?.response?.data;
      });
    return res;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState: defaultState,
  reducers: {
    addClipboard: (state, action) => {
      if (state.clipboards.length === 10) {
        state.clipboards = [action.payload, ...state.clipboards.slice(0, 9)];
        return;
      }
      state.clipboards = [action.payload, ...state.clipboards];
    },
    deleteClipboard: (state, action) => {
      state.clipboards = state.clipboards.filter(
        (e) => e.value !== action.payload
      );
    },
    clearClipboard: (state) => {
      state.clipboards = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.response = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export const { addClipboard, deleteClipboard, clearClipboard } =
  counterSlice.actions;

export default counterSlice.reducer;
