import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useReducer } from "react";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_DOCUMENT":
      return {
        document: payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: payload,
        success: false,
      };
    case "IS_PENDING":
      return {
        ...state,
        isPending: true,
        error: null,
      };
    default:
      return state;
  }
};

function useFireStore(collectionName) {
  const [state, dispatch] = useReducer(changeState, initialState);

  const addDocument = async (data) => {
    dispatch({ type: "IS_PENDING" });

    try {
      let newDoc = await addDoc(collection(db, collectionName), data);
      dispatch({ type: "ADD_DOCUMENT", payload: newDoc });
      toast.success("Document added successfully!");
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      toast.error("Error adding document!");
    }
  };

  return { ...state, addDocument };
}

export { useFireStore };
