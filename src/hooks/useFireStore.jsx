import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

import { useState, useReducer } from "react";
const document = {
  document: null,
  isPending: false,
  error: null,
  success: true,
};

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_DOUMENT":
      return {
        document: payload,
        isPeding: false,
        error: null,
        success: true,
      };
    case "ERROR":
      return {
        document: null,
        isPeding: false,
        error: payload,
        success: false,
      };
    case "IS_PENDING":
      return {};
  }
};

function useFireStore(collectionName) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const addDocument = async (data) => {
    dispatchEvent({ type: "IS_PENDING", payload: true });
    try {
      let newDoc = await addDoc(collection(db, collectionName), data);
      dispatchEvent({});
      toast.success("Project added ");
    } catch (error) {
      toast.success("error Code");
    } finally {
    }
    return { addDocument };
  };
}
export { useFireStore };
