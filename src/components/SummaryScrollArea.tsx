import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import Typewriter from 'react-ts-typewriter';
import { useState } from "react";
interface Props {
    summaries: string[];
}

const SummaryScrollArea = ({ summaries }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <div>
            <ScrollArea className="h-72 rounded-lg p-4 bg-black">
                {summaries.map((x: string, index: number) => (
                    (index === currentIndex ?
                        <Card className="w-[400px] my-6" key={index}>
                            <CardTitle className="mt-4 ml-4">Summary</CardTitle>
                            <CardContent className="p-6">
                                <Typewriter text={summaries[currentIndex]} speed={10} onFinished={() => (setCurrentIndex(currentIndex + 1))} />
                            </CardContent>
                        </Card>
                        : (index < currentIndex &&
                            <Card className="w-[400px] my-6" key={index}>
                                <CardTitle className="mt-4 ml-4">Summary</CardTitle>
                                <CardContent className="p-6">
                                    {x}
                                </CardContent>
                            </Card>))
                ))}
            </ScrollArea>
        </div>
    )
}

export default SummaryScrollArea;