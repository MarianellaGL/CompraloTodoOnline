export async function getProductsFromAPI(){
    
    try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            return data;
        } catch (error) {
            
            console.error('Error al obtener los productos:', error);
            return [];
        }
}
