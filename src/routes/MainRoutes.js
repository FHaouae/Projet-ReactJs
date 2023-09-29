import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home';
import VoituresList from '../pages/voitures/VoituresList';
import Login from '../pages/authentication/Login';
import AddVoiture from '../pages/AddVoiture';
import MarqueDetail from '../pages/marques/MarqueDetail';
import EditVoiture from '../pages/EditVoiture';



export default function MainRoutes() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Home></Home>} />
        <Route path="/voitures" element={<VoituresList></VoituresList>} />
        <Route path="/auth/login" element={<Login></Login>} />
        <Route path="/addvoiture" element={<AddVoiture></AddVoiture>} />
        <Route path="/marques/:marqueId" element={<MarqueDetail></MarqueDetail>} />
        <Route path="/Editvoiture/:voitureId" element={<EditVoiture></EditVoiture>} />


      </Routes>
    </>
  )
}
