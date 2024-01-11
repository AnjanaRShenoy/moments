import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import MyChats from '../../components/userComponents/MyChats'

const ChatPage = () => {
    const {user}=ChatState()
  return (
    <div style={{width:"100%"}}>
       <Box>
        {user&& <MyChats/>}
        {/* {user&& <ChatBox/>} */}
       </Box>
      
    </div>
  )
}

export default ChatPage
