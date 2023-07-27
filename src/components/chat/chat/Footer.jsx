
import { useEffect,useState } from 'react';

import { AttachFile, Mic,Send } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { uploadFile } from '../../../service/api';

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }

`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: 'rotate(40deg)'
`;

const PickerBox = styled(Picker)`
    marginBottom:10px;
`;


const Footer = ({ sendText,sendText2, value, setValue, setFile, file, setImage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
  
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await uploadFile(data);
                console.log("setImage",response.data)
                setImage(response.data);
            }
        }
        getImage();
    }, [file])

    const onFileChange = (e) => {
        setValue(e.target.files[0].name);
        setFile(e.target.files[0]);
    }

const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = ( emojiObject) => {
    // console.log("EmojiObject",emojiObject);
    // const emoji = emojiObject.srcElement.__reactProps$7cdsaexui5q.src;
    // console.log(`${emoji}asdsad`);
    setValue(prevValue => prevValue + emojiObject.emoji);
 };

 const handleInputChange = (e) => {
    const inputText = e.target.value;
    setValue(inputText);

    // If there is any text, show the send button; otherwise, show the mic button
    setIsTyping(!!inputText.trim());
  };

  const handleSendText2 = (e) =>{
    sendText2(e);
    setIsTyping(false);

  }

  const handleSendText = (e) =>{
    sendText(e);
    setIsTyping(false);
    
  }


    return (
        <Container>
            <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <PickerBox onEmojiClick={handleEmojiClick} />}
        </div>
             <label htmlFor="fileInput">
                 <ClipIcon />
            </label>
            <input
                type='file'
                id="fileInput"
                style={{ display: 'none' }}
                 onChange={(e) => onFileChange(e)}
             />

             <Search>
                 <InputField
                    placeholder="Type a message"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleInputChange} 
                    // onFocus={() => setShowEmojiPicker(true)}
                    // onBlur={() => setShowEmojiPicker(false)}
                    onKeyPress={(e) => handleSendText(e)}
                    value={value}

                />
            </Search>
            {isTyping ? (
        <Send onClick={(e) => handleSendText2(e)}/>
      ) : (
        <Mic />
      )}
        </Container>
    )
}

export default Footer;