import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listItems, readItem } from '../api/items';

export type ItemsState = {
  items: ItemType[];
  item: ItemType | null;
  hasMoreItems: boolean;
  listItemsLoading: boolean;
  listItemsSuccess: boolean;
  listItemsError: string | null;
  readItemLoading: boolean;
  readItemSuccess: boolean;
  readItemError: string | null;
};

const initialState: ItemsState = {
  items: [],
  item: null,
  hasMoreItems: true,
  listItemsLoading: false,
  listItemsSuccess: false,
  listItemsError: null,
  readItemLoading: false,
  readItemSuccess: false,
  readItemError: null,
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
      )
      .addCase(readItem.pending, (state: ItemsState) => {
        state.readItemLoading = true;
        state.readItemError = null;
      })
      .addCase(
        readItem.fulfilled,
        (state: ItemsState, action: PayloadAction<ItemType>) => {
          state.readItemLoading = false;
          state.readItemSuccess = true;
          state.item = action.payload;
        }
      )
      .addCase(
        readItem.rejected,
        (state: ItemsState, action: PayloadAction<any>) => {
          state.readItemLoading = false;
          state.readItemError = action.payload;
        }
      ),
});

export const { reducer } = itemsSlice;

export default reducer;
