import React, {useState, useEffect, useContext} from 'react'
import {
    Flex,
    Box,
    Button,
    IconButton,
  } from '@chakra-ui/react';
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/poppins"
import "@fontsource/fira-sans"
import "@fontsource/open-sans"
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import ChannelBtn from '../components/ChannelBtn'
import axios from "axios"
import PostBox from '../components/PostBox';
import PostModalPopup from '../components/PostModalPopup';

import { Link } from 'react-router-dom';

import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';


export default function Discussions(){
    const [posts, setPosts] = useState([])
    //const [postFormDisplay, setPostFormDisplay] = useState(false)
    const{value: user, setValue: setUser} = useContext(UserContext)

    const navigate = useNavigate()
    
    const getAllPosts = async () =>{
        const res = await axios.get("/posts/")
        console.log(res)
        res.data.sort(function(a,b){return -1 * a.createdAt.localeCompare(b.createdAt);});
        setPosts(res.data)
        //this.forceUpdate()   //had to use this since state hooks were kind of bugging out
    }

    useEffect(() =>{
        getAllPosts()
    },[])

    const[channel, setChannel] = useState(1)
    const [channelColors, setChannelColors] = useState(['purple.300', 'transparent','transparent', 'transparent', 'transparent'])
    
    const switchChannel = (event, channelNum) => {
        console.log(event.target.innerText)
        channelHighlight(channelNum)    
        setChannel(channelNum)
    }

    const createNewPost = () =>{
        if(!user){
            navigate('/login', { replace: true })
        }
        else {
            console.log('new post created')
            //setPostFormDisplay(true)
            navigate('/discussions/new-post', {replace:true})
        }
        
    }


    const channelHighlight = (channelNum) =>{
        if(channelNum === 1){
            setChannelColors(['#b794f4', 'transparent', 'transparent', 'transparent', 'transparent'])
        }
        if(channelNum === 2){
            setChannelColors(['transparent', '#b794f4', 'transparent', 'transparent', 'transparent'])
        }
        if(channelNum === 3){
            setChannelColors(['transparent', 'transparent', '#b794f4', 'transparent', 'transparent'])
        }
        if(channelNum === 4){
            setChannelColors(['transparent', 'transparent', 'transparent', '#b794f4', 'transparent' ])
        }
        if(channelNum === 5){
            setChannelColors(['transparent', 'transparent', 'transparent', 'transparent', '#b794f4'])
        }
    }



    return(
        <Box 
            overflow='auto' 
            bg = '#1b1c22' 
            width = '100%' 
            height = '100%'  
            backgroundImage=''  
            backgroundSize='100vh' 
            backgroundRepeat='no-repeat' 
            backgroundPosition='bottom right'
        >
            {/*<PostModalPopup isOpened = {postFormDisplay} setPostFormDisplay = {setPostFormDisplay} getAllPosts = {getAllPosts}/> */}

            <Navbar/>
            <Flex 
                flexDirection='column' 
                h = '100vh'
                paddingLeft = {[1,2,4,4]}
                paddingRight = {[1,2,4,4]}
                position = 'fixed'
                paddingTop = {24}
                left = '0'
                top = '0'
                bg = '#131417'
            >
                <ChannelBtn bg = {channelColors[0]} text = 'All Posts' handleClick={(e)=>switchChannel(e,1)}/>
                <ChannelBtn bg = {channelColors[1]} text = 'Announcements' handleClick={(e)=>switchChannel(e,2)}/>
                <ChannelBtn bg = {channelColors[2]} text = 'Discussion' handleClick={(e)=>switchChannel(e,3)}/>
                <ChannelBtn bg = {channelColors[3]} text = 'Feedback' handleClick={(e)=>switchChannel(e,4)}/>
                <ChannelBtn bg = {channelColors[4]} text = 'Off Topic' handleClick={(e)=>switchChannel(e,5)}/>
                <Button 
                    variant = 'solid' 
                    mt = {10} 
                    colorScheme = 'orange' 
                    size = {['md','md','lg','lg']}
                    alignSelf='center'
                    onClick = {createNewPost}
                
                >
                    +new post
                </Button>
            </Flex>
            
            <Flex flexDirection='column' ml = {['140px','150px','200px', '200px']} mt = {16} bg = '#131417' paddingTop={5} paddingLeft = {6}> 
                <PostBox createNewPost={createNewPost}/>
                
                {posts.map((p)=>( //mapping the data of each post into a Post component
                    <Post id = {p._id} getAllPosts = {getAllPosts} post = {p}/>
                ))} 
            </Flex>
        </Box>
    )
}