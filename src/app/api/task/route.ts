import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { notMyRandom } from "@/lib/notMyRandom";

// damn bro i forgot next js has built-in cache

type Task = {
    judge: string;
    judgeTask: string;
    judgeApi: string;
    judgeStatementApi: string;
    id: string;
    name: string;
    sname: string;
    timeLimit: number;
    memoryLimit: number;
};

const judgeList = ["otog.in.th"];
const judgeTaskList = ["https://otog.in.th/problem"];
const judgeApiList = ["https://api.otog.in.th/problem"];
const judgeStatementApiList = ["https://api.otog.in.th/problem/doc"];

const generatedTasks = new Map([]);

export async function PUT(req: NextRequest) {
    try {
        const request = await req.json();
        const taskIdx = request.taskIdx;

        const seed = new Date().toDateString();
        const myRand = notMyRandom(seed);

        const taskKey = seed.concat(taskIdx.toString());

        if (generatedTasks.has(taskKey)) {
            return NextResponse.json(generatedTasks.get(taskKey));
        }

        const judgeIdx = Math.floor(myRand() * (judgeList.length - 1));
        const judge = judgeList[judgeIdx];
        const judgeApi = judgeApiList[judgeIdx];
        const judgeTask = judgeTaskList[judgeIdx];
        const judgeStatementApi = judgeStatementApiList[judgeIdx];

        let taskID = Math.floor(myRand() * 1021) + 1;
        let taskValid = false;
        let taskData: Task = {
            judge: judge,
            judgeApi: judgeApi,
            judgeTask: judgeTask,
            judgeStatementApi: judgeStatementApi,
            id: "",
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
                    taskData.judge = judge;
                    taskData.judgeApi = judgeApi;
                    taskData.judgeTask = judgeTask;
                    taskData.judgeStatementApi = judgeStatementApi;
                } else {
                    taskID = Math.floor(myRand() * 1021) + 1;
                }
            } catch (e) {
                console.error(e);
                return NextResponse.error();
            }
        }

        generatedTasks.set(taskKey, taskData);
        return NextResponse.json(taskData);
    } catch (e) {
        console.error(e);
        return NextResponse.error();
    }
}
