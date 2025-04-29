import apiInstance from './apiInstance'

// Function to make GET requests
export const getData = async (endpoint, params = {}) => {
    try {
        const response = await apiInstance.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error; // Rethrow to handle in the calling component
    }
};

// Function to make POST requests
export const postData = async (endpoint, data) => {
    try {
        const response = await apiInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Error posting data: ", error);
        throw error; // Rethrow to handle in the calling component
    }
};

// Function to make PUT requests
export const putData = async (endpoint, data) => {
    try {
        const response = await apiInstance.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Error updating data: ", error);
        throw error; // Rethrow to handle in the calling component
    }
};

// Function to make PUT requests
export const patchData = async (endpoint, data) => {
    try {
        const response = await apiInstance.patch(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Error updating data: ", error);
        throw error; // Rethrow to handle in the calling component
    }
};

// Function to make DELETE requests
export const deleteData = async (endpoint) => {
    try {
        const response = await apiInstance.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error deleting data: ", error);
        throw error; // Rethrow to handle in the calling component
    }
};
