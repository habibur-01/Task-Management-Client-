import { createContext, useEffect, useState } from "react";
import auth from '../Firebase/Firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {PropTypes} from "prop-types"

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider();

    const crearteUser = (email, password) => {
     setLoading(true)
     return createUserWithEmailAndPassword(auth, email, password) 

    }

    const logInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setuser(currentUser)
            setLoading(false)
        })
        return(()=>{
            unSubscribe()
        })
    },[])

    const createUserWithGoogle = () => {
        setLoading(true)
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
        createUserWithGoogle,
        loading
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