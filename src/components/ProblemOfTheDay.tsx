import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,

  Chip,
  Divider,
  Link,
} from "@nextui-org/react";
import { notMyRandom } from "@/lib/notMyRandom";
import Image from "next/image";
import { Noto_Sans_Thai } from "next/font/google";

const noto_sans = Noto_Sans_Thai({ subsets: ["latin"] });

export default async function ProblemOfTheDay({
  className,
}: Readonly<{ className: string }>) {

  const seed = new Date().toDateString();
  const myRand = notMyRandom(seed);

  const judgeList = ["otog.in.th"];
  const judgeTaskList = ["https://otog.in.th/problem"];
  const judgeApiList = ["https://api.otog.in.th/problem"];
  const judgeStatementApiList = ["https://otog.in.th/problem"];

  const judgeIdx = Math.floor(myRand() * (judgeList.length - 1));
  const judge = judgeList[judgeIdx];
  const judgeApi = judgeApiList[judgeIdx];
  const judgeTask = judgeTaskList[judgeIdx];
  const judgeStatementApi = judgeStatementApiList[judgeIdx];

  let taskID = Math.floor(myRand() * 1021) + 1;
  let taskValid = false;
  let taskData = {
    id: null,
    name: "Loading...",
    sname: "Loading...",
    timeLimit: 0,
    memoryLimit: 0,
  };
  while (!taskValid) {
    try {
      const request = await fetch(`${judgeApi}/${taskID}`);
      const response = request.status;
      if (response === 200) {
        taskValid = true;
        taskData = await request.json();
      } else {
        taskID = Math.floor(myRand() * 1021) + 1;
      }
    } catch (e){
      console.error(e);
    }
  }

  return (
    
    <Card className={className}>
      <CardHeader className="flex gap-4">
        <Image src={`/judges_icon/${judge}.png`} alt={judge} width={50} height={50}/>
        <Link href={`${judgeTask}/${taskData.id}`}
              color="foreground" target="_blank" className="w-full text-left flex flex-col items-start">
          <h3 className={`text-3xl font-bold ${noto_sans.className}`}>
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
            <p className="text-default-700">Time limit: <Chip className="font-bold">{taskData.timeLimit} milliseconds</Chip></p>
          ) : (<> </>)
        }
        {
          taskData.memoryLimit ? (
            <p className="text-default-700">Memory limit: <Chip className="font-bold">{taskData.memoryLimit} megabytes</Chip></p>
          ) : (<> </>)
        }
      </CardBody>
      <Divider/>
      <CardFooter>
        <p className="text-default-700">
          <Link href={`${judgeStatementApi}/${taskData.id}`} size="lg" isExternal showAnchorIcon color="primary" target="_blank">
            Problem statement
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
