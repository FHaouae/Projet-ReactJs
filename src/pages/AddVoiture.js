import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toast } from 'react-bootstrap';


const AddVoiture = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [voitureData, setVoitureData] = useState({
        model: '',
        dateOfCirculation: '',
        price: 0,
        brandID: '',
    });
    const [marques, setMarques] = useState([]);
    useEffect(() => {
        axios.get('https://formation.inow.fr/demo/api/v1/brands')
            .then((response) => {
                setMarques(response.data);

            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des marques :', error);
            });
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVoitureData({ ...voitureData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            voitureData.price = +voitureData.price;
            voitureData.brandID = +voitureData.brandID;
            const response = await axios.post('https://formation.inow.fr/demo/api/v1/cars', voitureData);
            console.log('Voiture créée avec succès !', response.data);
            setShowToast(true);
            setToastMessage('Votre voiture a été créée avec succès !');
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Erreur lors de la création de la voiture :', error);

        }
    };


    return (
        <div>
            <h1>Créer une nouvelle voiture</h1>
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

                <button type="submit" className="btn btn-primary">Créer</button>
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Succès</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>

            </form>
        </div>
    );
};

export default AddVoiture;

