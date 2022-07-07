import { useState } from "react";
import Header from "../components/Header";
import ListUsers from '../components/ListUsers';

const GestionUsers = () => {

    return (
        <>
            <Header />
            <div style={{display: "flex", justifyContent: "center",width: "100%", height: "100%", marginTop: "60px"}}>
                <ListUsers />
            </div>
        </>
    );
};

export default GestionUsers;