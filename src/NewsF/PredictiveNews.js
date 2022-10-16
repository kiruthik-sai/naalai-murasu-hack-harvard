import React, { useEffect, useState } from 'react'
import '../FirstPage/index.css'
import yay from '../images/yay.gif'
import think from '../images/think.gif'
import smile from '../images/smile.gif'
function PredictiveNews() {
    const [shortStory, setShortStory] = useState(null)
    const [predNews, setPredNews] = useState([])
    let imgs=[yay,think,smile]
    useEffect(()=>{
        let predUrl = "https://domusbackend.herokuapp.com/get/pred"
        let storyUrl = "https://domusbackend.herokuapp.com/get/shortstories"
        fetch(predUrl)
        .then(res=>res.json())
        .then(data=>{
            setPredNews(data.pred)
        })
        .catch(err=>console.log(err))

        fetch(storyUrl)
        .then(res=>res.json())
        .then(data=>{
            setShortStory(data.stories[0])
        })
        .catch(err=>console.log(err))
    },[])
    // {predNews && predNews.map((item, index)=>{
    //     return (<div>
    //         <p>{index+1}. {item}</p>
    //         {/* <img class="gifs" src={imgs[index]} /> */}
    //         </div>
    //     )
    // })}
    return ( 
        <body id="predictive">



                <h5 class = "FutureHeader" >A bright future to look forward to!</h5>
                 <h2 class="title--large main-title newsTitle">As AI Accelerates, Affordable</h2>

                <div class="main-text multi-column ">
                    <p class="news">{predNews[0]}</p>
                </div>


                <a class="main-text item-with-image multi-column with-border">
                        <h4 class="newsTitle">Something here</h4>
                        <p class="news">{predNews[1]}</p>
                </a>

                <a class="main-text item-with-image multi-column with-border">
                        <h4 class="newsTitle">Something here</h4>
                        <p class="news">{predNews[2]}</p>
                </a>


            







            <div>
                <h5>Short Story:</h5>
                {shortStory && (
                    <div class="gridStory">
                        <figure>
                            <img id="shortStoryImg" src={shortStory.img}/>
                        </figure>
                        <p id="shortStory">{shortStory.story}</p>
                    </div>
                )}
            </div>
        </body> 
    );
}

export default PredictiveNews;

