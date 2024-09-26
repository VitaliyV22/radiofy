import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRadioData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://radiofy-server.onrender.com/api/radio")
            .then(response => setData(response.data))
            .catch(console.error); 
    }, []);

    return data; 
};