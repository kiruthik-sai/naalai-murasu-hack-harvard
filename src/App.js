import React, { useEffect } from 'react';
import './App.css';
import "turn.js";
import $ from "jquery";
import ReactDOM from "react-dom";
import logo from './images/Wow.gif'
import { FirstPage } from './FirstPage/FirstPage';



class Turn extends React.Component {


    static defaultProps = {
        style: {},
        className: "",
        options: {}
    };


    componentDidMount() {
        if (this.el) {
            $(this.el).turn(Object.assign({}, this.props.options));
        }
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    componentWillUnmount() {
        if (this.el) {
            $(this.el).turn("destroy").remove();
        }
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 37) {
            $(this.el).turn("previous");
        }
        if (event.keyCode === 39) {
            $(this.el).turn("next");
        }
    };

    render() {

        return (
            <div
                className={this.props.className}
                style={Object.assign({}, this.props.style)}
                ref={(el) => (this.el = el)}
            >
                {this.props.children}
            </div>
        );
    }
}





const pages = [
    "https://i.pinimg.com/564x/ff/96/e8/ff96e85036867f75eceae4c576c5f54b.jpg",
    logo,
    "https://olddesignshop.com/wp-content/uploads/2019/12/News-of-the-Week-Dec-13-05-Small-OldDesignShop.jpg",
    "https://i.pinimg.com/564x/ff/96/e8/ff96e85036867f75eceae4c576c5f54b.jpg",
    "https://i.pinimg.com/564x/ff/96/e8/ff96e85036867f75eceae4c576c5f54b.jpg",
    "https://i.pinimg.com/564x/ff/96/e8/ff96e85036867f75eceae4c576c5f54b.jpg"
];

const App = () => {


    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    const [generalNews, setGeneralNews] = React.useState([])
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
$(".magazine").turn("width", dimensions.width);
$(".magazine").turn("height", dimensions.height);
        }

        window.addEventListener('resize', handleResize)
    })

    useEffect(() => {
        let generalNewsUrl = " https://domusbackend.herokuapp.com/get/news"
        fetch(generalNewsUrl)
        .then(res=>res.json())
        .then(data=>{
            console.log("data", data.articles)
            setGeneralNews(data.articles)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])


    const options = {
        width: dimensions.width,
        height: dimensions.height,
        autoCenter: true,
        display: "single",
        acceleration: true,
        // elevation: 50,
        // gradients: !$.isTouch,
        when: {
            turned: function (e, page) {
                console.log("Current view: ", $(this).turn("view"));
            }
        }
    };
    return (
        <Turn options={options} className="magazine" >
            
                <div className="page">
                    {generalNews && <FirstPage generalNews={generalNews}/>}
                </div>
                <div className="page" id ="secondPage">
                    {/* <button onClick={()=>{alert("click working")}}>Click me</button> */}
                </div>
                <div className="page" id= "thirdPage">
                </div>
                    
        
        </Turn>
    );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;
