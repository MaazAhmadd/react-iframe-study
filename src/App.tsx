import React, { useState, useRef, useEffect } from "react";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
import Duration from "./Duration";
// import './App.css';
const ytids = [
	"7kTdV2NSIkI",
	"d93FPnEpkvI",
	"LcJKxPXYudE",
	"_s1YQCgm4Vo",
	"HXD15c6TpAs",
	"O7leJvhJqG8",
	"hMOLBQKmPoM",
	"kq39g2vSsKo",
	"3N5MlZg_Cdg",
	"0DL_DAdm108",
	"IykCKsdhbkM",
	"lUoplPi6ffo",
	"breg0bQS83U",
	"g7hgl5Pu0Pw",
	"J6xwyx4Tbog",
	"a_aSCZwbtsU",
	"YtrZeWRgohY",
	"pFtxR-O78sY",
	"STpFf-cdCSM",
	"9_I0bySQoCs",
];
const App: React.FC = () => {
	const [url, setUrl] = useState<string | undefined>(undefined);
	const [pip, setPip] = useState(false);
	const [playing, setPlaying] = useState(true);
	const [controls, setControls] = useState(false);
	const [light, setLight] = useState(false);
	const [volume, setVolume] = useState(0.8);
	const [muted, setMuted] = useState(false);
	const [played, setPlayed] = useState(0);
	const [loaded, setLoaded] = useState(0);
	const [duration, setDuration] = useState(0);
	const [playbackRate, setPlaybackRate] = useState(1.0);
	const [loop, setLoop] = useState(false);
	const [seeking, setSeeking] = useState(false);
	const playerRef = useRef<ReactPlayer | null>(null);
	const urlInputRef = useRef<HTMLInputElement | null>(null);
	const [count, setCount] = useState(0);

	useEffect(() => {
		return;
		const intervalId = setInterval(() => {
			setCount((prevCount) => {
				const nextCount = (prevCount + 1) % ytids.length;
				load(`https://youtube.com/watch?v=${ytids[nextCount]}`);
				setPlaying(true);
				return nextCount;
			});
		}, 5000);

		return () => clearInterval(intervalId);
	}, []);
	useEffect(() => {
		setTimeout(() => {
			playerRef.current?.seekTo(0.25, "fraction");
		}, 1000);
		setTimeout(() => {
			playerRef.current?.seekTo(0.5, "fraction");
		}, 2000);
		setTimeout(() => {
			playerRef.current?.seekTo(0.75, "fraction");
		}, 3000);
		setTimeout(() => {
			playerRef.current?.seekTo(0.95, "fraction");
		}, 4000);
	}, [count]);

	const load = (url: string) => {
		setUrl(url);
		setPlayed(0);
		setLoaded(0);
		setPip(false);
	};

	const handlePlayPause = () => setPlaying((prev) => !prev);

	const handleStop = () => {
		setUrl(undefined);
		setPlaying(false);
	};

	const handleToggleControls = () => {
		setControls((prev) => !prev);
		const tempUrl = url;
		setUrl(undefined);
		load(tempUrl!);
	};

	const handleToggleLight = () => setLight((prev) => !prev);

	const handleToggleLoop = () => setLoop((prev) => !prev);

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVolume(parseFloat(e.target.value));
	};

	const handleToggleMuted = () => setMuted((prev) => !prev);

	const handleSetPlaybackRate = (e: React.MouseEvent<HTMLButtonElement>) => {
		setPlaybackRate(parseFloat(e.currentTarget.value));
	};

	const handleTogglePIP = () => setPip((prev) => !prev);

	const handlePlay = () => setPlaying(true);

	const handleEnablePIP = () => setPip(true);

	const handleDisablePIP = () => setPip(false);

	const handlePause = () => setPlaying(false);

	const handleSeekMouseDown = () => setSeeking(true);

	const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPlayed(parseFloat(e.target.value));
	};

	const handleSeekMouseUp = (
		e: React.MouseEvent<HTMLInputElement, MouseEvent>,
	) => {
		setSeeking(false);
		playerRef.current?.seekTo(parseFloat(e.currentTarget.value));
	};

	const handleProgress = (state: { played: number; loaded: number }) => {
		if (!seeking) {
			setPlayed(state.played);
			setLoaded(state.loaded);
		}
	};

	const handleEnded = () => setPlaying(loop);

	const handleDuration = (duration: number) => setDuration(duration);

	const handleClickFullscreen = () => {
		if (screenfull.isEnabled) {
			screenfull.request(
				document.querySelector(".react-player") as Element | undefined,
			);
		}
	};

	const renderLoadButton = (url: string, label: string) => (
		<button onClick={() => load(url)}>{label}</button>
	);

	const handleUrlInput = () => {
		if (urlInputRef.current) {
			load(urlInputRef.current.value);
		}
	};

	return (
		<div className="app">
			<section className="section">
				<h1>ReactPlayer Demo</h1>
				<div className="relative pt-[56.25%]">
					<ReactPlayer
						ref={playerRef}
						className="absolute top-0 left-0"
						width="100%"
						height="100%"
						url={url}
						pip={pip}
						playing={playing}
						controls={controls}
						light={light}
						loop={loop}
						playbackRate={playbackRate}
						volume={volume}
						muted={muted}
						onReady={() => {
							setPlaying(true);
							console.log("onReady");
						}}
						onStart={() => console.log("onStart")}
						onPlay={handlePlay}
						onEnablePIP={handleEnablePIP}
						onDisablePIP={handleDisablePIP}
						onPause={handlePause}
						onBuffer={() => console.log("onBuffer")}
						onPlaybackRateChange={(speed: string) =>
							setPlaybackRate(parseFloat(speed))
						}
						onSeek={(e) => console.log("onSeek", e)}
						onEnded={handleEnded}
						onError={(e) => console.log("onError", e)}
						onProgress={handleProgress}
						onDuration={handleDuration}
						config={{ youtube: { playerVars: { controls: 1 } } }}
					/>
				</div>

				<table>
					<tbody>
						<tr>
							<th>Controls</th>
							<td>
								<button onClick={handleStop}>Stop</button>
								<button onClick={handlePlayPause}>
									{playing ? "Pause" : "Play"}
								</button>
								<button onClick={handleClickFullscreen}>Fullscreen</button>
								{light && (
									<button onClick={() => playerRef.current?.showPreview()}>
										Show preview
									</button>
								)}
								{url && ReactPlayer.canEnablePIP(url) && (
									<button onClick={handleTogglePIP}>
										{pip ? "Disable PiP" : "Enable PiP"}
									</button>
								)}
							</td>
						</tr>
						<tr>
							<th>Speed</th>
							<td>
								<button onClick={handleSetPlaybackRate} value={1}>
									1x
								</button>
								<button onClick={handleSetPlaybackRate} value={1.5}>
									1.5x
								</button>
								<button onClick={handleSetPlaybackRate} value={2}>
									2x
								</button>
							</td>
						</tr>
						<tr>
							<th>Seek</th>
							<td>
								<input
									type="range"
									min={0}
									max={0.999999}
									step="any"
									value={played}
									onMouseDown={handleSeekMouseDown}
									onChange={handleSeekChange}
									onMouseUp={handleSeekMouseUp}
								/>
							</td>
						</tr>
						<tr>
							<th>Volume</th>
							<td>
								<input
									type="range"
									min={0}
									max={1}
									step="any"
									value={volume}
									onChange={handleVolumeChange}
								/>
							</td>
						</tr>
						<tr>
							<th>
								<label htmlFor="controls">Controls</label>
							</th>
							<td>
								<input
									id="controls"
									type="checkbox"
									checked={controls}
									onChange={handleToggleControls}
								/>
								<em>&nbsp; Requires player reload</em>
							</td>
						</tr>
						<tr>
							<th>
								<label htmlFor="muted">Muted</label>
							</th>
							<td>
								<input
									id="muted"
									type="checkbox"
									checked={muted}
									onChange={handleToggleMuted}
								/>
							</td>
						</tr>
						<tr>
							<th>
								<label htmlFor="loop">Loop</label>
							</th>
							<td>
								<input
									id="loop"
									type="checkbox"
									checked={loop}
									onChange={handleToggleLoop}
								/>
							</td>
						</tr>
						<tr>
							<th>
								<label htmlFor="light">Light mode</label>
							</th>
							<td>
								<input
									id="light"
									type="checkbox"
									checked={light}
									onChange={handleToggleLight}
								/>
							</td>
						</tr>
						<tr>
							<th>Played</th>
							<td>
								<progress max={1} value={played} />
							</td>
						</tr>
						<tr>
							<th>Loaded</th>
							<td>
								<progress max={1} value={loaded} />
							</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section className="section">
				<table>
					<tbody>
						<tr>
							<th>YouTube</th>
							<td>
								{renderLoadButton(
									"https://www.youtube.com/watch?v=oUFJJNQGwhk",
									"Test A",
								)}
								{renderLoadButton(
									"https://www.youtube.com/watch?v=jNgP6d9HraI",
									"Test B",
								)}
								{renderLoadButton(
									"https://www.youtube.com/playlist?list=PLogRWNZ498ETeQNYrOlqikEML3bKJcdcx",
									"Playlist",
								)}
							</td>
						</tr>
					</tbody>
				</table>

				<div>
					<input type="text" ref={urlInputRef} placeholder="Enter video URL" />
					<button onClick={handleUrlInput}>Load Video</button>
				</div>
			</section>

			<section className="section">
				<h2>State</h2>
				<table>
					<tbody>
						<tr>
							<th>URL</th>
							<td className={!url ? "faded" : ""}>{url || "null"}</td>
						</tr>
						<tr>
							<th>Playing</th>
							<td>{playing ? "true" : "false"}</td>
						</tr>
						<tr>
							<th>Volume</th>
							<td>{volume.toFixed(3)}</td>
						</tr>
						<tr>
							<th>Speed</th>
							<td>{playbackRate}</td>
						</tr>
						<tr>
							<th>Elapsed</th>
							<td>
								<Duration seconds={duration * played} />
							</td>
						</tr>
						<tr>
							<th>Duration</th>
							<td>
								<Duration seconds={duration} />
							</td>
						</tr>
						<tr>
							<th>Remaining</th>
							<td>
								<Duration seconds={duration * (1 - played)} />
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</div>
	);
};

export default App;
