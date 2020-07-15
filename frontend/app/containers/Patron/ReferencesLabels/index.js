import React, {useEffect, useState} from 'react';
import {requestLabelsOptionList, requestUpdateLabel} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {labelsOptionListSelector, isPatronLoading} from '../selectors';
import {Row, Col, Button} from 'reactstrap';
// import Loader from 'components';
import {useIntl} from 'react-intl';


const ReferencesLabels = props => {
    console.log('ReferencesLabels', props)
    const {dispatch, labelsOptionList, loading} = props
    
    const [items, setItems] = useState([])

    useEffect(() => {
        dispatch(requestLabelsOptionList())
    }, [])

    useEffect(() => {
        if(labelsOptionList.length > 0){
            labelsOptionList.map(label => {
                setItems(state => [...state, {id: label.id, name: label.label, isEdit: false} ])
            })
        }
    }, [labelsOptionList])

    const handleSetItems = (i, e) => {
        const newItems = items
        !e ? newItems[i].isEdit = !newItems[i].isEdit : newItems[i].name = e.target.value
        setItems([...newItems])
    }

    const saveItem = (label_id, name, i) => {
        dispatch(requestUpdateLabel(label_id, name))
        handleSetItems(i)
    }

    return (
        <div>
            <h1 className="section-title large">Labels</h1>
            {labelsOptionList.length > 0 && items.length > 0  && labelsOptionList.map((label, i) => (
                <Row key={`${label.label}-${label.value}`} className="list-row justify-content-between">
                    {/* <Col sm={2} className="select-checkbox">
                        <input type="checkbox" onChange={() => null}  value={data.id} checked={checked}  />
                    </Col>  */}
                    {loading && items[i].id === label.value && 
                        null
                    ||
                        <Col xs={8} className="info">
                            {items[i].isEdit && 
                                <input type="text" onChange={(e) => handleSetItems(i, e)} value={items[i].name} />
                            ||
                                <h4>{label.label}</h4>
                            }
                        </Col>
                    }
                    <Col xs={4} className="icons align-self-center">
                        {items[i].isEdit && <Button onClick={() => saveItem(label.value, items[i].name, i)} color="default">
                            <i className="fas fa-save"></i>
                        </Button>}
                        {!items[i].isEdit && <Button onClick={() => handleSetItems(i)} color="default">
                            <i className="fas fa-edit"></i>
                        </Button>}
                        {<Button onClick={() => console.log('delete label')} color="default">
                            <i className="fas fa-trash"></i>
                        </Button> }
                    </Col> 
                </Row>
            ))}
            
        </div>
    );
};



const mapStateToProps = createStructuredSelector({
    labelsOptionList: labelsOptionListSelector(),
    loading: isPatronLoading()
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

export default compose(withConnect)(ReferencesLabels);