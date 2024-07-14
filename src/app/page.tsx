'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import TorusExplosion from '@/components/TorusModel';
import axios from 'axios';
import YoutubeVideo from '@/components/YoutubeVideo';
import SummaryScrollArea from '@/components/SummaryScrollArea';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function Home() {
	const [url, setUrl] = useState('');
	const [overlay, setOverlay] = useState(false);
	const [generate, setGenerating] = useState(false);
	const [summaries, setSummaries] = useState<
		{ timestamp: string; text: string }[]
	>([]);
	const [chunks, setChunks] = useState<number>(5);

	const fetchSummary = async (text: string) => {
		try {
			const tokens = text.split(" ");
			console.log(tokens.length);
			console.log(tokens.slice(0, 2000).length);
			const updatedText = tokens.slice(0, 2000).join(" ");
			const res = await axios.post('/api/summary/', { transcript: updatedText });
			if (!overlay) setOverlay(true);
			return res.data.summary;
		} catch (err) {
			toast('Something went wrong', {
				description: 'Oops! It seems like open ai API Key is expired now.',
				action: {
					label: 'refresh page',
					onClick: () => window.location.reload(),
				},
			});
			setTimeout(() => window.location.reload(), 5000);
			console.error(err);
			return ''; // Return empty string if there's an error
		}
	};

	const fetchTranscript = async () => {
		try {
			const response = await axios.get(`/api/transcript?url=${url}`);
			if (
				response.data.error &&
				response.data.error == 'Something went wrong'
			) {
				toast('Something went wrong', {
					description:
						"Oops! It seems like the transcript for this video doesn't exist.",
					action: {
						label: 'refresh page',
						onClick: () => window.location.reload(),
					},
				});
				setTimeout(() => window.location.reload(), 5000);
				return;
			}
			let startTime = 0;
			let endTime = 0;
			let transcript = '';

			let i = 0;
			console.log(response.data);
			for (const data of response.data) {
				transcript += data.text + ' ';
				endTime = data.offset + data.duration;

				if (
					endTime - startTime >= chunks * 60 ||
					i === response.data.length - 1
				) {
					console.log(endTime - startTime);
					console.log(i, "yooooooo");
					// If duration exceeds 15 minutes or it's the last segment
					const timestamp =
						formatTimestamp(startTime) + ' - ' + formatTimestamp(endTime);
					const summary = await fetchSummary(transcript.trim());
					setSummaries((prevSummaries) => [
						...prevSummaries,
						{ timestamp, text: summary },
					]); // Update state correctly
					transcript = '';
					startTime = endTime; // Update startTime for next group;
				}
				i++;
			}
		} catch (error) {
			toast('Something went wrong', {
				description:
					"Oops! It seems like the transcript for this video doesn't exist.",
				action: {
					label: 'refresh page',
					onClick: () => window.location.reload(),
				},
			});
			setTimeout(() => window.location.reload(), 5000);
			console.error(error);
		}
	};

	// Helper function to format milliseconds to timestamp (hh:mm:ss)
	const formatTimestamp = (totalSeconds: number): string => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = Math.trunc(totalSeconds % 60);
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

	function getVideoId(url: string) {
		if (url.includes('youtu.be')) {
		  return url.split('youtu.be/')[1].split('?')[0];
		} else if (url.includes('watch?v=')) {
		  return url.split('watch?v=')[1].split('&')[0];
		}
		return null;
	  }

	return (
		<div className="min-h-screen flex flex-col items-center justify-between bg-black relative">
			<header className="flex w-full justify-between p-4 cursor-pointer">
				<div className="flex flex-row h-fit">
					<h1
						className="text-4xl font-bold mt-4 ml-4 text-white"
						onClick={() => window.location.reload()}
					>
						Tubeify
					</h1>
					<p className="text-white">beta</p>
				</div>
				<img src="study.gif" alt="" className="w-16 h-16" />
			</header>
			<div>
				<div className={` ${overlay ? "hidden lg:block" : ""}`}>
					<TorusExplosion rotation={generate} />
				</div>
				<motion.div
					className={' flex flex-col items-center justify-between w-full '}
					variants={container}
					initial="hidden"
					animate="show"
				>
					{/* Input and Landing Page */}
					{!overlay && (
						<motion.div className="px-4 text-center absolute top-40" variants={item}>
							<h2 className="sm:text-5xl text-4xl font-bold mb-4 bg-opacity-40 text-white">
								Summarize your YouTube videos
							</h2>
							<p className="text-xl font-semibold mb-4 bg-opacity-40 text-white">
								Break long videos into summarized chunks to accelerate your
								study.
							</p>
							<div className="sm:flex sm:justify-center sm:items-center sm:space-x-4 sm:space-y-0 space-y-4 flex-col-1">
								<Input
									type="text"
									className="border border-gray-300 p-2 rounded-lg w-full sm:w-64 text-white opacity-85 bg-black "
									placeholder="Paste YouTube video URL"
									onChange={(e) => setUrl(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											setGenerating(true);
											fetchTranscript();
										}
									}}
								/>
								<div className="opacity-85 bg-black">
									<Select
										onValueChange={(e) => {
											var min: number = +e;
											setChunks(min);
										}}
									>
										<SelectTrigger className="sm:w-28 text-white w-full">
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
								<button
									className="bg-blue-500 text-white p-2 rounded-lg"
									onClick={() => {
										setGenerating(true);
										fetchTranscript();
									}}
								>
									{!generate ? 'Generate' : 'Generating...'}
								</button>
							</div>
						</motion.div>
					)}
					{/* Overlay Elements */}
					{/* {overlay && <YoutubeVideo urlId={url.split("=")[1]}/>} */}
					{overlay && (
						<div className="w-full px-4 bg-opacity-10 rounded-lg flex lg:flex-row flex-col md:justify-around items-center gap-y-7 md:absolute md:top-40  ">
							{/* youtube video */}
							<div className="text-white ">
								<YoutubeVideo urlId={getVideoId(url)!} />
							</div>
							{/* summaries */}
							<div className="bg-gradient-to-r from-red-700 via-purple-500 to-blue-700 p-1 rounded-lg w-fit ">
								<SummaryScrollArea summaries={summaries} />
							</div>
						</div>
					)}
				</motion.div>
			</div>
			{/* Footer */}
			<footer className="flex items-center max-h-28 w-full justify-between flex-wrap p-4">
				<p className="sm:w-fit w-full text-sm text-white">
					&copy; 2024 Tubeify
				</p>
				<p className="sm:w-fit w-full text-white">
					Made with ❤️ by Tushar Puri
				</p>
				<p className="sm:w-fit w-full text-sm text-white">
					<a
						href="https://github.com/TusharPuri10/Tubeify"
						target="_blank"
						rel="noopener noreferrer"
						className="mr-12"
					>
						GitHub
					</a>
				</p>
			</footer>
		</div>
	);
}
