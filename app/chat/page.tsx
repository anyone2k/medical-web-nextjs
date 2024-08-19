"use client";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat",
    onError: ({ e }: { e: Error }) => {
      console.log(e);
    },
  });
  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  return (
    <main className="flex flex-col w-full h-[90vh] max-h-dvh">
      <header className="p-4 border-b w-full max-w-3xl mx-auto">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Medical Chat
        </motion.h1>
      </header>
      <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
        <ul
          ref={chatParent}
          className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4"
        >
          {messages.map((m, index) => (
            <div key={index}>
              {m.role === "user" ? (
                <li key={m.id} className="flex flex-row">
                  <div className="rounded-xl p-4 bg-background shadow-md flex">
                    <p className="text-primary">{m.content}</p>
                  </div>
                </li>
              ) : (
                <li key={m.id} className="flex flex-row-reverse">
                  <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
                    <p className="text-primary">{m.content}</p>
                  </div>
                </li>
              )}
            </div>
          ))}
        </ul>
      </section>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4"
      >
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-3xl mx-auto items-center"
        >
          <Input
            className="flex-1 rounded-full min-h-[40px] mr-1"
            placeholder="Type your question here..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <Button className="bg-[#1E232F] rounded-full text-white">
            Submit
          </Button>
        </form>
      </motion.section>
    </main>
  );
}
