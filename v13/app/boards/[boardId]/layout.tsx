import { prisma } from "~/src/db/prisma";
import React, { Children, PropsWithChildren } from "react";
import { notFound } from "next/navigation";

export default async function LayoutBoard({
  params,
  children,
}: PropsWithChildren<{
  params: { boardId: string };
}>) {
  const boardId = Number(params.boardId);

  if (isNaN(boardId)) {
    // throw new Error("Id invalid");
    return notFound();
  }

  const board = await prisma.board.findUniqueOrThrow({
    where: {
      id: boardId,
    },
  });
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-4xl font-bold">{board.title}</h2>
      {children}
    </div>
  );
}
