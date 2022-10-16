import React, { useEffect, useState } from 'react'
import '../FirstPage/index.css'

function News(props) {
    const msg = new SpeechSynthesisUtterance()
    const [isAudiPlaying, setIsAudioPlaying] = useState(false)
    const [news1, setNews1] = useState({
		"title":"",
		"summary":"",
		"img":""
	})
	const [news2, setNews2] = useState({
		"title":"",
		"summary":"",
		"img":""
	})
    const [news3, setNews3] = useState({
		"title":"",
		"summary":"",
		"img":""
	})
    useEffect(()=>{
        let generalNewsUrl = "https://domusbackend.herokuapp.com/get/news"
        let index = props.index+1
        fetch(generalNewsUrl)
        .then(res=>res.json())
        .then(data=>{
            console.log("data", data.articles)
            setNews1(data.articles[index])
			setNews2(data.articles[index+1])
			setNews3(data.articles[index+2])
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return ( 
        <body>
            <button onClick={()=>{
				if(!isAudiPlaying){
					let text =  news1.title+" "+news1.summary+" "+news2.title+" "+news2.summary+" "+news3.title+" "+news3.summary
					console.log(text)
					msg.text = text
					window.speechSynthesis.speak(msg)
					setIsAudioPlaying(true)
				}
				else{
					window.speechSynthesis.cancel()
					setIsAudioPlaying(false)
				}
                
			}}             
            style={{marginLeft:"10px"}}
            >speech </button><br/>

            <div id="newsContainer">
                <a class="main-text item-with-image multi-column with-border">
                    <h4>{news1.title}</h4>
                    <p>{news1.summary}</p>
                    <figure>
                        <img src={news1.img}/>
                    </figure>
                </a>
                <a class="main-text item-with-image multi-column with-border">
                    <h4>{news2.title}</h4>
                    <p>{news2.summary}</p>
                    <figure>
                        <img src={news1.img}/>
                    </figure>
                </a>
                <a class="main-text item-with-image multi-column with-border">
                    <h4>{news3.title}</h4>
                    <p>{news3.summary}</p>
                    <figure>
                        <img src={news3.img}/>
                    </figure>
                </a>
            </div>
        </body>
     );
}

export default News;