import { useState } from "react";
import styled from "styled-components";

export default function Autocomplete() {
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
      <ul>
        {data?.map((item) => {
          return <li key={item["1. symbol"]}>{item["1. symbol"]}</li>;
        })}
      </ul>
    </div>
  );
}
