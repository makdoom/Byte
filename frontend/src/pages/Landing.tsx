import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const Landing = () => {
  const navigate = useNavigate();

  const handleNavigateToFeeds = () => {
    navigate("/feeds");
  };

  return (
    <div className="flex-1 mx-3 text-center">
      <div className="w-full md:max-w-screen-xl m-auto h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl sm:text-7xl font-bold text-center">
          Human Stories & Ideas
        </h1>
        <p className="mt-4 text-md sm:text-xl text-muted-foreground">
          A place to read, write, and deepen your understanding
        </p>
        <Button
          className="mt-14 py-7 px-10 text-md"
          size="lg"
          onClick={handleNavigateToFeeds}
        >
          Start Reading
        </Button>
      </div>
    </div>
  );
};
