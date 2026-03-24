"use client";

import { useReducer, useCallback, useMemo } from "react";

interface UndoState<S> {
  past: S[];
  present: S;
  future: S[];
}

const MAX_HISTORY = 50;

export function useUndoReducer<S, A extends { type: string }>(
  reducer: (state: S, action: A) => S,
  initialState: S
) {
  const undoReducer = useCallback(
    (
      undoState: UndoState<S>,
      action: A | { type: "UNDO" } | { type: "REDO" }
    ): UndoState<S> => {
      switch (action.type) {
        case "UNDO": {
          if (undoState.past.length === 0) return undoState;
          const previous = undoState.past[undoState.past.length - 1];
          return {
            past: undoState.past.slice(0, -1),
            present: previous,
            future: [undoState.present, ...undoState.future],
          };
        }
        case "REDO": {
          if (undoState.future.length === 0) return undoState;
          const next = undoState.future[0];
          return {
            past: [...undoState.past, undoState.present],
            present: next,
            future: undoState.future.slice(1),
          };
        }
        case "RESET": {
          const newPresent = reducer(undoState.present, action as A);
          return { past: [], present: newPresent, future: [] };
        }
        default: {
          const newPresent = reducer(undoState.present, action as A);
          if (newPresent === undoState.present) return undoState;
          const past = [...undoState.past, undoState.present].slice(
            -MAX_HISTORY
          );
          return { past, present: newPresent, future: [] };
        }
      }
    },
    [reducer]
  );

  const [undoState, rawDispatch] = useReducer(undoReducer, {
    past: [],
    present: initialState,
    future: [],
  });

  const dispatch = useCallback(
    (action: A | { type: "UNDO" } | { type: "REDO" }) => {
      rawDispatch(action);
    },
    [rawDispatch]
  );

  const canUndo = undoState.past.length > 0;
  const canRedo = undoState.future.length > 0;

  return useMemo(
    () => ({ state: undoState.present, dispatch, canUndo, canRedo }),
    [undoState.present, dispatch, canUndo, canRedo]
  );
}
