import {auth} from '../../firebase/config'
import { authSlice } from './authReducer';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';

export const authSignUpUser = ({login, email, password, avatar})=> async(dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: login,
          photoURL: avatar,
        });
  
        const user = auth.currentUser;
  console.log('currentUser---------', user);
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            login: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          })
        );
    }catch(error){
        console.log('error', error)
    }

}

export const authSignInUser = ({email, password})=> async(dispatch, getState) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log('user login', user);
    }catch(error){
        console.log('error', error)
    }

}



export const authSignOutUser = ()=> async(dispatch, getState) => {
    try {
        await signOut(auth)
    
        dispatch(authSlice.actions.authSignOut());
      } catch (error) {
        
      };
}
export const authStateChangeUser = () => async (dispatch, getState) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            login: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          })
        );
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      }
    });
  };
  export const authUpdateUserAvatar = ({ avatarUrl }) =>
  async (dispatch, getState) => {
    try {
      await updateProfile(auth.currentUser, { photoURL: avatarUrl });
      const user = auth.currentUser;
      
      if (user) {
        dispatch(authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL
        }));
      };
        
    } catch (error) {
      console.log(error);
    }
  };

  export const authDeleteUserAvatar = () =>
  async (dispatch, getState) => {
    try {
      await updateProfile(auth.currentUser, { photoURL: "" });
      const user = auth.currentUser;
      
      if (user) {
        dispatch(authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL
        }));
      };
        
    } catch (error) {
      console.log(error);
    }
  };