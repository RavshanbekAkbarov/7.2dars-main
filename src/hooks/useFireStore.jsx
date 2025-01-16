import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export function useFireStore(collectionName) {
  // Add a document to Firestore
  const addDocument = async (data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log("Document added successfully:", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Error adding document:", error);
      throw new Error(error.message);
    }
  };

  // Update a document in Firestore
  const updateDocument = async (data, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
      throw new Error(error.message);
    }
  };

  // Delete a document from Firestore
  const deleteDocument = async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      throw new Error(error.message);
    }
  };

  return { addDocument, updateDocument, deleteDocument };
}
