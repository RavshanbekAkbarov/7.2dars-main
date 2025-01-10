import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

function useFireStore() {
  const addDocument = async (collectionName, data) => {
    try {
      await addDoc(collection(db, collectionName), data);
      toast.success("Project added");
    } catch (error) {
      toast.success("error Code");
    }
  };
  return { addDocument };
}

export { useFireStore };
