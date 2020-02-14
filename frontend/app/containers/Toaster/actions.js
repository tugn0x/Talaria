export const ENQUEUE_TOASTER = '@TOASTER/ENQUEUE_TOASTER';
export const CLOSE_TOASTER = '@TOASTER/CLOSE_TOASTER';
export const REMOVE_TOASTER = '@TOASTER/REMOVE_TOASTER';



export const enqueueToaster = notification => {
    const key = notification.key;
    return {
        type: ENQUEUE_TOASTER,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = key => ({
    type: CLOSE_TOASTER,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeToaster = key => ({
    type: REMOVE_TOASTER,
    key,
});



export const enqueueToasterSuccess = (text, variant = "success") => {
   console.log("enqueueToasterSuccess")
   return enqueueToaster({
        message: text,
        key: new Date().getTime() + Math.random(),
        variant,
        
    });
}

