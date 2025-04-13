/*fetching apí un archivo por endpoint*/
export async function getProductsFromAPI(url){
    
    try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            return [];
        }
}