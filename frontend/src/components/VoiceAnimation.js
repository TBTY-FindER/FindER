import React, { useState, useEffect, useRef } from "react";
import introVoice from "../sounds/Intro.mp3";
import situationVoice from "../sounds/Situation.mp3";
import GenderAgeVoice from "../sounds/GenderAge.mp3";

const voices = [introVoice, GenderAgeVoice, situationVoice];

const VoiceAnimation = ({ showForm }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [speechInput, setSpeechInput] = useState([]); // user's voice input
  const [buttonAppear, setButtonAppear] = useState(false);
  const audioRef = React.useRef(null); // Reference to the audio object

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio(voices[voiceIndex]);
    audioRef.current.play();

    // Event listener for when the audio ends
    const handleAudioEnd = () => {
      setIsPlaying(false);
      setButtonAppear(true);
    };
    audioRef.current.addEventListener("ended", handleAudioEnd);

    // Cleanup function to remove the event listener
    return () => {
      audioRef.current.removeEventListener("ended", handleAudioEnd);
      audioRef.current.pause(); // Pause the audio when component unmounts or voice changes
    };
  }, [voiceIndex]); // Dependency on voiceIndex

  const handleClick = () => {
    // Stop the current audio immediately
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset the audio playback to the start

    // take user's voice input
    if (voiceIndex !== 0) {
      handleVoiceInput();
    }

    if (voiceIndex === 2) {
      audioRef.current.pause();
      showForm();
    }
  };

  // function that take user's voice input and stop when user stop talking
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.start();

    // check if user stops talking for 3 seconds stop the recognition
    recognition.onspeechend = () => {
      recognition.stop();
      setVoiceIndex((prevIndex) => prevIndex + 1);
      console.log("end");
    };

    //  store the user's voice input
    recognition.onresult = (e) => {
      const current = e.resultIndex;
      const transcript = e.results[current][0].transcript;
      console.log(transcript);
    };
  };

  return (
    <div className={`voice`}>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      {buttonAppear ? <button onClick={handleClick}>Next</button> : <></>}
    </div>
  );
};

export default VoiceAnimation;
