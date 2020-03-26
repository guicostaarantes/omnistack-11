import React, { useState, SyntheticEvent } from "react";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logoSvg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Logon() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleLogin(event: SyntheticEvent) {
    event.preventDefault();

    try {
      console.log(emailOrPhone, password);
      const response = await api.post("ngo/session", {
        emailOrPhone,
        password
      });
      localStorage.setItem("token", response.data.token);
      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoSvg} alt="Logo" />
        <form onSubmit={handleLogin}>
          <h1>Entrar</h1>
          <input
            value={emailOrPhone}
            onChange={e => setEmailOrPhone(e.target.value)}
            placeholder="Email ou telefone"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha"
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
