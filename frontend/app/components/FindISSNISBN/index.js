import React, { useEffect, useState } from 'react';
import './style.scss';
import { useIntl } from 'react-intl';


const ISSNISBNItem = props => {
  const { data, chooseItem } = props;

  const obj = data
  obj.issn_l = obj.issn // on object create new key name. Assign old value to this
 

  return (
    <li className="list-group-item">
      {obj.issn && (<span>ISSN: {obj.issn_l} | ISSN_L: {obj.rabihkahaleh} | Title: {obj.pub_title}</span>)}
      {obj.isbn && (<span>ISBN: {obj.isbn} | SBNDOCID: {obj.sbn_docid} | Title: {obj.pub_title}</span>)}
      <button className="btn btn-primary" style={{float: 'right'}} onClick={ev => chooseItem(data)}>
        Update reference
      </button>
    </li>
  );
};

const FindISSNISBN = props => {
  const intl = useIntl();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(15);
  const {reqdata,findCB,updateISSNISBNcallback, results} = props;
  
  useEffect(() => {
    if (typeof findCB === 'function' && reqdata != null) findCB(reqdata);
  }, [reqdata]);

  const updateReference = values => {
    if (typeof updateISSNISBNcallback === 'function') {
      /*console.log("ISSN Selected -> updateCallback!", values)
            let data={                
                [typ]: value //issn:xxx, o isbn:xxx
            }            
            if(title)
                data.pub_title=title*/
      updateISSNISBNcallback(values);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = results.data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const Paging = (postsPerPage, totalPosts) => {
    const pageNumbers = [];
    
    for (let i = 1;i <= Math.ceil(postsPerPage.totalPosts / postsPerPage.postsPerPage);i++) {
      pageNumbers.push(i);
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="list-group-item">
              <a onClick={() => paginate(number)} href="#" className="=page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <>
      {reqdata && (
        <div className="findISSNISBN">
        <h2 class="text-center">Choose the correct ISSN/ISBN</h2>
          {results.loading && (
            <span>
              searching for ISSN... <i className="fa-solid fa-spinner fa-spin-pulse" />
            </span>
          )}
          {(!results.loading && results != null && results.data && results.data.length > 0 && (
              <ul className="issnisbn_list">
                {currentPosts.map((row, index) => (
                  <>
                    <ISSNISBNItem
                      key={index}
                      data={row}
                      chooseItem={() => updateReference(row)}
                    />
                  </>
                ))}
              </ul>
            )) || (
            <span className="alert alert-warning">
              No matching results or ISSN/ISBN search not available
            </span>
          )}
        </div>
      )}
      {results.data.length > 0 && (
        <Paging
          postsPerPage={postsPerPage}
          totalPosts={results.data.length}
          paginate={paginate}
        />
      )}
    </>
  );
};

export default FindISSNISBN;
