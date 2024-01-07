import React from "react";
import AWS from "aws-sdk";
import { personalAssistant } from "./gptAssistant.js";

const Caption = ({
  caption,
  advice,
  updateCaption,
  age,
  gender,
  address,
  situation,
}) => {
  const [adviceGiven, setAdviceGiven] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const polly = new AWS.Polly({});

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_API_KEY,
    region: "us-east-1", // Change to your region
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!adviceGiven) {
      setAdviceGiven(true);
      updateCaption(advice);
      setAdviceGiven(true);
    } else {
      if (!initialized) {
        setInitialized(true);
        let firstMessage = `The patient's gender is ${gender}, and the age is ${age}. ${situation}. You need to be the emergency assistant as the patient will have conversations with you.`;
        let conversationHistory = [];
        conversationHistory.push({ role: "user", content: firstMessage });
        let response1 = await personalAssistant(conversationHistory);
      }
    }

    const params = {
      Text: `<speak>
        <prosody rate="fast">${advice}</prosody>
        </speak>`,
      OutputFormat: "mp3",
      VoiceId: "Danielle",
      Engine: "long-form",
      TextType: "ssml",
    };

    polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        // play audio returned in data.AudioStream
        const uInt8Array = new Uint8Array(data.AudioStream);
        const arrayBuffer = uInt8Array.buffer;
        const blob = new Blob([arrayBuffer]);
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
      }
    });
  };

  return (
    <div class="card-caption" onClick={handleSubmit}>
      <div class="card-image-caption">
        <p>Click to listen to the advice</p>
      </div>
      <div class="card-description-caption">
        <p class="text-title-caption"> Caption</p>
        <p class="text-body-caption">{caption}</p>
      </div>
    </div>
  );
};

export default Caption;
