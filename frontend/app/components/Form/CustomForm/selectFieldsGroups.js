import { sortBy, groupBy } from 'lodash';

/** ***************** SELECTORS **********************/

export const selectFieldsGroups = (fields, fieldsGroups) => {
    
    if(Object.keys(fields).length <= 0){ 
        return
    }
    
    const fieldsArray = []
    
    // Trasforma i fields in Array
    Object.keys(fields).map(key => {
        return (
            fieldsArray.push(fields[key])
        )
    })
    
    // Crea un oggetto con i gruppi. Ogni gruppo un array
    let fieldsGroupsArray = groupBy(fieldsArray, 'group')
    
    // Ordina i fields a seconda dei gruppi e restituscimi un array.
    // [{info_generali: {}}, {info_amministrative: {}}, ... ]
    const orderedFieldGroups = []
    Object.keys(fieldsGroupsArray).map(group => {
        const label = fieldsGroups[group] ? fieldsGroups[group].label : ''
        orderedFieldGroups.push({ name: group, label: label, fields: sortBy([...fieldsGroupsArray[group]],'order','asc') })
    })
     
    return orderedFieldGroups
    

    /*
    return chain(fieldsArray)
      .groupBy('group').map((group, key) => {
        const label = fieldsGroups[key] ? fieldsGroups[key].label : ''
        const outputGroup = { name: key, label: label, fields: sortBy([...group],'order','asc') }
       
        return outputGroup
      }).value() */
  };
  
  