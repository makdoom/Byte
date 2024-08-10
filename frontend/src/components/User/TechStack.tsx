const techStack: { id: number; name: string }[] = [
  {
    id: 1,
    name: "Javascript",
  },
  {
    id: 2,
    name: "React",
  },
  {
    id: 3,
    name: "Typescript",
  },
  {
    id: 4,
    name: "MongoDB",
  },
];

export const TechStack = () => {
  return (
    <div className="flex gap-2">
      {techStack.map((tech) => (
        <p key={tech.id} className="p-2 bg-card text-sm rounded-md px-3">
          {tech.name}
        </p>
      ))}
    </div>
  );
};
