// Requisito realizados por todos do grupo:
// João Vitor Santos Costa, Maria Clara Medeiros Paulino,
// Rafael de Alvarenga Reis, Angelica Diniz, Alexsandro Pinheiro Ferreira.

export async function getCategories() {
  // Implemente aqui
  const response = await fetch(
    'https://api.mercadolibre.com/sites/MLB/categories',
  );
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  let response;
  if (query && !categoryId) {
    response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${query}`,
    );
  }
  if (!query && categoryId) {
    response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`,
    );
  }
  if (query && categoryId) {
    response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`,
    );
  }
  const data = await response.json();
  return data;
}
