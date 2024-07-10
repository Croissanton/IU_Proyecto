import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";




export const setLightMode = () => {
    document.querySelector("body").setAttribute('data-bs-theme', 'light')
    localStorage.setItem("selectedTheme", "light")
}
const DarkMode = () => {


    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-bs-theme', 'dark')
        localStorage.setItem("selectedTheme", "dark")
    }

    const selectedTheme = localStorage.getItem("selectedTheme")

    if (selectedTheme === "dark") {
        setDarkMode()
    }else if(selectedTheme === "light"){
        setLightMode()
    }else if(selectedTheme === "high-contrast"){
        document.querySelector("body").setAttribute('data-bs-theme', 'high-contrast')
    }else if(selectedTheme === "low-contrast"){
        document.querySelector("body").setAttribute('data-bs-theme', 'low-contrast')
    }


    const toggleTheme = e => {
        if (e.target.checked) {
            setDarkMode()
        } else {
            setLightMode()
        }
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                defaultChecked={selectedTheme === "dark"}
                onChange={toggleTheme}
                aria-label="Cambiar modo oscuro"
                tabIndex={0}
                role="tab"
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
