    "use client"
    import Image from "next/image";
    import { useCallback, useEffect, useRef, useState } from "react";

    export default function Home() {
        const [length, setLength]= useState(8);
        const [isNumber, setIsNumber]= useState(false);
        const [isChar, setIsChar]= useState(false);
        const [password, setPassword] = useState("")
        const passwordRef = useRef<HTMLInputElement>(null)  

        const passwordGenerator = useCallback((len: number)=>{
            let pass = "";
            let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
            let num = "1234567890"
            let char = "(){}[];?"

            if (isNumber){
                str = str+num
            }
            if(isChar){
                str = str + char
            }

            for(let i=0 ; i<len;i++){
                const randIntStr= Math.floor((Math.random()*str.length))
                pass +=str[randIntStr]
            }

            setPassword(pass)
            },[length, isNumber, isChar])  

        const copyToClipboard = useCallback(()=>{
            passwordRef.current?.select()
            window.navigator.clipboard.writeText(password)
        },[password])

            useEffect(()=>{
                passwordGenerator(length)
        },[isChar, isNumber, length, passwordGenerator])

        return(
            <div className="flex justify-center align-center h-screen bg-blue-950">
            <div className="flex flex-col justify-center bg-amber-50 px-4 py-4 m-auto w-fit rounded-xl gap-4">
            <h1>Passsword Generator</h1>
            <div className="flex bg-gray-300 rounded-md h-auto justify-between" >
                <input className="px-4 w-full" 
                type="text" 
                placeholder="password" 
                value={password} 
                readOnly
                ref={passwordRef}/>
                <button className="p-2 bg-blue-300 rounded-md hover:bg-blue-400 transition-all duration-300 ease-in-out"
                onClick={copyToClipboard}
                >Copy</button>
            </div>
            <div className="flex gap-4 align-middle">
                <label htmlFor="">
                    <input type="checkbox" 
                    checked={isChar}
                    onChange={()=>{
                        setIsChar(((prev) => !prev))
                    }}
                    /> Character
                </label>
                <label htmlFor="">
                    <input type="checkbox" 
                    checked={isNumber}
                    onChange={()=>{
                        setIsNumber((prev) => !prev)
                    }}
                    /> Number
                </label>
                <label className="flex align-middle gap-1">
                    <input 
                    type="range" 
                    min={5} max={20} 
                    value={length}
                    onChange={(e)=>{
                        setLength(Number(e.target.value))
                    }}
                    /> Length {length}
                </label>
            </div>
            </div>
            </div>
        );
    }
