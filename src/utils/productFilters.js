export const filterAndSortProducts = (products, filters) => {
  const normalizedMinPrice = filters.minPrice === '' ? 0 : Number(filters.minPrice);
  const normalizedMaxPrice = filters.maxPrice === '' ? Infinity : Number(filters.maxPrice);

  let result = products.filter((product) => {
    const actualPrice = product.discont_price ?? product.price;
    const isPriceMatched = actualPrice >= normalizedMinPrice && actualPrice <= normalizedMaxPrice;
    const isDiscountMatched = filters.discountOnly ? Boolean(product.discont_price) : true;

    return isPriceMatched && isDiscountMatched;
  });

  switch (filters.sort) {
    case 'price-asc':
      result = [...result].sort(
        (firstProduct, secondProduct) =>
          (firstProduct.discont_price ?? firstProduct.price) -
          (secondProduct.discont_price ?? secondProduct.price),
      );
      break;
    case 'price-desc':
      result = [...result].sort(
        (firstProduct, secondProduct) =>
          (secondProduct.discont_price ?? secondProduct.price) -
          (firstProduct.discont_price ?? firstProduct.price),
      );
      break;
    case 'newest':
      result = [...result].sort((firstProduct, secondProduct) => secondProduct.id - firstProduct.id);
      break;
    default:
      result = [...result];
  }

  return result;
};
