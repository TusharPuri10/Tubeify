interface Props {
    urlId: string
}

const YoutubeVideo = ({urlId}: Props) => {
    return (
        <div className=" flex justify-center items-center w-full">
           <iframe className="w-[300px] md:w-[500px]"  height="295" src={`https://www.youtube.com/embed/` + urlId + `?&autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
    )
}

export default YoutubeVideo

// https://www.youtube.com/watch?v=TbbCJQ4Vbko&list=LL&index=1

// https://www.youtube.com/watch?v=TbbCJQ4Vbko