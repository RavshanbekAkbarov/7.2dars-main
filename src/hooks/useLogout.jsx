import { toast } from "react-toastify";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

export function useLogout() {
  const { user } = useSelector((store) => store.user);
  const logout = async () => {
    let ref = doc(db, "users", user.uid);
    await updateDoc(ref, {
      online: false,
    });
    signOut(auth)
      .then(() => {
        toast.success("See you again")
      })
      .catch(() => {
        toast.error(error.message);
      });
  };
  return { logout };
}
