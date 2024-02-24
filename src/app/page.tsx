'use client';
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import TorusExplosion from "@/components/TorusModel";
import { YoutubeTranscript } from 'youtube-transcript';
import axios from "axios";

async function query(data: { inputs: string; }) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/tusharpuri10/Flan_t5_podcast_summary_assessment",
		{
			headers: { Authorization: "Bearer " + process.env.model_inference_api_key },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "The answer to the universe is"}).then((response) => {
	console.log(JSON.stringify(response));
});


export default function Home() {

  const [url, setUrl] = useState("");

  const fetchTranscript = () => {
    axios.get(`/api/transcript?url=${url}`).then((response) => {
      console.log(response.data);
    }); 
  };


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <header className="flex w-full justify-between p-4">
        <h1 className="text-4xl font-bold mt-4 ml-4">Tubeify</h1>
        <img src="study.gif" alt="" className="w-16 h-16"/>
      </header>
      <TorusExplosion />
      <motion.div
        className="flex flex-col items-center justify-between w-full p-4 z-100 absolute top-48"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="text-center" variants={item}>
          <h2 className="text-5xl font-bold mb-4 bg-opacity-40 bg-black">
            Summarize your YouTube videos
          </h2>
          <div className="flex justify-center">
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-lg w-full md:w-64 text-black"
              placeholder="Paste YouTube video URL"
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  YoutubeTranscript.fetchTranscript(url).then(console.log);
                }
              }}
            />
            <button className="bg-blue-500 text-white p-2 rounded-lg ml-4"
            onClick={fetchTranscript}>
              Generate
            </button>
          </div>
        </motion.div>
      </motion.div>
      <footer className="flex w-full justify-between p-4">
        <p className="text-sm">&copy; 2022 Tubeify. All rights reserved.</p>
        <p className="text-sm">
          <a href="https://github.com/tubeify/tubeify" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
