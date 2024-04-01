import { createContext, useEffect, useState } from "react";
import auth from '../Firebase/Firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {PropTypes} from "prop-types"

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null)

    const provider = new GoogleAuthProvider();

    const crearteUser = (email, password) => {

     return createUserWithEmailAndPassword(auth, email, password) 

    }

    const logInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setuser(currentUser)
        })
        return(()=>{
            unSubscribe()
        })
    },[])

    const createUserWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }

    const userLogOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        user,
        crearteUser,
        logInUser,
        userLogOut,
        createUserWithGoogle
    }
    
    return (
        
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes={
    children: PropTypes.node
}

export default AuthProvider;