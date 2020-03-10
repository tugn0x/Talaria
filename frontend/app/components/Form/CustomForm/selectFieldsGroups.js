import { chain, sortBy } from 'lodash';

/** ***************** SELECTORS **********************/

export const selectFieldsGroups = (fields, fieldsGroups) => {
    const myFields = []
    Object.keys(fields).map(key => {
        return (
            myFields.push(fields[key])
        )
    })
    if (myFields.length === 0) {
        return [];
    }
    // groupBy
    return chain(myFields)
      .groupBy('group').map((group, key) => {
        const label = fieldsGroups[key] ? fieldsGroups[key].label : ''
        const outputGroup = { name: key, label: label, fields: sortBy([...group],'order','asc') }
        return outputGroup
      }).value()
  };
  
  