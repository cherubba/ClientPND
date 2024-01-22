const stileTabella = {
  width: "100%", // Usa l'intera larghezza
  borderCollapse: "collapse", // Rimuove spazi tra i bordi delle celle
};

const stileCella = {
  border: "1px solid #ddd", // Aggiunge un bordo leggero
  padding: "8px", // Aggiunge spazio all'interno delle celle
  textAlign: "left", // Allinea il testo a sinistra
};

const Tabella = ({ dati }) => {
  return (
    <table style={stileTabella}>
      <thead>
        <tr>
          <th style={stileCella}>Nome Comune</th>
          <th style={stileCella}>Codice Fiscale</th>
          <th style={stileCella}>Apikey</th>
          <th style={stileCella}>Gruppo</th>
          <th style={stileCella}>Stream ID</th>
          <th style={stileCella}>Slug Comune</th>
          <th style={stileCella}>Private Key</th>
          <th style={stileCella}>Meta Data</th>
        </tr>
      </thead>
      <tbody>
        {dati.map((riga, index) => (
          <tr key={index}>
            <td style={stileCella}>{riga.nome_comune}</td>
            <td style={stileCella}>{riga.codicefiscale_comune}</td>
            <td style={stileCella}>{riga.apikey}</td>
            <td style={stileCella}>{riga.gruppo}</td>
            <td style={stileCella}>{riga.stream_id}</td>
            <td style={stileCella}>{riga.slug_comune}</td>
            <td style={stileCella}>
              {riga.private_key ? "Generata" : "Non Generata"}
            </td>
            <td style={stileCella}>{riga.meta_data ? "Inseriti": "Non Inseriti"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabella;
