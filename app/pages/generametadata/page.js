"use client";

import styles from "../../form.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { headers } from "@/next.config";
import { ProgressBar} from "react-loader-spinner";

const GeneraMetaData = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    aud : "auth.interop.pagopa.it/client-assertion"
  });
  const [isCompiled, setIsCompiled] = useState(false);
  const [comuni, setComuni] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3014/configurazioniAll?filter=metadata"
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

  function formatString(str) {
    // Rimuovi spazi, apostrofi e punti
    let cleanStr = str.replace(/[ '.]/g, '');
  
    // Metti la prima lettera in maiuscolo e le altre in minuscolo
    let result = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1).toLowerCase();
  
    return result;
  }
  const [selectedComune, setSelectedComune] = useState("");

  const handleSelectChange = (event) => {
    setSelectedComune(event.target.value);
    setFormData({...formData, "nomecomune": event.target.value})
    console.log(event.target.value)
  };

  const handleChange = (e) => {
    let value = e.currentTarget.value;
    const name = e.currentTarget.name;

    if(name === 'nomecomune'){
      value = formatString(value)
    }

    // TODO: if dataverbale change and the year change let's do a new search blocchettario

    setFormData({
      ...formData,
      [name]: value,
    });

    if (
      formData.kid
    ) {
      setIsCompiled(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("Dati inviati:", formData);
    try {
      const response = await axios.post(
        "http://localhost:3014/configurazionimetadata",
        formData
      );

      if (response.status == 200 || response.status == 201) {
    
        alert("Metadata Inserito!")

        router.push("/")
      } else {
        alert("Errore inserimento Metadata");
    ;
      }
    } catch (err) {
      alert(
        "Errore inserimento Metadata. " +
          err.message 
          
      );
  ;
    }
    // Qui puoi aggiungere la logica per gestire l'invio dei dati (es. chiamata API)
  };

  return (
    <>
      <form className={styles.formContainer}>
        <div className={styles.formstyle}>
          <h2 style={{ marginBottom: "40px" }}>Aggiungi Meta Data</h2>
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
        </div>
        <div className={styles.formstyle}>
          <label>kid*</label>
          <input
            name="kid"
            value={formData.kid}
            type="text"
            className={styles.input}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className={styles.formstyle}>
          <label>iss*</label>
          <input
            name="iss"
            value={formData.iss}
            type="text"
            className={styles.input}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className={styles.formstyle}>
          <label>sub*</label>
          <input
            name="sub"
            value={formData.sub}
            type="text"
            className={styles.input}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className={styles.formstyle}>
          <label>aud*</label>
          <input
            name="aud"
            value={formData.aud}
            type="text"
            className={styles.input}
            readOnly
            required={true}
          />
        </div>
        <div className={styles.formstyle}>
          <label>Purpose ID*</label>
          <input
            name="purpose_id"
            value={formData.purpose_id}
            type="text"
            className={styles.input}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={!isCompiled}
        >
          Aggiungi
        </button>
     
        <Link
          href="/"
          style={{ textDecoration: "underline" }}
          className={styles.formstyle}
        >
          Torna Indietro
        </Link>
      </form>
      <p style={{ padding: "30px", fontSize: "10px" }}>*campo obbligatorio</p>
    </>
  );
};

export default GeneraMetaData;
