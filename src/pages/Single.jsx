import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function Single() {
  const { theId } = useParams();
  const location = useLocation();
  const type = location.state?.type;

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!type) return;
    fetch(`https://www.swapi.tech/api/${type}/${theId}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [theId, type]);

  if (loading) return <div className="p-4 text-white">Loading...</div>;
  if (!details) return <div className="p-4 text-white">No data found.</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{details.properties.name}</h1>
      <ul className="space-y-2">
        {Object.entries(details.properties).map(([key, value]) => (
          <li key={key}>
            <strong className="capitalize">{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}