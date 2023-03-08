//NOTE: some filds we have in reference don't exists in standard Openurl (like issn-l, oa_link..)!
//so my are not imported correctly in new reference! 
export const generateOpenURL = (reference) => {
    let url="/openurl"
    if(reference && Object.keys(reference).length>0)
    {
        //Generate std OpenURL
        url+="?url_ver=Z39.88-2004&ctx_ver=Z39.88-2004&url_ctx_fmt="+encodeURIComponent("info:ofi/fmt:kev:mtx:ctx");         
        
        if(reference.abstract)
            url+="&abstract="+encodeURIComponent(reference.abstract);      

        if(reference.issue)
            url+="&rft.issue="+reference.issue;    
        
        if(reference.volume)
            url+="&rft.volume="+reference.volume;        
        
        if(reference.pages)
            url+="&rft.pages="+reference.pages;            

        if(reference.pubyear)
            url+="&rft.date="+reference.pubyear;                

        if(reference.doi)
            url+="&rft_id="+encodeURIComponent("info:doi/"+reference.doi); 
        
        if(reference.pmid)
            url+="&rft_id="+encodeURIComponent("info:pmid/"+parseInt(reference.pmid,10));
        
        if(reference.issn)
            url+="&rft.issn="+reference.issn;   

        if(reference.isbn)
            url+="&rft.ibsn="+reference.isbn;       

        if(reference.sid)
            url+="&rfr_id="+encodeURIComponent("info:sid/"+reference.sid);      
        
        if(reference.publisher)            
            url+="&rft.pub="+encodeURIComponent(reference.publisher);                       
        
        if(reference.publishing_place)            
            url+="&rft.place="+encodeURIComponent(reference.publishing_place);                        
        
        if(reference.part_authors) 
        {
            let i=0;
            reference.part_authors.split(',').map ( au=>{
                if(i==0)
                {
                    let first=au.split(' ');
                    url+="&rft.aufirst="+encodeURIComponent(first[0])
                    url+="&rft.aulast="+encodeURIComponent(first[1]);
                }
                url+="&rft.au="+encodeURIComponent(au.trim())
                i++
            })
        } 
        
        if(reference.material_type==1)
        {
            url+="&rft_val_fmt="+encodeURIComponent("info:ofi/fmt:kev:mtx:journal");                       
            if(reference.pub_title!="")
            {            
                url+="&rft.jtitle="+encodeURIComponent(reference.pub_title);
                url+="&rft.genre=article";
            } 
            if(reference.part_title!="")
                url+="&rft.atitle="+encodeURIComponent(reference.part_title);
        }
        if(reference.material_type==2) //book
        {
            url+="&rft_val_fmt=".urlencode("info:ofi/fmt:kev:mtx:book");    
            if(reference.pub_title!="")
            { 
                url+="&rft.btitle="+encodeURIComponent(reference.pub_title);
                url+="&rft.genre=bookitem";
            }
            if(reference.part_title!="")
                url+="&rft.atitle="+encodeURIComponent(reference.part_title);            
        }       
    }

    console.log("generatedOpenURL:",url)
    
    return url;
}

//TODO: check and finish
export const parsePubmedReference = (reference) => {
    let newref={}
    newref['material_type']=1; 
    Object.keys(reference).map ( (k)=>{
        let v=reference[k];

        switch (k) {
            case 'crossref_type':
                 if(v=="journal-article")
                    newref['material_type']=1; 
                 break; 
            case 'journal':
                newref['pub_title']=v; break;
            case 'title':
                    newref['part_title']=v; break;    
            case 'year':
                    newref['pubyear']=v; break;                
            case 'page':
                    newref['pages']=v; break;                        
            case 'volume':
                        newref['volume']=v; break;                                
            case 'issue':
                        newref['issue']=v; break;                                                        
            case 'issn':
                    newref['issn']=v[0]; break;                     
            case 'abstract':
                    newref['abstract']=v; break;                             

        }
    })
    return newref;
}
 
export const parseOpenURL = (params) => {    

    const queryString = require('query-string');
    const queryArr = queryString.parse(params,{arrayFormat:'none'});
    console.log("Openurl->params",queryArr);

    let ref={}

    //TO FINISH parsing with check on pubtype, openurl version and fiels mapping
    if(queryArr["url_ver"]=="Z39.88-2004" || queryArr["url_ctx_fmt"]=="info:ofi/fmt:kev:mtx:ctx")
    {
        Object.keys(queryArr).map( (k) => {
            let v=queryArr[k];        
            switch(k) {
                case "rft_val_fmt":
                case 'rft.genre':
                    if(v=='article'||v=="info:ofi/fmt:kev:mtx:journal")
                        ref['material_type']=1
                    else if(v=='book'||v=="info:ofi/fmt:kev:mtx:book")
                        ref['material_type']=2                                   
                    break;

                case 'rft.jtitle':
                case 'rft.btitle':
                case 'rft.title':
                    ref["pub_title"]=v; 
                    break;
                case 'rft.atitle':    
                    ref["part_title"]=v; 
                    break;
                case 'rft.date':
                    let d = new Date(v);                        
                    ref["pubyear"]=d.getFullYear(); 
                    break;                    
                case 'rft.spage':
                    ref["pages"]=v; 
                    break;
                case 'rft.epage':
                    ref["pages"]="-"+v; 
                    break;    
                case 'rft.pages':
                    ref["pages"]=v; 
                    break;
                case 'rft.issn':
                    ref["issn"]=v;
                    break;
                case 'rft.volume':
                    ref["volume"]=v;
                    break;    
                case 'rft.issue':
                    ref["issue"]=v;
                    break;       
                case 'rft.pub':
                    ref["publisher"]=v;
                    break; 
                case 'rft.place':
                    ref["publishing_place"]=v;
                    break;    
                case 'rft.au': 
                    ref["part_authors"]=v.toString();                   
                    break;  
                case 'rft_id':  //can be multiple value (so array not string)
                
                    let rft_id_arr=Array();

                    if(!Array.isArray(v)) //if not array
                        rft_id_arr.push(v); //now is array with 1 value
                    else rft_id_arr=v; //leave it as array    

                    if(Array.isArray(rft_id_arr))
                        Object.keys(rft_id_arr).map( (k) => { 
                            let vid=rft_id_arr[k];
                            if(vid.startsWith('info:doi/'))
                            {
                                ref["doi"]=vid.substring(9);
                            }
                            else if(vid.startsWith('info:pmid/'))
                            {
                                ref["pmid"]=vid.substring(10);
                            }          
                        })                             

                    break;                                         
            }

        })
    } 
    return ref;
}