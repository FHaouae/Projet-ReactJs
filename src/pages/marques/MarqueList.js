import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MarquesList = () => {
    const [marques, setMarques] = useState([]);

    useEffect(() => {

        axios.get('https://formation.inow.fr/demo/api/v1/brands')
            .then((response) => {
                setMarques(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des marques', error);
            });
    }, []);

    return (
        <div className="marques-list">
            {marques?.map((marque) => (
                <div key={marque.id} className="marque-item">
                    <Link to={`/marques/${marque.id}`}>
                        <img src={`images/${marque.image}`} alt={marque.name} />
                        <h3>{marque.name}</h3>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MarquesList;

