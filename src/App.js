import React, { useState } from "react";
import csvtojson from "csvtojson";
import "./style.css";

function CsvFileInput() {
  const [csvData, setCsvData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleFileChange(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = async function (event) {
      const csvString = event.target.result;
      setIsLoading(true);

      const jsonArray = await csvtojson().fromString(csvString);

      setCsvData(jsonArray);
      setIsLoading(false);
    };

    reader.readAsText(file);
  }

  return (
    <div>
      <div>
        <h1>CSV FILE PARSER</h1>
      </div>
      <div className="file-input-container">
        <input type="file" onChange={handleFileChange} />
      </div>
      {isLoading && <div className="loading">Loading...</div>}
      {csvData && (
        <div>
          <table className="data-table">
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row) => (
                <tr key={row.id}>
                  {Object.values(row).map((value) => (
                    <td key={value}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CsvFileInput;
