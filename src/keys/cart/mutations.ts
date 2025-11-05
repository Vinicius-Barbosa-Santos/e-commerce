export const CartMutationKeys = {
  add: () => ["add-card"],
  update: (productId: number) => ["update-card", productId],
  delete: (productId: number) => ["delete-card", productId],
};
