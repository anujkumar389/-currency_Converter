import { useEffect, useState } from "react";

function useCurrencyinfo(currency) {
    
  const [data, setData] = useState({});     // or use {} if expecting an object
  const [error, setError] = useState({});

  useEffect(() => {
    if (!currency) return; // Prevent running with empty input

    const fetchData = async () => {
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/def19df1be38e766ccc3db58/latest/${currency}`);
        const result = await res.json();

        if (result.result === "success") {
          setData(result.conversion_rates); // ✅ Correctly extract currency rates
        } else {
          throw new Error(result["error-type"]);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err);
        setData(null);
      }
    };

    fetchData();
  }, [currency]);

  return data;
}

export default useCurrencyinfo;
