import React, { useState } from 'react'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const DeleteClientsModal = ({ clientId }) => {

    const { setDeleteClientsModal } = useAuth();
    const token = localStorage.getItem("token");
    const userId = "62b08ba33f8191dd23368c83";
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteClient = () => {

        setIsLoading(true);

        const deleteClients = async () => {
        try {
            const response = await axios.delete(
            `/clients/deleteClient/${clientId}`,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json, text/plain"
                },
                data: {
                userId: userId
                }
                // withCredentials: true
            }
            );
            setIsLoading(false);
            setDeleteClientsModal(false);
            window.location.reload();
        } catch (err) {
            console.log();
        }
        };

        deleteClients();
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        setDeleteClientsModal(false);
    }

    return (

        <div className='delete-clients-modal'>
            <div className='delete-clients-modal--container'>
                <p>Souhaitez-vous confirmer la suppression</p>
                <button onClick={handleCloseModal}>X</button>
                <button onClick={handleDeleteClient}>Confirmer</button>
            </div>
        </div>
    )
}

export default DeleteClientsModal