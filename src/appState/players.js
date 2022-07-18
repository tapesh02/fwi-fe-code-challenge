import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const adapter = createEntityAdapter();

export const {
  selectById: getPlayerById,
  selectAll: getPlayers,
  selectEntities: getPlayerEntities,
  selectIds: getPlayerIds,
  selectTotal: getTotalPlayers,
} = adapter.getSelectors((state) => state.players);

const headers = new Headers({
  'Content-Type': 'application/json',
});

export const fetchAllPlayers = createAsyncThunk(
  'players/fetchAll',
  async () => {
    try {
      const response = await fetch('/api/players', { headers });
      const json = await response.json();

      return json;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addPlayer = createAsyncThunk(
  'players/addPlayer',
  async (formData) => {
    try {
      const response = await fetch('/api/players', {
        headers,
        method: 'POST',
        body: JSON.stringify(formData),
      });
      await response.json();

      return formData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePlayer = createAsyncThunk(
  'players/updatePlayer',
  async ({ id, updatedData }) => {
    try {
      await fetch(`/api/players/${id}`, {
        headers,
        method: 'PATCH',
        body: JSON.stringify(updatedData),
      });

      return { id, changes: updatedData };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePlayer = createAsyncThunk(
  'players/deletePlayer',
  async (id) => {
    try {
      await fetch(`/api/players/${id}`, {
        headers,
        method: 'DELETE',
      });

      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const sortby = createAsyncThunk(
  'players/sortby',
  async ({ sortbyvalue, sortordervalue }) => {
    try {
      const response = await fetch(
        `/api/players?sortBy=${sortbyvalue}&sortOrder=${sortordervalue}`,
        {
          headers,
        }
      );
      const json = await response.json();

      return json;
    } catch (error) {
      console.log(error);
    }
  }
);

export const PLAYERS_INITIAL_STATE = adapter.getInitialState();

const { actions, reducer } = createSlice({
  name: 'players',
  initialState: PLAYERS_INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllPlayers.fulfilled, (state, action) => {
        adapter.setAll(state, action.payload.items);
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        adapter.addOne(state, action.payload);
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        adapter.updateOne(state, action.payload);
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        adapter.removeOne(state, action.payload);
      })
      .addCase(sortby.fulfilled, (state, action) => {
        adapter.setAll(state, action.payload.items);
      }),
});

export const {} = actions;

export default reducer;
