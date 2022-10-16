import React, { useEffect, useState } from 'react'
import './index.css'
import ReactToPrint from 'react-to-print'

const CLIENT_ID = "9023fbf889d146479133ba41d2f323e3"
const REDIRECT_URI = "http://localhost:3000/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"
const SCOPE = 'user-top-read'

export const FirstPage = (props) => {
    const date = new Date()
    const msg = new SpeechSynthesisUtterance()
    const [newsHeadline, setNewsHeadline] = useState({
        "title": "",
        "summary": "",
        "img": ""
    })
    const [news1, setNews1] = useState({
        "title": "",
        "summary": "",
        "img": ""
    })
    const [news2, setNews2] = useState({
        "title": "",
        "summary": "",
        "img": ""
    })
    const [token, setToken] = useState("")
    const [topTracks, setTopTracks] = useState("")
    const [topBillboard, setTopBillboard] = useState([])
    const redirectURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        fetch("https://api.spotify.com/v1/me/top/tracks", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                let topTracksTemp = []
                for (let i = 0; i < Math.min(10, data.items.length); i++) {
                    let trackJSON = {}
                    trackJSON["name"] = data.items[i].name
                    let artists = []
                    for (let j = 0; j < data.items[i].artists.length; j++) {
                        artists.push(data.items[i].artists[j].name)
                    }
                    trackJSON["artists"] = artists
                    topTracksTemp.push(trackJSON)
                }
                console.log(topTracksTemp)
                setTopTracks(topTracksTemp)

            })
            .catch(err => {
                console.log("error", err)
                localStorage.removeItem('token')
                setToken('')
            })

        console.log("token", token)
        setToken(token)

        fetch(" https://domusbackend.herokuapp.com/get/top100")
            .then(res => res.json())
            .then(data => {
                console.log("data", data)
                let temp = data.slice(0, 10)
                setTopBillboard(temp)
            })

            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        let generalNewsUrl = " https://domusbackend.herokuapp.com/get/news"
        fetch(generalNewsUrl)
            .then(res => res.json())
            .then(data => {
                console.log("data", data.articles)
                setNewsHeadline(data.articles[0])
                setNews1(data.articles[1])
                setNews2(data.articles[2])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    // const onClick = ()=>{

    // }
    return (
        <body>

            <button onClick={() => {
                let text = newsHeadline.title + " " + newsHeadline.summary + " " + news1.title + " " + news1.summary + " " + news2.title + " " + news2.summary
                console.log(text)
                msg.text = text
                window.speechSynthesis.speak(msg)
            }}>Convert to Speech</button><br />
            <div  class="main__wrapper"  >
                <main>
                    <h1 id="TitleName">Naalai Murasu</h1>

                    <aside>
                        <div>
                            <div class="issue">Issue #1 </div>
                            <div class="date">October 16, 2022 </div>
                            <div class="edition">Timeless Edition</div>
                        </div>
                    </aside>

                    <h2 class="title--large main-title newsTitle">{newsHeadline.title}</h2>

                    <div class="main-text multi-column ">
                        <p class="news">{newsHeadline.summary}</p>
                        {/* <p>Livestreaming revenue as a whole still only contributes 15% of TikToks total turnover, but the rate at which it has grown year on year is almost double that of the companys online ads business.In the last two years, TikToks online ads revenue has grown by 500%, while its livestreaming revenue has increased by 900%.Live revenue is likely to increase dramatically in coming years, says Gahan, claiming it could become a pillar of TikToks revenue in the near future.TikToks turn to livestreaming is different, not least because the precedent that livestreamed video can work has already been established in China.AdvertisementKey to that could be TikToks continued deployment and promotion of livestreaming within its app  creating a virtuous circle of revenue for the company.</p> */}
                    </div>

                    <a class="terrarium">
                        <figure>
                            <img src={newsHeadline.img} />
                            {/* <img src="https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/70d3c96e0014b5a1b7f12180da24d033.jpg" /> */}
                        </figure>
                    </a>

                    <a class="main-text item-with-image multi-column with-border">

                        {/* <h4>Meta warns 1 million Facebook users who installed password-stealing apps</h4> */}
                        {/* <p>Meta is warning 1 million Facebook users that their account information may have been compromised by third-party apps from Apple or Googles stores.According to the company, the apps are disguised as fun or useful services, like photo editors, camera apps, VPN services, horoscope apps, and fitness tracking tools.But these login features are merely a means of stealing Facebook users account info.And Metas Director of Threat Disruption, David Agranovich, noted that many of the apps Meta identified were barely functional.Interestingly, while the malicious Android apps were mostly consumer apps, like photo filters, the 47 iOS apps were almost exclusively what Meta calls business utility apps</p> */}
                        <h4 class="newsTitle">{news1.title}</h4>
                        <p class="news">{news1.summary}</p>
                        <figure>
                            <img src={news1.img} />
                        </figure>
                    </a>

                    <a class="main-text item-with-image style with-border  multi-column" >
                        <h4 class="newsTitle">{news2.title}</h4>
                        <figure>
                            <img src={news2.img} />
                        </figure>
                        <p class="news">{news2.summary}</p>
                    </a>


                    <div class="sidebar">
                        <h3 id="entertainment">Entertainment</h3>

                        <a class="sidebar-item with-border">
                            <h5 id="topTenBill">Billboard Top 10 tracks</h5>
                            {topBillboard && topBillboard.map((item, index) => {
                                return (
                                    <div class="songs">
                                        {index + 1}. {item.name} by {item.artist}
                                    </div>
                                )
                            })}
                            <h5 id="topTenPerson">User's top Spotify tracks</h5>
                            {/*spotify here */}
                            {!token && <a href={redirectURL}>Login to Spotify</a>}
                            {topTracks && topTracks.map((item, index) => {
                                return (
                                    <div class="songs">
                                        {index + 1}. {item.name} by {item.artists.join(", ")}
                                    </div>
                                )
                            })}
                        </a>
                    </div>
                </main>
            </div>
        </body>
    )
}