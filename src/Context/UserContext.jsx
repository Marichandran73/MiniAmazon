// import { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';

// const ProfileContext =createContext();


// export const UserProfile = () => useContext(ProfileContext);


// export const UserContext =({children})=>{

//     const [showUserPanel, setShowUserPanel] = useState(false);

// const toggleUserPanel = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     setShowUserPanel(!showUserPanel);
//   } else {
//     navigate("/Signup");
//   }
// };


//     return (
//         <ProfileContext.provider 
//         value={{

//         }}>
//             {children}
//         </ProfileContext.provider>
//     )
// }