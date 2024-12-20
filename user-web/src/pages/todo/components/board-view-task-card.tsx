import React from "react";
import { Ellipsis } from "lucide-react";

// Import components
import { TaskSizeBadge, TaskPriorityBadge } from "./task-attribute-badges";
import { DialogTrigger } from "src/components/ui/dialog";

// Import hooks
import { useTaskState } from "src/states/task";

// Import types
import type { TaskType } from "src/objects/task/types";
import { TaskUtils } from "src/objects/task/utils";

type TaskCardProps = {
  data: TaskType;
};

function addOutlineClassName(element: any) {
  if (element) {
    element.classList.add("outline", "outline-2", "outline-primary");
  }
}

function removeOutlineClassName(element: any) {
  if (element) {
    element.classList.remove("outline", "outline-2", "outline-primary");
  }
}

export default function BoardViewTaskCard(props: TaskCardProps) {
  const { setCurrentTask } = useTaskState();
  const draggableCardRef = React.useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.DragEvent) => {
    if (draggableCardRef.current) {
      e.dataTransfer.setData("taskId", props.data._id);
    }
  };

  return (
    <div
      ref={draggableCardRef}
      draggable
      onDragStart={handleDragStart}
      onMouseUp={() => {
        removeOutlineClassName(draggableCardRef.current);
      }}
      onMouseDown={() => {
        addOutlineClassName(draggableCardRef.current);
      }}
      onDragEnd={() => {
        removeOutlineClassName(draggableCardRef.current);
      }}
      className="flex cursor-grab max-w-[375px] bg-white shadow w-full justify-between px-3 py-2 rounded-lg border mb-3"
    >
      <section className="w-4/5">
        <DialogTrigger onClick={() => setCurrentTask(props.data)}>
          <header className="cursor-pointer text-left hover:underline">
            <h3 className="font-bold">{props.data.name}</h3>
            <p className="text-ellipsis overflow-hidden">
              {props.data.description}
            </p>
          </header>
        </DialogTrigger>
        <div>
          <p className="text-xs">{TaskUtils.getStartEndDateStr(props.data)}</p>
        </div>
        <div className="mt-2">
          {props.data.priority && (
            <TaskPriorityBadge className="me-2" data={props.data.priority} />
          )}
          {props.data.size && <TaskSizeBadge data={props.data.size} />}
        </div>
      </section>
      <div className="flex">
        <Ellipsis className="cursor-pointer" />
      </div>
    </div>
  );
}
