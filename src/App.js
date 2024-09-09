/** @format */

import React, { useRef, useState } from "react";
import {
  Heading,
  Text,
  Box,
  Flex,
  Button,
  Center,
  Container,
  Avatar,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  FormControl,
} from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import "@fontsource/raleway";
import { FcGoogle } from "react-icons/fc";
import { BsFillSendFill } from "react-icons/bs";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyB40Vabn0CfwTtCbEF0YTMmaq5WnM4SHgI",
  authDomain: "superchat-4372c.firebaseapp.com",
  projectId: "superchat-4372c",
  storageBucket: "superchat-4372c.appspot.com",
  messagingSenderId: "437234388587",
  appId: "1:437234388587:web:02d5cc04a046cdf0a86b2e",
  measurementId: "G-12V24TQE6M",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <ChatRoom />
      ) : (
        <Flex
          width={"100vw"}
          height={"100vh"}
          alignContent={"center"}
          justifyContent={"center"}>
          <Box maxW='2xl' m='0 auto'>
            <Heading as='h1' textAlign='center' fontSize='5xl' mt='100px'>
              Welcome to ChitChatChu!
            </Heading>
            <Text fontSize='xl' textAlign='center' mt='30px'>
              This is your happy place. At BuzzTalk, we believe in the power of
              positive conversations. Let’s keep the energy high and the vibes
              even higher. Start a chat, share a smile, and spread the
              good vibes today!
            </Text>
            <SignIn />
          </Box>
        </Flex>
      )}
    </>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <Center>
        <Button
          colorScheme='blue'
          leftIcon={<FcGoogle />}
          variant={"outline"}
          mt={"30px"}
          w={"300px"}
          fontWeight={"700"}
          onClick={signInWithGoogle}>
          Sign In with Google
        </Button>
      </Center>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className='sign-out' onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

// function ChatRoom() {
//   const dummy = useRef();
//   const messagesRef = firestore.collection("messages");
//   const query = messagesRef.orderBy("createdAt").limit(25);

//   const [messages] = useCollectionData(query, { idField: "id" });

//   const [formValue, setFormValue] = useState("");

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     const { uid, photoURL } = auth.currentUser;

//     await messagesRef.add({
//       text: formValue,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       uid,
//       photoURL,
//     });

//     setFormValue("");
//     dummy.current.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <>
//       <SignOut />
//       <main>
//         {messages &&
//           messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

//         <span ref={dummy}></span>
//       </main>

//       <form onSubmit={sendMessage}>
//         <input
//           value={formValue}
//           onChange={(e) => setFormValue(e.target.value)}
//           placeholder='say something nice'
//         />

//         <button type='submit' disabled={!formValue}>
//           🕊️
//         </button>
//       </form>
//     </>
//   );
// }

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Container
        maxW='100vw'
        height='100vh'
        bg='gray.100'
        py='36px'
        centerContent>
        <Flex w={"100%"} maxW={"lg"} justify={"start"} mb={"12px"}>
          <Button colorScheme='red' onClick={() => auth.signOut()}>
            Sign Out
          </Button>
        </Flex>

        <Box
          height='15%'
          padding='4'
          bg='purple.500'
          color='white'
          maxW='lg'
          width='lg'
          fontWeight={"700"}
          fontSize={"xl"}
          textAlign={"center"}
          alignContent={"center"}
          boxShadow={"lg"}
          borderTopRadius={"12px"}>
          ChitChatChu
        </Box>
        <Box
          height='70%'
          padding='4'
          bg='white'
          color='black'
          w='lg'
          overflowY={"scroll"}>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          <span ref={dummy}></span>
        </Box>
        <Box
          height='15%'
          padding='4'
          bg='white'
          color='white'
          maxW='lg'
          width='lg'
          fontWeight={"700"}
          fontSize={"xl"}
          textAlign={"center"}
          alignContent={"center"}
          borderBottomRadius={"12px"}
          boxShadow={"xl"}>
          <form onSubmit={sendMessage}>
            <InputGroup size='lg'>
              <Input
                value={formValue}
                onChange={(e) => {
                  setFormValue(e.target.value);
                  console.log("Form value:", e.target.value);
                }}
                pr='4.5rem'
                type='text'
                borderRadius={"24px"}
                placeholder='Type Here ...'
                color={"black"}
              />
              <InputRightElement>
                <IconButton
                  type='submit'
                  size={"md"}
                  isRound={true}
                  variant='solid'
                  colorScheme='blue'
                  aria-label='Done'
                  fontSize='20px'
                  isDisabled={!formValue}
                  icon={<BsFillSendFill />}
                />
              </InputRightElement>
            </InputGroup>
          </form>
        </Box>
      </Container>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      {messageClass === "sent" ? (
        <Flex justify={"end"} mb={"36px"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            borderRadius={"12px"}
            bg={"gray.200"}
            minW={"fit-content"}
            textAlign={"center"}
            mx='12px'
            px='12px'>
            {text}
          </Box>
          <Avatar src={photoURL} />
        </Flex>
      ) : (
        <Flex justify={"start"} mb={"36px"}>
          <Avatar src={photoURL} />
          <Box
            display={"flex"}
            alignItems={"center"}
            borderRadius={"12px"}
            bg={"gray.200"}
            minW={"fit-content"}
            textAlign={"center"}
            mx='12px'
            px='12px'>
            {text}
          </Box>
        </Flex>
      )}
    </>
  );
}

export default App;
