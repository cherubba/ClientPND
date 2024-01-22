"use client";
import { useState, useEffect } from "react";
import styles from "../../form.module.css";
import Link from "next/link";
import { ProgressBar } from "react-loader-spinner";
import axios from "axios";
import Modal from "../../../components/Modal";

const GeneraChiave = () => {
  const [comuni, setComuni] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [key, setKey] = useState("");

  // Funzione per aprire il modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Funzione per chiudere il modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3014/configurazioniAll?filter=privatekey"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setComuni(data);
      } catch (error) {
        console.error("Errore durante il fetch dei dati:", error);
      }
    };

    fetchData();
  }, []);

  // State per tenere traccia del comune selezionato
  const [selectedComune, setSelectedComune] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function formatString(str) {
    // Rimuovi spazi, apostrofi e punti
    let cleanStr = str.replace(/[ '.]/g, "");

    // Metti la prima lettera in maiuscolo e le altre in minuscolo
    let result =
      cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1).toLowerCase();

    return result;
  }

  // Gestisce la selezione di un comune
  const handleSelectChange = (event) => {
    setSelectedComune(event.target.value);
    console.log(event.target.value);
    setIsSelected(true);
  };

  const generachiave = async (e) => {
    e.preventDefault();
    try {
      const responseStream = await axios.post(
        "http://localhost:3014/generachiave",
        {
          nomeComune: formatString(selectedComune),
        }
      );
      if (responseStream.status == 200 || responseStream.status == 201) {
        setIsLoading(false);
        setShowModal(true);
        setKey(responseStream.data.publicKey);
        //alert(responseStream.data.publicKey)
      }
    } catch (err) {
      alert("Errore generazione Stream " + err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className={styles.formContainer}>
        <h2>Genera Chiave</h2>

        <select
          value={selectedComune}
          onChange={handleSelectChange}
          className={styles.select}
        >
          <option value="">Seleziona un comune</option>
          {comuni.map((comune) => (
            <option key={comune.id_comune} value={comune.nome_comune}>
              {comune.nome_comune}
            </option>
          ))}
        </select>

        {/* <label className={styles.label}>Inserisci Nome Comune</label>
          <input
            name="nomecomune"
            value={selectedComune}
            type="text"
            className={styles.inputcomune}
            onChange={ handleSelectChange}
          /> */}

        <button
          className={styles.button2}
          disabled={!isSelected}
          onClick={generachiave}
        >
          Genera Chiave Pubblica
        </button>
        {isLoading && (
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}

        <Link
          href="/"
          style={{ textDecoration: "underline" }}
          className={styles.formstyle}
        >
          Torna Indietro
        </Link>
      </form>

      <Modal show={showModal} onClose={handleCloseModal}>
        <div>
          <h3>Chiave Pubblica Generata!</h3>
          <h4>
            Copia negli appunti questa chiave e inseriscila nel{" "}
            <Link
              href={"https://selfcare.pagopa.it/auth/login"}
              target="_blanket"
              style={{ textDecoration: "underline", color: "bluenavy" }}
            >
              Portale SelfCare PagoPa
            </Link>{" "}
          </h4>
          <div>
            <pre>{key}</pre>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GeneraChiave;
