import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Toaster = (props) => {
    return  (
        <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={true}
            draggable={false}
            rtl={false}
            newestOnTop={true}
            // autoClose={2000}
        />
    )
}

export default Toaster;
