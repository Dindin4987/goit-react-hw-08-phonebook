import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'https://661fbcb516358961cd955014.mockapi.io/api/';

// export const fetchContacts = () => async dispatch => {
//   try {
//     // Load indicator
//     dispatch(fetchingInProgress());
//     // HTTP request
//     const response = await axios.get('/contacts');
//     // Data processing
//     dispatch(fetchingSuccess(response.data));
//   } catch (e) {
//     // Error processing
//     dispatch(fetchingError(e.message));
//   }
// };

/////////////////================= SYNTAX =======================///////////
// createAsyncThunk('ACTION TYPE', async FUNCTION (args, thunkAPI) => {});

// Async thunk for fetching contacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
    }
  }
);

// Async thunk for adding a contact
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
    }
  }
);

// Async thunk for deleting a contact
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId; // Return the id to identify which contact was deleted
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
    }
  }
);
