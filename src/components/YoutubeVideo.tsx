interface Props {
    urlId: string
}

const YoutubeVideo = ({urlId}: Props) => {
    return (
        <div>
           <iframe width="420" height="280" src={`https://www.youtube.com/embed/` + urlId + `?&autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
    )
}

export default YoutubeVideo

// https://www.youtube.com/watch?v=TbbCJQ4Vbko&list=LL&index=1

// https://www.youtube.com/watch?v=TbbCJQ4Vbko