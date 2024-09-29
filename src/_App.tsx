import { useEffect, useRef, useState } from "react";
import "./App.css";
import YouTube from "react-youtube";

type EmbedSize = [number, number];
function App() {
  const [_id, setId] = useState("7kTdV2NSIkI");
  const [size, setSize] = useState<EmbedSize>([600, 400]);
  const sizes: EmbedSize[] = [
    [750, 500],
    [600, 400],
    [450, 300],
    [375, 250],
    [225, 150],
    [150, 100],
  ];

  const ids = [
    "7kTdV2NSIkI",
    // "d93FPnEpkvI",
    // "LcJKxPXYudE",
    // "_s1YQCgm4Vo",
    // "HXD15c6TpAs",
    // "O7leJvhJqG8",
    // "hMOLBQKmPoM",
    // "kq39g2vSsKo",
    // "3N5MlZg_Cdg",
    // "0DL_DAdm108",
    // 'IykCKsdhbkM',
    // 'lUoplPi6ffo',
    // 'breg0bQS83U',
    // 'g7hgl5Pu0Pw',
    // 'J6xwyx4Tbog',
    // 'a_aSCZwbtsU',
    // 'YtrZeWRgohY',
    // 'pFtxR-O78sY',
    // 'STpFf-cdCSM',
    // '9_I0bySQoCs',
  ];

  return (
    <div className="w-[800px] flex flex-wrap gap-2">
      {/* <div className="flex flex-wrap mx-5 my-7 gap-4 w-[600px]">
        {ids.map((id) => (
          <button
            className="p-2 bg-red-700 text-white border border-red-500"
            onClick={() => setId(id)}
            key={id}
          >
            {id}
          </button>
        ))}
      </div> */}
      <div className="flex flex-wrap mx-5 my-7 gap-4 w-[600px]">
        {sizes.map((s, i) => (
          <button
            className="p-2 bg-red-700 text-white border border-red-500"
            onClick={() => setSize(s)}
            key={i}
          >
            {s[0]}, {s[1]}
          </button>
        ))}
      </div>
      {ids.map((id) => (
        <CustomEmbed _id={id} key={id} size={size} />
      ))}
    </div>
  );
}
const CustomEmbed = ({ _id, size }: { _id: string; size: EmbedSize }) => {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  console.log("loaded: ", loaded);

  useEffect(() => {
    // if (iframeRef.current) {
    //   if (loaded) {
    //     const logo = iframeRef.current.getElementsByClassName(
    //       "ytp-large-play-button ytp-button ytp-large-play-button-red-bg",
    //     )[0]
    //     if (logo) {
    //       console.log('logo element: ', logo);
    //       logo.setAttribute('style', 'display: none')
    //     }
    //   }
    // }
    const intervalId = setInterval(() => {
      if (iframeRef.current) {
        console.log("iframe: ", iframeRef.current);

        const logo = iframeRef.current.querySelector(`button.ytp-large-play-button-red-bg`)
        console.log("logo: ", logo);
        if (logo) {
          (logo as HTMLElement).style.display = "none"
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [loaded]);
  return (
    <div className="relative m-5 flex">
      {/* <div className="absolute select-none" style={{
        width: size[0] + "px",
        height: size[1] + "px",
      }}></div> */}
      <iframe
        onLoad={() => setLoaded(true)}
        // onCanPlay={() => setLoaded(true)}
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${_id}?modestbranding=0&controls=0&disablekb=1&origin=${window.location.origin}`}
        width={size[0]}
        height={size[1]}
      ></iframe>
      {/* <YouTube
        // videoId={_id}                  // defaults -> ''
        // onReady={() => setLoaded(true)}                    // defaults -> noop
        // opts={{
        //   width: size[0],
        //   height: size[1],
        // }}
      // id={string}                       // defaults -> ''
      // className={string}                // defaults -> ''
      // iframeClassName={string}          // defaults -> ''
      // style={object}                    // defaults -> {}
      // title={string}                    // defaults -> ''
      // loading={string}                  // defaults -> undefined
      // opts={obj}                        // defaults -> {}
      // onPlay={func}                     // defaults -> noop
      // onPause={func}                    // defaults -> noop
      // onEnd={func}                      // defaults -> noop
      // onError={func}                    // defaults -> noop
      // onStateChange={func}              // defaults -> noop
      // onPlaybackRateChange={func}       // defaults -> noop
      // onPlaybackQualityChange={func}    // defaults -> noop
      /> */}
    </div>
  );
};

export default App;
