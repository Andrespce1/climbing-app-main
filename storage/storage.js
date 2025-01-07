import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware';

export const storage = new MMKV({
    id:'climbing-storage'
});

export const zustandStorage ={
    setItem:(name,value)=>{
        return storage.set(name,value)
    },
    getItem:(name)=>{
        const value = storage.getString(name);
        return value ?? null;
    },
    removeItem:(name)=>{
        return storage.delete(name);
    }
}