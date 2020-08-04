export const requiredConditions = (formData) => {
    let required = true;
    
    if(formData.pubyear !== "" ){
        if(formData.page_start === "" && formData.first_author === "" && formData.volume === ""){
            required = true;
        }else if(formData.page_start !== "" || formData.first_author !== "" && formData.volume === ""){
            required = false;
        }
    }else {
        if(formData.volume === ""){
            required = true;
        }else if(formData.page_start !== "" || formData.first_author !== ""){
            required = false;
        }
    }
    if(formData.volume !== ""){
        if(formData.page_start === "" && formData.first_author === "" && formData.pubyear === ""){
            required = true;
        }else if(formData.page_start !== "" || formData.first_author !== ""){
            required = false;
        }
    }else {
        if(formData.pubyear === ""){
            required = true;
        }else if(formData.page_start !== "" || formData.first_author !== "" && formData.pubyear !== ""){
            required = false;
        }
    }  
    return required
}