import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRadioData = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/radioData')
            .then(response => setData(response.data))
            .catch(console.error); 
    }, []);

    return data; 
};