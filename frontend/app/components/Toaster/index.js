import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.scss';

const Toaster = (props) => {
    return  (
        <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={true}
            draggable={false}
            rtl={false}
            autoClose={2000}
        />
    )
}

export default Toaster;
