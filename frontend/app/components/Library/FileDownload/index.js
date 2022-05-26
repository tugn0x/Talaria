
// // import React, { useEffect } from 'react';
// // import { connect } from 'react-redux';
// // import {requestdownloadFile} from '../../../containers/Library/actions'
// // import { bindActionCreators } from 'redux'

// // const FileDownload = props => {
// // const {dispatch,requestdownloadFile, data, base64content }=props 

// // const handleClick = () => {
// // // var libraryid = props.data.library.data.id
// // // var filehash = props.data.filehash
// // //alert(JSON.stringify(data))
// // requestdownloadFile(data.id,data.filehash,data.library.data.id,'','','')
// // }

// // useEffect(() => {
// //     console.log("base64content" + base64content)
// //     var dlnk = document.getElementById('dwnldLnk');
// //     dlnk.href = 'data:application/octet-stream;base64,' + base64content;
// //     dlnk.download="333.talaria"
// //     dlnk.click(); 
// //   }, [base64content]);

// // return (
// // <div>
// // <button type="button" onClick={() => handleClick(props)} className="btn btn-info">Download / View </button>
// // <a id='dwnldLnk' download={props.data.filehash} /> 
// // </div> 
// // );
// // }

// // const mapStateToProps = (state) => {
// // return { base64content:state.library.filedownload.filecontent };
// // };

// // const mapDispatchToProps = dispatch => bindActionCreators({
// // requestdownloadFile,
// // }, dispatch);

// // export default connect(mapStateToProps, mapDispatchToProps)(FileDownload)


// import React, { useEffect, useState }  from 'react';
// import { connect } from 'react-redux';
// import {requestdownloadFile} from '../../../containers/Library/actions'
// import { bindActionCreators } from 'redux'

// import downloadFile from 'large-file-downloader';

// const FileDownload = props => {
// const {requestdownloadFile, data, base64content}=props 
// const [downloaded,setdownloaded]=useState(null);

// // useEffect(() => {
// //         console.log("base64content" + base64content)
// //         var dlnk = document.getElementById('dwnldLnk');
// //         dlnk.href = 'data:application/octet-stream;base64,' + base64content;
// //         dlnk.download="333.pdf333"
// //         dlnk.click(); 
// //     }, [base64content]);


//     useEffect(function effectFunction() {
//       if (!downloaded)
//       {
//         console.log("base64content" + base64content)
//         var dlnk = document.getElementById('dwnldLnk');
//         dlnk.href = 'data:application/octet-stream;base64,' + base64content;
//         dlnk.download=data.filehash+"p"
//         dlnk.click(); 
//       }
//       setdownloaded(true)
//     }, [filedownload.filecontent])

 


// const handleClick  = () => {
//         var libraryid = data.library.data.id
//         var filehash = data.filehash
//         setdownloaded(false)  
//         requestdownloadFile(data.id,filehash,libraryid,'','','')
// }



// return   (
//     <div>
//         <button type="button" onClick={() => handleClick()} className="btn btn-info">Download</button>
//         <a id='dwnldLnk' download={data.filehash}  /> 
//     </div> 
//     );
// }

// const mapStateToProps = (state) => {
//   return { base64content:state.library.filedownload[1]};
// };

// const mapDispatchToProps = dispatch => bindActionCreators({
//   requestdownloadFile,
// }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(FileDownload)