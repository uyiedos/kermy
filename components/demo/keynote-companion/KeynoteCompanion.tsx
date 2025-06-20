

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useRef, useState } from 'react';
import { Modality, Part } from '@google/genai';

import KermitFace from '../kermit-face/KermitFace';
import ChatInterface, { ChatMessage } from '../chat-interface/ChatInterface';
import LaunchTimer from '../launch-timer/LaunchTimer';
import AboutKermy from '../about-kermy/AboutKermy';
import Tokenomics from '../tokenomics/Tokenomics';
import ImageGallery from '../image-gallery/ImageGallery';
import Disclaimer from '../disclaimer/Disclaimer';

import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';
import { createSystemInstructions } from '@/lib/prompts';
import { useAgent, useUser } from '@/lib/state';

export default function KeynoteCompanion() {
  const { client, connected, setConfig } = useLiveAPIContext();
  const user = useUser();
  const { current: kermyAgent } = useAgent();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Set the configuration for the Live API
  useEffect(() => {
    setConfig({
      responseModalities: [Modality.AUDIO],
      // speechConfig has been removed as it might be incompatible with the native-audio-dialog model
      systemInstruction: {
        parts: [
          {
            text: createSystemInstructions(kermyAgent, user),
          },
        ],
      },
    });
  }, [setConfig, user, kermyAgent]); // kermyAgent.voice removed from dependencies as speechConfig is gone

  // Handle incoming content (text and audio)
  useEffect(() => {
    const handleContent = (content: { modelTurn?: { parts?: Part[] } }) => {
      if (content.modelTurn?.parts) {
        const textPart = content.modelTurn.parts.find(part => part.text);
        if (textPart && textPart.text) {
          setChatMessages(prevMessages => [
            ...prevMessages,
            {
              id: Date.now().toString() + '-kermy',
              sender: 'kermy',
              text: textPart.text!,
              timestamp: new Date(),
            },
          ]);
        }
      }
    };

    client.on('content', handleContent);
    return () => {
      client.off('content', handleContent);
    };
  }, [client]);

  // Initiate the session when the Live API connection is established
  useEffect(() => {
    const beginSession = async () => {
      if (!connected) return;
      // Clear previous messages only if the first message isn't the initial greeting
      // or if there are user messages already.
      if (chatMessages.length > 0 && (chatMessages[0].sender !== 'kermy' || chatMessages.some(m => m.sender === 'user'))) {
        setChatMessages([]);
      }
      client.send(
        {
          text: 'Greet the user and introduce yourself and your role, both in text and audio.',
        },
        true
      );
    };
    beginSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, connected]);

  const handleSendMessage = (messageText: string) => {
    if (!connected || !messageText.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    };
    setChatMessages(prevMessages => [...prevMessages, newUserMessage]);

    client.send({ text: messageText }, true);
  };

  const launchDate = new Date();
  launchDate.setHours(18, 0, 0, 0); // Today at 6 PM

  return (
    <div className="keynote-companion-page">
      <section id="launch-timer" className="page-section">
        <LaunchTimer targetDate={launchDate} />
      </section>

      <section id="kermy-chat" className="page-section kermy-chat-section">
        <KermitFace />
        <ChatInterface
          messages={chatMessages}
          onSendMessage={handleSendMessage}
          isConnected={connected}
        />
      </section>

      <div className="chat-instruction">
        <p>Press the Play button below to interact with me, ribbit!</p>
      </div>

      <section id="about-kermy" className="page-section card-section">
        <AboutKermy />
      </section>

      <section id="tokenomics" className="page-section card-section">
        <Tokenomics />
      </section>

      <section id="gallery" className="page-section">
        <ImageGallery />
      </section>

      <section id="disclaimer" className="page-section">
        <Disclaimer />
      </section>
    </div>
  );
}