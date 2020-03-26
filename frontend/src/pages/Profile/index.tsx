import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import logoSvg from "../../assets/logo.svg";
import "./styles.css";

export default function Profile() {
  const ngoId = localStorage.getItem("ngoId");
  const ngoName = localStorage.getItem("ngoName");

  const history = useHistory();

  const [incidents, setIncidents] = useState([]);

  async function handleIncidentDelete(id: any) {
    try {
      await api.delete(`incident/${id}`, {
        headers: {
          Authorization: ngoId
        }
      });
      setIncidents(incidents.filter((i: any) => i.id !== id));
    } catch (err) {
      alert("Erro ao deletar, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  async function getIncidents() {
    const response = await api.get(`ngo/${ngoId}/incidents`);
    setIncidents(response.data);
  }

  useEffect(() => {
    getIncidents();
  }, [ngoId]);

  return (
    <div className="profile-container">
      <header>
        <img src={logoSvg} alt="Logo" />
        <span>Bem-vinda, {ngoName}</span>
        <Link className="button" to="/incident/create">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map((i: any) => (
          <li key={i.id}>
            <strong>CASO:</strong>
            <p>{i.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{i.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(i.value)}
            </p>
            <button type="button" onClick={() => handleIncidentDelete(i.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
