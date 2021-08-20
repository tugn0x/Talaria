export const requiredConditions = (formData) => {
    const pubyear = (!formData.pubyear || formData.pubyear === null) ? "" : formData.pubyear;
    const pages = (!formData.pages ||formData.pages === null) ? "" : formData.pages;
    const place = (!formData.place ||formData.place === null) ? "" : formData.place;
    const authors = (!formData.authors ||formData.authors === null) ? "" : formData.authors;
    const part_authors = (!formData.part_authors ||formData.part_authors === null) ? "" : formData.part_authors;
    const volume = (!formData.volume || formData.volume === null) ? "" : formData.volume;
    let required = true;

    //da rivedere!!!
    if(formData.material_type === 1 /*||formData.material_type === 2*/)
    {
            /*if(pubyear !== "" &&  volume === ""){
                
                if(pages === "" && part_authors === ""){
                    required = true;
                }else if(pages !== "" || part_authors !== ""){
                    required = false;
                }
            }else if(pubyear === "" &&  volume === "") {
                required = true
            }else if(pubyear === "" &&  volume !== "") {
                if(pages === "" && part_authors === ""){
                    required = true;
                }else if(pages !== "" || part_authors !== ""){
                    required = false;
                }
            }else if(pubyear !== "" &&  volume !== "") {
                if(pages === "" && part_authors === ""){
                    required = true;
                }else if(pages !== "" || part_authors !== ""){
                    required = false;
                }
            }*/

            if (   
              (pubyear!=='' && pages!=='') ||
              (pubyear!=='' &&  part_authors!=='') ||
              (volume!=='' && pages!=='')  ||
              (volume!=='' && part_authors!=='')
            ) required=false;
            else required=true
    }
   /* else if (formData.material_type === 4)
    {
        if(pubyear === "" && authors === ""){
            required = true;
        }else if(pubyear !== "" || authors !== ""){
            required = false;
        }
    }
    else if (formData.material_type === 5)
    {
        if(pubyear === "" && authors === "" && place===""){
            required = true;
        }else if(pubyear !== "" || authors !== ""|| place!==""){
            required = false;
        }
    }*/
    

    return required
}