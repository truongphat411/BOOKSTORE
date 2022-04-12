import axios from 'axios';

export const createAuthor = async (formData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post('/api/author', formData, config);

    return response;
};

