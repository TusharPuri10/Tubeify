'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import TorusExplosion from "@/components/TorusModel";
import axios from "axios";
import YoutubeVideo from "@/components/YoutubeVideo";
import SummaryScrollArea from "@/components/SummaryScrollArea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export default function Home() {

  const [url, setUrl] = useState("");
  const [overlay, setOverlay] = useState(false);
  const [generate, setGenerating] = useState(false);
  const [summaries, setSummaries] = useState<{ timestamp: string, text: string }[]>([]);
  const [chunks, setChunks] = useState<number>(5);

  const fetchTranscript = () => {
    axios.get(`/api/transcript?url=${url}`).then((response) => {
      console.log(response.data);
      let startTime = 0;
      let endTime = 0;
      let transcript = "";
      const summaries = [];

      for (let i = 0; i < response.data.length; i++) {
        transcript += response.data[i].text + " ";
        endTime = response.data[i].offset + response.data[i].duration;

        if (endTime - startTime >= chunks * 60 * 1000 || i === response.data.length - 1) {
          // If duration exceeds 15 minutes or it's the last segment
          const timestamp = formatTimestamp(startTime) + " - " + formatTimestamp(endTime);
          summaries.push({ timestamp, text: transcript.trim() });
          transcript = "";
          startTime = endTime; // Update startTime for next group
        }
      }

      setSummaries(summaries);
      setOverlay(true);
    });
  };


  // Helper function to format milliseconds to timestamp (hh:mm:ss)
  const formatTimestamp = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes}:${seconds}`;
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
    <div className="min-h-screen flex flex-col items-center justify-between bg-black">
      <header className="flex w-full justify-between p-4 cursor-pointer">
        <h1 className="text-4xl font-bold mt-4 ml-4 text-white" onClick={()=>(window.location.reload())}>Tubeify</h1>
        <img src="study.gif" alt="" className="w-16 h-16" />
      </header>
      <TorusExplosion rotation={generate} />
      <motion.div
        className="flex flex-col items-center justify-between w-full p-4 z-100 absolute top-40"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Input and Landing Page */}
        {!overlay && <motion.div className="text-center" variants={item}>
          <h2 className="text-5xl font-bold mb-4 bg-opacity-40 text-white">
            Summarize your YouTube videos
          </h2>
          <p className="text-xl font-semibold mb-4 bg-opacity-40 text-white">
            Break long videos into summarized chunks to accelerate your study.
          </p>
          <div className="flex justify-center space-x-4">
            <Input
              type="text"
              className="border border-gray-300 p-2 rounded-lg w-full md:w-64 text-white opacity-85 bg-black"
              placeholder="Paste YouTube video URL"
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setGenerating(true);
                  fetchTranscript();
                }
              }}
            />
            <div className="opacity-85 bg-black">
              <Select onValueChange={(e)=>{
                var min: number = +e;
                setChunks(min);
              }}>
                <SelectTrigger className="w-28 text-white">
                  <SelectValue placeholder="Chunk" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white opacity-85">
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button className="bg-blue-500 text-white p-2 rounded-lg"
              onClick={() => {
                setGenerating(true);
                fetchTranscript();
              }}>
              {!generate ? "Generate" : "Generating..."}
            </button>
          </div>
        </motion.div>}
        {/* Overlay Elements */}
        {/* {overlay && <YoutubeVideo urlId={url.split("=")[1]}/>} */}
        {overlay && <div className="h-fit w-full bg-opacity-10 rounded-lg flex md:flex-row flex-col justify-around">
          {/* youtube video */}
          <div className="text-white">
            <YoutubeVideo urlId={url.split("=")[1].split("&")[0]} />
          </div>
          {/* summaries */}
          <div className="bg-gradient-to-r from-red-700 via-purple-500 to-blue-700 p-1 rounded-lg w-fit">
            <SummaryScrollArea summaries={summaries} />
          </div>
        </div>}
      </motion.div>
      {/* Footer */}
      <footer className="flex w-full justify-between p-4 bg-black">
        <p className="text-sm text-white">&copy; 2024 Tubeify</p>
        <p className="text-white">Made with ❤️ by Tushar Puri</p>
        <p className="text-sm text-white">
          <a href="https://github.com/TusharPuri10/Tubeify" target="_blank" rel="noopener noreferrer" className="mr-12">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
