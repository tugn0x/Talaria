export const requiredConditions = (formData) => {
    const pubyear = formData.pubyear === null ? "" : formData.pubyear;
    const page_start = formData.page_start === null ? "" : formData.page_start;
    const first_author = formData.first_author === null ? "" : formData.first_author;
    const volume = formData.volume === null ? "" : formData.volume;
    let required = true;
    
    if(pubyear !== "" &&  volume === ""){
        if(page_start === "" && first_author === ""){
            required = true;
        }else if(page_start !== "" || first_author !== ""){
            required = false;
        }
    }else if(pubyear === "" &&  volume === "") {
        required = true
    }else if(pubyear === "" &&  volume !== "") {
        if(page_start === "" && first_author === ""){
            required = true;
        }else if(page_start !== "" || first_author !== ""){
            required = false;
        }
    }else if(pubyear !== "" &&  volume !== "") {
        if(page_start === "" && first_author === ""){
            required = true;
        }else if(page_start !== "" || first_author !== ""){
            required = false;
        }
    }
    
    return required
}