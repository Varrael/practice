const API_BASE_URL = 'http://localhost:3333';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error('Ошибка запроса к серверу');
  }

  return response.json();
};

export const api = {
  baseUrl: API_BASE_URL,
  getCategories: () => request('/categories/all'),
  getCategoryProducts: (categoryId) => request(`/categories/${categoryId}`),
  getProducts: () => request('/products/all'),
  getProductById: async (productId) => {
    const data = await request(`/products/${productId}`);
    return data[0];
  },
  sendSaleRequest: (payload) =>
    request('/sale/send', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  sendOrder: (payload) =>
    request('/order/send', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getImageUrl: (path) => `${API_BASE_URL}${path}`,
};
