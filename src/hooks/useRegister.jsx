import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { v4 as uuid } from "uuid";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

export function useRegister() {
  const dispatch = useDispatch();
  const registerWithEmailEndPassword = async (displayName, email, password) => {
    let res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: "https://api.dicebear.com/9.x/micah/svg?seed=" + uuid(),
    });

    await setDoc(doc(db, "users", res.user.uid), {
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
      id: res.user.uid,
      online: true,
    });

    dispatch(login(profile.user));
  };
  return { registerWithEmailEndPassword };
}
