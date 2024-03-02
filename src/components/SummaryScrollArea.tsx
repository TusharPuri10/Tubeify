import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Typewriter from 'react-ts-typewriter';
import { useState, useEffect } from "react";

interface Summary {
    timestamp: string;
    text: string;
}

interface Props {
    summaries: Summary[];
}

const SummaryScrollArea = ({ summaries }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Update key to force re-render
    }, [currentIndex]);

    return (
        <div>
            <ScrollArea className="h-72 rounded-lg p-4 bg-black text-sm">
                {summaries.map((summary, index) => (
                    (index === currentIndex ?
                        <Card className="w-[400px] my-6" key={index}>
                            <CardTitle className="mt-4 ml-4">Summary: {summary.timestamp}</CardTitle>
                            <CardContent className="p-6">
                                <Typewriter key={key} text={summary.text} speed={2} onFinished={() =>{
                                    console.log(currentIndex)
                                    setCurrentIndex(currentIndex + 1)
                                }} />
                            </CardContent>
                        </Card>
                        : (index < currentIndex &&
                            <Card className="w-[400px] my-6" key={index}>
                                <CardTitle className="mt-4 ml-4">Summary: {summary.timestamp}</CardTitle>
                                <CardContent className="p-6">
                                    {summary.text}
                                </CardContent>
                            </Card>))
                ))}
            </ScrollArea>
        </div>
    );
};

export default SummaryScrollArea;
