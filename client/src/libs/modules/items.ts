import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listItems } from '../api/items';

export type ItemsState = {
  items: ItemType[];
  hasMoreItems: boolean;
  listItemsLoading: boolean;
  listItemsSuccess: boolean;
  listItemsError: string | null;
};

const initialState: ItemsState = {
  items: [],
  hasMoreItems: true,
  listItemsLoading: false,
  listItemsSuccess: false,
  listItemsError: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(listItems.pending, (state: ItemsState) => {
        state.listItemsLoading = true;
        state.listItemsError = null;
      })
      .addCase(
        listItems.fulfilled,
        (state: ItemsState, action: PayloadAction<ItemType[]>) => {
          state.listItemsLoading = false;
          state.listItemsSuccess = true;
          state.items = action.payload;
          state.hasMoreItems = action.payload.length === 30;
        }
      )
      .addCase(
        listItems.rejected,
        (state: ItemsState, action: PayloadAction<any>) => {
          state.listItemsLoading = false;
          state.listItemsError = action.payload;
        }
      ),
});

export const { reducer } = itemsSlice;

export default reducer;
