"use client";

import styles from "../../form.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { headers } from "@/next.config";
import { ProgressBar} from "react-loader-spinner";

const DataEntryForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [isCompiled, setIsCompiled] = useState(false);

  function formatString(str) {
    // Rimuovi spazi, apostrofi e punti
    let cleanStr = str.replace(/[ '.]/g, '');
  
    // Metti la prima lettera in maiuscolo e le altre in minuscolo
    let result = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1).toLowerCase();
  
    return result;
  }


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
      formData.nomecomune &&
      formData.codicefiscale &&
      formData.apikey &&
      formData.group &&
      formData.slug_comune
    ) {
      setIsCompiled(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("Dati inviati:", formData);
    try {
      const response = await axios.post(
        "http://localhost:3014/configurazioniNuovo",
        formData
      );

      if (response.status == 200 || response.status == 201) {
    
        alert("Comue Inserito!")

        router.push("/")
      } else {
        alert("Errore inserimento Comune");
    ;
      }
    } catch (err) {
      alert(
        "Errore inserimento Comune. " +
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
          <h2 style={{ marginBottom: "40px" }}>Aggiungi Comune</h2>
          <label className={styles.label}>Nome Comune*</label>
          <input
            name="nomecomune"
            value={formData.nomecomune}
            type="text"
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formstyle}>
          <label>Codice Fiscale*</label>
          <input
            name="codicefiscale"
            value={formData.codicefiscale}
            type="text"
            className={styles.input}
            onChange={handleChange}
            required={true}
            maxLength={11}
          />
        </div>

        <div className={styles.formstyle}>
          <label>Apikey*</label>
          <input
            name="apikey"
            value={formData.apikey}
            type="text"
            className={styles.input}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className={styles.formstyle}>
          <label>Group*</label>
          <input
            name="group"
            value={formData.group}
            type="text"
            className={styles.input}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className={styles.formstyle}>
          <label>Inad Apikey</label>
          <input
            name="inadapikey"
            value={formData.inadapikey}
            type="text"
            className={styles.input}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className={styles.formstyle}>
          <label>Slug Comune*</label>
          <input
            name="slug_comune"
            value={formData.slug_comune}
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

export default DataEntryForm;
