import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MarqueDetail = () => {
    const [marque, setMarque] = useState({});
    const [voitures, setVoitures] = useState([]);
    const { marqueId } = useParams();

    useEffect(() => {
        axios.get(`https://formation.inow.fr/demo/api/v1/brands/${marqueId}`)
            .then((response) => {
                setMarque(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des détails de la marque', error);
            });

        axios.get(`https://formation.inow.fr/demo/api/v1/cars`)
            .then((response) => {
                const filteredVoitures = response.data.filter((voiture) => voiture.brandID === Number(marqueId));
                setVoitures(filteredVoitures);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des voitures de la marque', error);
            });
    }, [marqueId]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h1>Marque : {marque.name}</h1>
                    <img src={`/images/${marque.image}`} alt={marque.name} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h2>Voitures de la marque</h2>
                    <ul className="list-group">
                        {voitures.map((voiture) => (
                            <li key={voiture.id} className="list-group-item">
                                <strong>Modèle :</strong> {voiture.model}
                                <br />
                                <strong>Prix :</strong> {voiture.price} €
                                <br />
                                <strong>Date de circulation :</strong> {voiture.dateOfCirculation}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MarqueDetail;



