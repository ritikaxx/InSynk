import  MovieModal from "./MovieModal";
import {useState} from "react";
import { useEffect } from "react/cjs/react.development";
import Card from "./Card";
let API_key="&api_key=db95773a7fb212ba790d71f6adac0e7e";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Latest Movie Shows"];
const Main=()=>{
    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();
    const [modalShow, setModalShow] = useState(false);
    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            setData(data.results);
        });
    },[url_set])

    const getData=(movieType)=>{
        if(movieType==="Popular")
        {
            url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
        }
      
        setUrl(url);

    }
    const searchMovie=(evt)=>{
        if(evt.key==="Enter")
        {
            url=base_url+"/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }
    return(
        <>
            <div className="header">
                <nav>
                    <ul>
                        {
                            arr.map((value,pos)=>{
                                return(
                                    <li><h2><a href="/" key={pos} name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></h2></li>
                                )
                            })
                        }
                       
                    </ul>
                </nav>
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Enter Movie Name" 
                        className="inputText" onChange={(e)=>{setSearch(e.target.value)}} 
                        value={search} onKeyPress={searchMovie}>
                        </input>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>
            <div className="container" >
                {
                    (movieData.length===0)?<p className="notfound">Not Found</p>: movieData.map((res,pos)=>{
                        return(
                            //<div onClick={() => setModalShow(true)}>
                            <Card info={res} key={pos} />
                            //</div>
                        )
                    })
                }
                <MovieModal show={modalShow} onHide={() => setModalShow(false)} />
            </div>
        </>
    )
}
export default Main;