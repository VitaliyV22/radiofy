import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRadioData = () => {
    const [data, setData] = useState([]);
    url = "https://radiofy-server.onrender.com"
    useEffect(() => {
        axios.get(url + '/api/radio')
            .then(response => setData(response.data))
            .catch(console.error); 
    }, []);

    return data; 
};