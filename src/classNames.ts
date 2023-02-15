export const classNames = (...classes: (string | undefined | boolean)[]) => {
    return classes.filter(Boolean).join(' ');
}


// const useLocalStorageValue = <T,>(key: string, initialValue: T) => {
//   const [value, setValue] = useState<T>(JSON.parse(localStorage.getItem(key) ?? '') || initialValue);

//   const setWithPersist = (value: T) => {
//     setValue(value)
//     localStorage.setItem(key, JSON.stringify(value));
//   }

//   return [value, setWithPersist]
// }