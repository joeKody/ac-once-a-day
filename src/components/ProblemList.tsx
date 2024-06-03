"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "./ui/carousel";
import { useMediaQuery } from "react-responsive";
import Problem from "@/components/ProblemCard";
import { useEffect, useState } from "react";

export default function ProblemList({
    className,
}: Readonly<{
    className: string;
}>) {
  
  const isLaptop = useMediaQuery({ query: "(max-width: 1024px)" });
  const [ api, setApi ] = useState<CarouselApi>();
  const [ currentTask, setCurrentTask ] = useState(0);
  const [ tasksAmount, setTasksAmount ] = useState(10);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      if (api.scrollProgress() >= 0.5) {
        setTasksAmount(tasksAmount * 2);
      }
    })
  }, [api, currentTask, tasksAmount]);

  return (
      <Carousel className={`${className}`} orientation={isLaptop ? "horizontal" : "horizontal"} setApi={setApi}>
          <CarouselContent>
              {Array.from({ length: tasksAmount }).map((_, index) => (
                  <CarouselItem key={index}>
                      <Problem className="w-full" taskIdx={index + 1} />
                  </CarouselItem>
              ))}
          </CarouselContent>
          {!isLaptop && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
      </Carousel>
  );
}