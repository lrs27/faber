"use client";

import { Dispatch } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableSection from "./SortableSection";
import type { EditorState, EditorAction } from "@/types/editor";

interface Props {
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
}

export default function EditorCanvas({ state, dispatch }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const visibleSections = state.sections.filter((s) => s.visible);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const allSections = state.sections;
      const fromIndex = allSections.findIndex((s) => s.id === active.id);
      const toIndex = allSections.findIndex((s) => s.id === over.id);
      dispatch({ type: "REORDER_SECTIONS", fromIndex, toIndex });
    }
  }

  return (
    <div className={`min-h-full ${state.templateStyle === "minimal" ? "bg-cream" : "bg-cream"}`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={visibleSections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {visibleSections.map((section) => (
            <SortableSection
              key={section.id}
              section={section}
              templateStyle={state.templateStyle}
              dispatch={dispatch}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
