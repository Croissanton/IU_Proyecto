import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import { useEffect } from "react";
import "./DarkMode.css";




export const setLightMode = () => {
    document.querySelector("body").setAttribute('data-bs-theme', 'light')
    localStorage.setItem("selectedTheme", "light")
}
const DarkMode = () => {

    useEffect(() => {
        const checkbox = document.getElementById('darkmode-toggle');
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes" && mutation.attributeName === "data-bs-theme") {
                    const isDarkMode = document.body.getAttribute('data-bs-theme') === "dark";
                    checkbox.checked = isDarkMode;
                }
            });
        });
    
        observer.observe(document.body, {
            attributes: true // This configures the observer to watch for attribute changes.
        });
    
        // Cleanup function to disconnect the observer when the component unmounts
        return () => observer.disconnect();
    }, []);


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
    }else if(selectedTheme === "dyslexia-friendly"){
        document.querySelector("body").setAttribute('data-bs-theme', 'dyslexia-friendly')
    }else if(selectedTheme === "big-text"){
        document.querySelector("body").setAttribute('data-bs-theme', 'big-text')
    }else if(selectedTheme === "small-text"){
        document.querySelector("body").setAttribute('data-bs-theme', 'small-text')
    }
    
    const toggleTheme = e => {
        if (e.target.checked) {
            setDarkMode()
        } else {
            setLightMode()
        }
    }

    return (
        <div className='dark_mode d-flex align-items-center'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                defaultChecked={document.querySelector("body").getAttribute('data-bs-theme') === "dark"}
                onChange={toggleTheme}
                aria-label="Cambiar modo oscuro"
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
                <span className="visually-hidden">Toggle Dark Mode</span>
            </label>
        </div>
    );
};

export default DarkMode;
