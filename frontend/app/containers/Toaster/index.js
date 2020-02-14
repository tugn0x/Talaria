import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { connect } from 'react-redux';
import { compose } from 'redux';
import "react-toastify/dist/ReactToastify.css";
import {removeToaster} from "./actions"

const toastList = new Set();
const MAX_TOAST = 3;

const Toaster = (props) => {
    const {notifications = []} = props
    let displayed = [];

    const storeDisplayed = (id) => {
        displayed = [...displayed, id];
    }; 

    const closeToaster = (key) => {
        props.dispatch(removeToaster(key));
       /*  displayed.filter(
            displayKey => displayKey !== key,
        ) */
    };

    const notify = (notification) => {
        const key = notification.key;
        if (notification.size === MAX_TOAST) {
            
            /*  if (toastId) {
             toastIdToDismiss = toastId;
            } */
            toast.dismiss(key)
        }
        switch (notification.variant) {
            case "success":
                return toast.success(notification.message, {
                    onClose: () => closeToaster(key),
                });
            case "error":
                return toast.error(notification.message, {
                    onClose: () => closeToaster(key),
                });
            case "info":
                return toast.info(notification.message, {
                    onClose: () => closeToaster(key),
                });
            default:
                return toast.info(notification.message, {
                    onClose: () => closeToaster(key),
                });
        }
    } 

    React.useEffect(() => {
        console.log("displayed", displayed)
        notifications.forEach((notification) => {
            // Do nothing if snackbar is already displayed
            if (displayed.includes(notification.key)){
                return
            }
            
          //  notify(notification)
            // Display snackbar using notistack
            // Keep track of snackbars that we've displayed
            storeDisplayed(notification.key);
        });
        console.log("displayed", displayed)
        console.log("notifications", notifications)
        return () => {
            // clearInterval(intervalRef.current);
        };
        // console.log(notifications)
    }, [notifications])

    return  (
            <>
                <ToastContainer
                        position="top-right"
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick={true}
                        draggable={false}
                        rtl={false}
                        autoClose={2000}
                    />
            </>
    )
}

const mapStateToProps = store => ({
    notifications: store.toasterNotification.notifications,
});

function mapDispatchToProps(dispatch) {
    return {
      dispatch,
    };
  }


const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(Toaster);
