import instance from "./axios";

export const getCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await instance.get("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addToCart = async ({ productId, color, size, quantity }) => {
  const token = localStorage.getItem("token");
  const response = await instance.post(
    `/cart/products/${productId}`,
    { color, size, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const token = localStorage.getItem("token");
  const response = await instance.patch(
    `/cart/products/${cartItemId}`,
    { quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deleteCartItem = async (cartItemId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await instance.delete(`/cart/${cartItemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};