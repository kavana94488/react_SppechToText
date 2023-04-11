import React, { useState } from 'react';
import "./SpeechToTextConvertor.css";
import SpeechRecognition,{ useSpeechRecognition} from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import CopyToClipboard from 'react-copy-to-clipboard';
const SpeechToText = () => {
    
    const { transcript,browserSupportsSpeechRecognition} = useSpeechRecognition();
   
    const[isCopied,setIsCopied] = useClipboard(transcript,{successDuration:1000})
    const[listen,setListen] = useState(false)
    const[stopListen,setStopListen] = useState(false)
    const[copied,setCopied] = useState(false)

    if(!browserSupportsSpeechRecognition){
        return <span>Brower doesn't support speech recognition</span>
    }

    const strartListentingHandler = ()=>{
      setListen(true)
        const speech =  SpeechRecognition.startListening({continuous:true,successDuration:2000});
        console.log(speech)
        setStopListen(true)
        setCopied(false)
    }

    const stopListeningHandler = () =>{
      SpeechRecognition.stopListening();
      setStopListen(false)
      setListen(false)
      setCopied(false)
    }
   
  return (
    <div>
      <div className="speech">
        <p>Speech to Text Convertor</p>

        <h2>
          React hook that converts speech from the microphone to text and makes
          it available to your React components
        </h2>
      </div>
      <div className="text">
        <p>{transcript}</p>

        <div className="btn-style">
          <button onClick={strartListentingHandler}>
            {listen ? "Listening..." : "Start Listening"}
          </button>
          <CopyToClipboard text={transcript} onCopy={()=>setCopied(true)}>
            <button>{copied ? "Copied" : "Copy to Clipboard"}</button>
          </CopyToClipboard>

          <button onClick={stopListeningHandler}>
            {stopListen ? "Stopped to Listen" : "Stop Listen"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpeechToText


