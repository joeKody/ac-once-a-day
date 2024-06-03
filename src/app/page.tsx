import ProblemOfTheDay from "@/components/ProblemOfTheDay";
import ProblemList from "@/components/ProblemList";

export default function Home() {
  return (
    <main className="w-11/12 md:w-9/12 h-full flex flex-col items-center gap-8 lg:gap-16 py-16 lg:py-24">
      <h1 className="w-full text-center text-3xl lg:text-4xl xl:text-5xl font-bold">
        Have you <span className="text-green-500">solved</span> a problem today?
      </h1>
      <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col">
        <h2 className="text-default-600 text-md lg:text-lg ml-1 mb-2">Problem of the day</h2>
        <ProblemOfTheDay className="w-full" />
      </div>
      <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col">
        <h2 className="text-default-600 text-md lg:text-lg ml-1 mb-2">More problems!</h2>
        <ProblemList className="w-full"/>
      </div>
    </main>
  );
}
