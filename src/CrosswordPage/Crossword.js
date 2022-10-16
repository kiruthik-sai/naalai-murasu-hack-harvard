import React from 'react'
import Crossword from "@jaredreisinger/react-crossword"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Crosswordfunc = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() =>{
    axios.get('https://domusbackend.herokuapp.com/get/crossword')
      .then(res=>{
        console.log(res.data)
        setPosts(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {posts && <Crossword data = {posts}/>}
    </>
  );
}

export default Crosswordfunc;
