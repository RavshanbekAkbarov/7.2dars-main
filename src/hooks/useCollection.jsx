import { db } from "../firebase/config";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useCollection(collectionName) {
  const [doc, setDoc] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName) {
      setError("Collection name is required");
      return;
    }

    const q = collection(db, collectionName);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((snapshot) => {
          data.push({ id: snapshot.id, ...snapshot.data() });
        });
        setDoc(data); 
        setError(null);
      },
      (err) => {
        console.error("Error fetching collection:", err);
        setError("Failed to fetch data. Please try again.");
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { doc, error };
}
