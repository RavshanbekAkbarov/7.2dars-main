import { db } from "../firebase/config";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useCollection(collectionName) {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const q = collection(db, collectionName);
    onSnapshot(q, (querySnapshout) => {
      const data = [];
      querySnapshout.forEach((snapshot) => {
        data.push({ id: snapshot.id, ...snapshot.data() });
      });
      setDoc(data);
    });
  }, [collectionName]);
  return { doc };
}
