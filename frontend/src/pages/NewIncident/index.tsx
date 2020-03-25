import React, { useState, SyntheticEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import logoSvg from "../../assets/logo.svg";
import "./styles.css";
import api from "../../services/api";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ngoId = localStorage.getItem("ngoId");

  const history = useHistory();

  async function handleNewIncident(event: SyntheticEvent) {
    event.preventDefault();
    const data = { title, description, value };
    try {
      await api.post("incident", data, {
        headers: { Authorization: ngoId }
      });
      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar caso, tente novamente.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoSvg} alt="Logo" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para um heroi poder resolvê-lo.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título do caso"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
          />
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
