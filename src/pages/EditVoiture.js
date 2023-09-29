import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const EditVoiture = () => {
    const [voitureData, setVoitureData] = useState({
        name: '',
        dateOfCirculation: '',
        price: 0,
        brandID: '',
    });
    const { marqueId } = useParams();
    const [marques, setMarques] = useState([]);
    const { voitureId } = useParams();


    useEffect(() => {
        axios.get('https://formation.inow.fr/demo/api/v1/brands')
            .then((response) => {
                setMarques(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des marques :', error);
            });
        axios.get(`https://formation.inow.fr/demo/api/v1/cars/${voitureId}`)
            .then((response) => {
                setVoitureData(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données de la voiture :', error);
            });
    }, [voitureId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVoitureData({ ...voitureData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            voitureData.price = +voitureData.price;
            voitureData.brandID = +voitureData.brandID;
            await axios.put(`https://formation.inow.fr/demo/api/v1/cars/${voitureId}`, voitureData);
        } catch (error) {
            console.error('Erreur lors de la modification de la voiture :', error);
        }
    };

    return (
        <div>
            <h1>Modifier la voiture</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="model" className="form-label">Modèle</label>
                    <input type="text" className="form-control" id="model" name="model" value={voitureData.model} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateOfCirculation" className="form-label">Date de mise en circulation</label>
                    <input type="date" className="form-control" id="dateOfCirculation" name="dateOfCirculation" value={voitureData.dateOfCirculation} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Prix</label>
                    <input type="number" className="form-control" id="price" name="price" value={voitureData.price} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="brandID" className="form-label">Marque</label>
                    <select className="form-select" id="brandID" name="brandID" value={voitureData.brandID} onChange={handleInputChange} required>
                        <option value="">Sélectionnez une marque</option>
                        {marques.map((marque) => (
                            <option key={marque.id} value={marque.id}>
                                {marque.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Modifier</button>
            </form>
        </div>
    );
};

export default EditVoiture;
