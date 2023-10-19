import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  label: string;
}

const markersSlice = createSlice({
  name: 'markers',
  initialState: [] as Marker[],
  reducers: {
    addMarker: (state, action: PayloadAction<Marker>) => {
      state.push(action.payload);
    },
    removeMarker: (state, action: PayloadAction<number>) => {
      return state.filter((marker) => marker.id !== action.payload);
    },
  },
});

export const { addMarker, removeMarker } = markersSlice.actions;
export default markersSlice.reducer;
