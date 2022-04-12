import axios from 'axios';

export const createProduct = async (data) => {
    const response = await axios.post('/api/product', data);

    return response;
};

// export const getCategories = async () => {
//     const response = await axios.get('/api/category');

//     return response;
// };
