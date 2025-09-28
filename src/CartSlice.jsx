import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],       // List of cart items
    totalQuantity: 0 // Track total quantity in cart
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }

      state.totalQuantity += 1; // Update total quantity
    },

    removeItem: (state, action) => {
      const { name } = action.payload;
      const item = state.items.find(item => item.name === name);

      if (item) {
        state.totalQuantity -= item.quantity; // Decrease total quantity
        state.items = state.items.filter(item => item.name !== name);
      }
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        // Adjust total quantity based on change
        state.totalQuantity += quantity - itemToUpdate.quantity;

        // Prevent quantity from going below 1
        itemToUpdate.quantity = quantity < 1 ? 1 : quantity;
      }
    }
  }
});

// Export actions
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer
export default CartSlice.reducer;
