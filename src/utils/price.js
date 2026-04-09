export const getActualPrice = (product) => product.discont_price ?? product.price;

export const getDiscountPercent = (product) => {
  if (!product.discont_price) {
    return null;
  }

  return Math.round(((product.price - product.discont_price) / product.price) * 100);
};

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
