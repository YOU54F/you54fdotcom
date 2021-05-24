export default async function exec(
  commands: [string],
  text: string,
  errorMessage: any,
  question: any
) {
  const finalText: string =
    question && !question.isAnswered ? resolveText(question, text) : text;

  const [command, ...rest] = finalText.trim().split(" ");
  const commandArguments = rest.join(" ");
  //@ts-ignore
  if (command && commands[command])
    return await execNamedCommand(commands, command, commandArguments);
  //@ts-ignore
  else if (commands["__eval"])
    return await execEvalCommand(commands, finalText);
  else if (typeof errorMessage === "function")
    return await errorMessage(commandArguments);

  return errorMessage;
}

async function execNamedCommand(
  commands: [string],
  command: string,
  commandArguments: string
) {
  //@ts-ignore

  const executor = commands[command];
  if (typeof executor === "function") return await executor(commandArguments);
  else return executor;
}

async function execEvalCommand(commands: [string], text: string) {
  //@ts-ignore

  const executor = commands["__eval"];
  if (typeof executor === "function") return await executor(text);
  else return executor;
}

function resolveText(question: any, text: string): string {
  const answer = question.answers.find(
    (a: any) => a.text.toLowerCase() === text.toLowerCase()
  );

  if (answer) question.isAnswered = true;

  if (answer) console.log("Question has been answered!");

  return answer ? answer.instruction : text;
}
