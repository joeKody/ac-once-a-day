"use client"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,

  Chip,
  Divider,
  Link,
} from "@nextui-org/react";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { Noto_Sans_Thai } from "next/font/google";

const noto_sans = Noto_Sans_Thai({ subsets: ["latin"] });

export default function ProblemOfTheDay({
  className,
}: Readonly<
  {
    className: string 
  }>
) {
  const [taskData, setTaskData] = useState({
      judge: "",
      judgeApi: "",
      judgeTask: "",
      judgeStatementApi: "",
      id: "",
      name: "Loading...",
      sname: "Loading...",
      timeLimit: 0,
      memoryLimit: 0,
  });
  useEffect(() => {
    fetch("/api/task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskIdx: 0 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTaskData(data);
        console.log(taskData);
      });
  }, []);

  return (
    
    <Card className={className}>
      <CardHeader className="flex gap-4">
        <Link href={`https://${taskData.judge}`} target="_black">
          <Image src={`/judges_icon/${taskData.judge}.png`} alt={taskData.judge} width={50} height={50}/>
        </Link>
        <Link href={`${taskData.judgeTask}/${taskData.id}`}
              color="foreground" target="_blank" className="w-full text-left flex flex-col items-start">
          <h3 className={`text-2xl lg:text-3xl font-bold ${noto_sans.className}`}>
            {taskData.name}
          </h3>
          {taskData.sname ?
            (
              <h3 className="text-xl text-default-500">{taskData.sname}</h3>
            ) : (<> </>)}
        </Link>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2">
        {
          taskData.timeLimit ? (
            <div className="text-default-700">Time limit: <Chip className="font-bold">{taskData.timeLimit} milliseconds</Chip></div>
          ) : (<> </>)
        }
        {
          taskData.memoryLimit ? (
            <div className="text-default-700">Memory limit: <Chip className="font-bold">{taskData.memoryLimit} megabytes</Chip></div>
          ) : (<> </>)
        }
      </CardBody>
      <Divider/>
      <CardFooter>
        <p className="text-default-700">
          <Link href={`${taskData.judgeStatementApi}/${taskData.id}`} size="lg" isExternal showAnchorIcon color="primary" target="_blank">
            Problem statement
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
