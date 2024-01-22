"use client";
import { useState, useEffect } from "react";
import styles from "../../form.module.css";
import Link from "next/link";
import { ProgressBar } from "react-loader-spinner";
import axios from "axios";

const GeneraStream = () => {
  const [comuni, setComuni] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3014/configurazioniAll?filter=nostream"
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
  const [obj, setObj] = useState({})
  const [data, setData] = useState({})
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Gestisce la selezione di un comune
  const handleSelectChange = (e) => {
    let item = e.target.value;
    setSelectedComune(item);
    
    // Filtra e trova l'oggetto 'comune' corrispondente
    const comuneSelected = comuni.filter(el => el.apikey === item)[0];
    
    if (comuneSelected) {
        setObj(comuneSelected);
        
        // Aggiorna 'data' usando 'comuneSelected' invece di 'obj'
        setData({
            ...data,
            "apikey": comuneSelected.apikey,
            "kid": comuneSelected.kid,
            "iss": comuneSelected.iss,
            "sub": comuneSelected.sub,
            "aud": comuneSelected.aud,
            "purposeid": comuneSelected.purpose_id,
            "nome_comune": comuneSelected.nome_comune
        });
    }
    
    console.log(item);
    setIsSelected(true);
};

  const generastream = async (e) => {
    e.preventDefault();

    console.log(data)
    try {
      if (data.apikey && data.aud && data.iss && data.kid && data.purposeid && data.nome_comune){
        const responseStream = await axios.post(
          "http://localhost:3014/generastream",data,{
            headers: {
              "Content-Type": "application/json"
            }
          }
         
        )
          
      if (responseStream.status == 200 || responseStream.status == 201) {
        setIsLoading(false);
        alert("Comune Configurato con successo!");
      }

      }
      
    } catch (err) {
      alert("Errore generazione Stream " + err.message);
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    console.log("oggetto",data)
  }, [obj])
  return (
    <>
      <form className={styles.formContainer}>
        <h2>Genera Stream</h2>

        <select
          value={selectedComune}
          onChange={(e)=>handleSelectChange(e)}
          className={styles.select}
        >
          <option value="">Seleziona un comune</option>
          {comuni.map((comune) => (
            <option key={comune.id_comune} value={comune.apikey}>
              {comune.nome_comune}
            </option>
          ))}
        </select>

        <button
          className={styles.button2}
          disabled={!isSelected}
          onClick={generastream}
        >
          Genera Stream
          
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
    </>
  );
};

export default GeneraStream;
