import { useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player';
import axios from "axios";

type NoembedRes = {
  thumbnail_url: string;
  title: string;
};

export type YoutubeInfo = {
  title: string;
  thumbnail: string;
  duration: number | null;
};

const useYoutubeInfo = (ytid: string) => {
  const [info, setInfo] = useState<YoutubeInfo>({
    title: '',
    thumbnail: '',
    duration: null,
  });

  const [isDurationFetched, setIsDurationFetched] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const yturl = `https://www.youtube.com/watch?v=${ytid}`;
  const noembedUrl = `https://noembed.com/embed?url=${yturl}`;

  useEffect(() => {
    console.log(`[useYoutubeInfo] getting title and thumbnail: ${noembedUrl}`);
    axios.get<NoembedRes>(noembedUrl).then((res) => {
      setInfo((prev) => ({
        ...prev,
        title: res.data.title,
        thumbnail: res.data.thumbnail_url,
      }));
    });
  }, [noembedUrl]);


  const player = !isDurationFetched ? (
    <ReactPlayer
      ref={playerRef}
      url={yturl}
      style={{ display: 'none' }}
      onDuration={(duration: number) => {
        console.log(`[useYoutubeInfo] duration: ${duration}`);
        setInfo((prev) => ({
          ...prev,
          duration,
        }));
        setIsDurationFetched(true);
        console.log(`[useYoutubeInfo] component unmounted`);
      }}
    />
  ) : null;

  return { info, player };
};

export default useYoutubeInfo;
