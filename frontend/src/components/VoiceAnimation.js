import React, { useState, useEffect, useRef } from "react";
import introVoice from "../sounds/Intro.mp3";
import situationVoice from "../sounds/Situation.mp3";
import genderVoice from "../sounds/Gender.mp3";
import ageVoice from "../sounds/Age.mp3";

const voices = [introVoice, ageVoice, genderVoice, situationVoice];

const VoiceAnimation = ({ showForm, updateSpeech }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [speechInput, setSpeechInput] = useState([]); // user's voice input
  const [buttonAppear, setButtonAppear] = useState(false);
  const audioRef = React.useRef(null); // Reference to the audio object

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio(voices[voiceIndex]);
    audioRef.current.play();
    setIsPlaying(true);

    // Event listener for when the audio ends
    const handleAudioEnd = async () => {
      setIsPlaying(false);
      // take user's voice input
      if (voiceIndex === 3) {
        handleVoiceInput();
      } else if (voiceIndex !== 0) {
        handleVoiceInput();
      } else {
        setButtonAppear(true);
      }
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
    setButtonAppear(false);

    // take user's voice input
    setVoiceIndex((prevIndex) => prevIndex + 1);
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
      if (voiceIndex === 3) {
        showForm();
      } else {
        setVoiceIndex((prevIndex) => prevIndex + 1);
      }
    };

    //  store the user's voice input
    recognition.onresult = (e) => {
      const current = e.resultIndex;
      const transcript = e.results[current][0].transcript;
      updateSpeech(transcript);
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
