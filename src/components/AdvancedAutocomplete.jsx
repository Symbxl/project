import { useState } from "react";
import styled from "styled-components";

export default function AdvancedAutocomplete() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (formData) => {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${formData}&apikey=7KU10ELT3EL386PZ`
    );
    const { bestMatches } = await response.json();
    setData(bestMatches);
    setIsLoading(false)
  };

  const handleChange = (e) => {
    setIsLoading(true)
    getData(e.target.value);
  };

  return (
    <div>
      <form id="example">
        <input type="text" onChange={handleChange} placeholder="search stock name or symbol" />
      </form>
      { isLoading && ( <div>loading...</div>) }
      <table>
        <thead>
          <tr>
            <th>Stock name</th>
            <th>Stock symbol</th>
          </tr>
        </thead>
          <tbody>
        {data?.map((item) => {
          return (
              <tr>
                <td>{item["2. name"]}</td>
                <td>{item["1. symbol"]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
