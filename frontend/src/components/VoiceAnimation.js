import React, { useState, useEffect, useRef } from "react";
import introVoice from "../sounds/Intro.mp3";
import completeVoice from "../sounds/Complete.mp3";
import situationVoice from "../sounds/Situation.mp3";
import PermissionVoice from "../sounds/Permission.mp3";
import GenderAgeVoice from "../sounds/GenderAge.mp3";

const voices = [introVoice, GenderAgeVoice, situationVoice, completeVoice];

const VoiceAnimation = ({ showForm }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const audioRef = React.useRef(null); // Reference to the audio object

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio(voices[voiceIndex]);

    // Event listener for when the audio ends
    const handleAudioEnd = () => setIsPlaying(false);
    audioRef.current.addEventListener("ended", handleAudioEnd);

    // Start playing the audio
    setIsPlaying(true);
    audioRef.current.play();

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

    if (voiceIndex === 3) {
      audioRef.current.pause();
      showForm();
    }
    // Move to the next voice
    setVoiceIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className={`voice`}>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      <button onClick={handleClick}>Next</button>
    </div>
  );
};

export default VoiceAnimation;
