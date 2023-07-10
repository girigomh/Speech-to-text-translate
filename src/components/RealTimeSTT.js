import React, { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import translate from 'translate';
import '../styles/stt.css';
import '@fortawesome/fontawesome-free/css/all.css';

const RealTimeSTT = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [recordState, setRecordState] = useState(false);
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: 'zh-CN' });

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    const doTranslation = async () => {
      try {
        const translated = await translate(transcript, {
          from: 'zh',
          to: 'en',
        });
        setTranslatedText(translated);
      } catch (error) {
        console.log(error);
      }
    };
    doTranslation();
  }, [transcript]);

  const clickRecord = () => {
    if (recordState) {
      setRecordState(false);
      SpeechRecognition.stopListening();
    } else {
      setRecordState(true);
      startListening();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="container">
      <h2>Real Time Speech to Text Converter</h2>
      <br />
      <p>
        Translate voice from microphone to Mandarin text and translate Mandarin
        text to English text.
      </p>
      <div className="translate_container">
        <textarea
          className="script_area"
          value={transcript}
          readOnly
        ></textarea>
        <textarea className="script_area" value={translatedText}></textarea>
      </div>

      <div>
        <button className="RecordButton" onClick={clickRecord}>
          {recordState ? (
            <i className="fa-solid fa-pause"></i>
          ) : (
            <i className="fa-solid fa-play"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default RealTimeSTT;
