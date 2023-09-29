import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { UserContext } from '../../contexts/AuthContext';

const VoituresList = () => {
    const [voitures, setVoitures] = useState([]);
    const [marques, setMarques] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [selectedVoiture, setSelectedVoiture] = useState(null);
    const [user, setUser] = useContext(UserContext);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!user);



    useEffect(() => {

        axios

            .get("https://formation.inow.fr/demo/api/v1/cars")

            .then((response) => {

                setVoitures(response.data);

            })

            .catch((error) => {

                console.error("Error lors de la recuperation depuis API", error);

            });

        axios

            .get("https://formation.inow.fr/demo/api/v1/brands")

            .then((response) => {

                const brandsObject = {};

                response.data.forEach((marque) => {

                    brandsObject[marque.id] = marque.name;

                });

                setMarques(brandsObject);

            })

            .catch((error) => {

                console.error("Error lors de la recuperation depuis API", error);

            });

    }, []);

    const handleDelete = (voiture) => {
        setSelectedVoiture(voiture);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (selectedVoiture) {
            axios.delete(`https://formation.inow.fr/demo/api/v1/cars/${selectedVoiture.id}`)
                .then(() => {
                    setVoitures((prevVoitures) => prevVoitures.filter((voiture) => voiture.id !== selectedVoiture.id));
                    setShowModal(false);
                })
                .catch((error) => {
                    console.error('Erreur lors de la suppression de la voiture', error);
                });
        }
    };

    return (
        <div>
            <h1>Liste des voitures</h1>
            <ListGroup>
                {voitures.map((voiture) => (
                    <ListGroup.Item key={voiture.id}>
                        <strong>Modèle :</strong> {voiture.model} <br />
                        <strong>Marque :</strong> {marques[voiture.brandID]}<br />
                        <strong>Price :</strong> {voiture.price} €

                        {userIsLoggedIn ? (
                            <div>
                                <Link to={`/Editvoiture/${voiture.id}`}>
                                    <Button variant="info">Modifier</Button>
                                </Link>
                                <Button variant="danger" onClick={() => handleDelete(voiture)}>Supprimer</Button>
                            </div>
                        ) : null}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation de la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cette voiture ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
                    <Button variant="danger" onClick={confirmDelete}>Supprimer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default VoituresList;



