import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";

export const useLogin = () => {
  const dispatch = useDispatch();
  const loginWithEmailandPassword = async (displayName, email, password) => {
    console.log(email, password);

    let res = await signInWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), {
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,

      id: res.user.uid,
      online: true,
    });
    dispatch(login(profile.user));
  };

  return { loginWithEmailandPassword };
};
