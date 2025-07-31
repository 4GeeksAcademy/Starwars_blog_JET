import React, { useEffect, useState } from "react";
import SubjectCard from "./SubjectCard";

export default function Section({ title, endpoint }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${endpoint}`)
      .then((res) => res.json())
      .then((data) => setItems(data.results || []))
      .catch((err) => console.error(err));
  }, [endpoint]);

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <SubjectCard
            key={item.uid}
            item={{ ...item, type: endpoint }}
            type={endpoint}
          />
        ))}
      </div>
    </section>
  );
}