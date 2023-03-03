import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [veri, setVeri] = useState();
  const [tarih, setTarih] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json"
      )
      .then((res) => setVeri(res.data[tarih]))
      .catch((err) => console.log(err));
  }, [veri, tarih]);

  return (
    <div className="container">
      <div className="row">
        <div className="inp col-md-8 mx-auto mt-5">
          <h2 className="text-secondary text-center display-5 fw-bold">TURKEY</h2>
          <h2 className="text-white text-center display-5 mb-5">
            COVID-19 SEARCH
          </h2>
          <input
            type="text"
            placeholder="GG.AA.YY"
            className="form-control"
            onChange={(e) => {
              setTarih(e.target.value.replaceAll(".", "/"));
            }}
          ></input>
          <button type="button" class="btn btn-danger m-2">Submit</button>

          <table className="table table strike text-white">
            <thead>
              <tr className="border">
                <th scope="col">Date</th>
                <th scope="col">Test count</th>
                <th scope="col">Patient count</th>
                <th scope="col">Dead count</th>
              </tr>
            </thead>
            <tbody>
              <tr className={veri === undefined ? "bg-danger border" : "bg-success"}>
                <th scope="row">
                  {veri === undefined
                    ? "Veri Bekleniyor"
                    : veri.date.replaceAll("/", ".")}
                </th>
                <td>
                  {veri === undefined ? "Veri Bekleniyor" : veri.totalTests}
                </td>
                <td>
                  {veri === undefined ? "Veri Bekleniyor" : veri.patients}
                </td>
                <td>{veri === undefined ? "Veri Bekleniyor" : veri.deaths}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
