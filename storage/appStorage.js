// import {create} from 'zustand'
// import {createJSONStorage, persist} from 'zustand/middleware'
// import { zustandStorage } from './storage';

// const useAppStorageHook = create(
    
//     persist(
//         (set,get) => ({
//             appUser:{
//                 "idUsu": 0,
//                 "nombreUsu": "",
//                 "tokenUsu": "",
//                 "rolesUsu": "",
//                 "activoUsu": false
//             },
//             setAppUser:(appUser)=>{
//                 set({appUser})
//             },
//             unsetAppUser:()=>{
//                 set({appUser:{
//                     "idUsu": 0,
//                     "nombreUsu": "",
//                     "tokenUsu": "",
//                     "rolesUsu": "",
//                     "activoUsu": false
//                 }})
//             },
//         }
//     ),
//     {
//       name:'climbing-app-storage',
//       storage: createJSONStorage(()=>zustandStorage),
//     }
// )

// )



import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import { zustandStorage } from './storage';

const useAppStorageHook = create(
    persist(
        (set,get) => ({
            appUser: null,
            // {
            //     "idUsu": 1111,
            //     "nombreUsu": "",
            //     "tokenUsu": "",
            //     "rolesUsu": "",
            //     "activoUsu": false
            // },
            setAppUser:(appUserInput)=>{
                set(()=>{return {appUser:appUserInput}})
            },
            unsetAppUser:()=>{
                set({appUser:null
                    // {
                    // "idUsu": 0,
                    // "nombreUsu": "",
                    // "tokenUsu": "",
                    // "rolesUsu": "",
                    // "activoUsu": false
                    // }
            })
            },
        }
    ),
    {
        name:'climbing-app-storage',
        storage: createJSONStorage(()=>zustandStorage),
    }
)


)

export default useAppStorageHook;