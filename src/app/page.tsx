import ProblemOfTheDay from "../components/ProblemOfTheDay";

export default function Home() {
  return (
    <main className="w-11/12 md:w-9/12 lg:w-6/12 2xl:w-5/12 h-full flex flex-col items-center gap-16 py-16 lg:py-24">
      <h1 className="w-full text-3xl lg:text-4xl xl:text-5xl font-bold">
        Have you solved a problem today?
      </h1>
      <div className="w-full flex flex-col">
        <h2 className="text-default-700 text-lg lg:text-xl ml-2 mb-2">Problem of the day</h2>
        <ProblemOfTheDay className="w-full" />
      </div>
    </main>
  );
}
