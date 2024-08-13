// 3. Write a function 'fetchWithRetry' that uses the Fetch API to request fails, it should retry up
// to 3 times with exponential backoff.

const fetchWithRetry= async (url, options = {}, retries = 3, delay = 1000) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (retries <= 0) {
            throw error;
        }
        console.log(`Retrying in ${delay}ms... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
}

// URL test
const apiUrl = `https://api.example.com/data`;
const apiUrl2 = `https://jsonplaceholder.typicode.com/todos`;

fetchWithRetry(apiUrl)
    .then(data => {
        console.log('Data received:', data);
    })
    .catch(error => {
        console.error('Failed to fetch data:', error);
    });
