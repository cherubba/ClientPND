"use client";
import styles from "../app/dashboard.module.css";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Tabella from "./Tabella";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const router = useRouter();
  const [comuni, setComuni] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3014/configurazioniAll");
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

  return (
    <>
      <div className={styles.dashboard}>
        <div>
          <h2 style={{ textAlign: "center", padding: "" }}>Step 1</h2>
          <div
            className={styles.card}
            onClick={() => router.push("pages/nuovocomune")}
          >
            Aggiungi Comune
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="95"
              height="95"
              fill="#3dbd8c"
              className="bi bi-plus-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="#fff"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>

        <div>
          <h2 style={{ textAlign: "center", padding: "3px" }}>Step 2</h2>
          <div
            className={styles.card}
            onClick={() => router.push("pages/generachiave")}
          >
            Genera Chiave
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="#3dbd8c"
              class="bi bi-key-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="#fff"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>

        <div>
          <h2 style={{ textAlign: "center", padding: "3px" }}>Step 3</h2>
          <div
            className={styles.card}
            onClick={() => router.push("pages/generametadata")}
          >
            Inserisci Meta Data
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="#3dbd8c"
              class="bi bi-card-heading"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
              <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="#fff"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
        <div>
          <h2 style={{ textAlign: "center", padding: "3px" }}>Step 4</h2>
          <div
            className={styles.card}
            onClick={() => router.push("pages/generastream")}
          >
            Genera Stream
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="110"
              height="110"
              fill="#3dbd8c"
              className="bi bi-soundwave"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5m12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.dashboard2}>
        <h3>Comuni Abilitati</h3>
        <Tabella dati={comuni} />
      </div>
    </>
  );
};

export default Dashboard;
