import React, { useEffect, useState } from "react";
import introVoice from "../sounds/Intro.mp3";

const VoiceAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audio = new Audio(introVoice);

  useEffect(() => {
    audio.play();

    // Event listener for when the audio ends
    const handleAudioEnd = () => setIsPlaying(false);
    audio.addEventListener("ended", handleAudioEnd);

    // Cleanup function to remove the event listener
    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  return (
    <div className={`voice`}>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
      <div className={isPlaying ? "voice-bar" : "stop-animation"}></div>
    </div>
  );
};

export default VoiceAnimation;
