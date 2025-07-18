import React, { createContext, useContext, useState, ReactNode } from "react";

export interface WidgetInfo {
  id: string;
  title: string;
  position: number;
}

export interface DragDropState {
  isDragging: boolean;
  draggedWidget: WidgetInfo | null;
  dropTarget: string | null;
  widgets: WidgetInfo[];
}

interface DragDropContextType {
  state: DragDropState;
  startDrag: (widget: WidgetInfo) => void;
  endDrag: () => void;
  setDropTarget: (targetId: string | null) => void;
  reorderWidgets: (sourceId: string, targetId: string) => void;
  addWidget: (widget: WidgetInfo) => void;
  removeWidget: (widgetId: string) => void;
  updateWidget: (widgetId: string, updates: Partial<WidgetInfo>) => void;
}

const DragDropContext = createContext<DragDropContextType | null>(null);

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }
  return context;
};

interface DragDropProviderProps {
  children: ReactNode;
  initialWidgets?: WidgetInfo[];
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({
  children,
  initialWidgets = [],
}) => {
  const [state, setState] = useState<DragDropState>({
    isDragging: false,
    draggedWidget: null,
    dropTarget: null,
    widgets: initialWidgets,
  });

  const startDrag = (widget: WidgetInfo) => {
    setState((prev) => ({
      ...prev,
      isDragging: true,
      draggedWidget: widget,
    }));
  };

  const endDrag = () => {
    setState((prev) => ({
      ...prev,
      isDragging: false,
      draggedWidget: null,
      dropTarget: null,
    }));
  };

  const setDropTarget = (targetId: string | null) => {
    setState((prev) => ({
      ...prev,
      dropTarget: targetId,
    }));
  };

  const reorderWidgets = (sourceId: string, targetId: string) => {
    setState((prev) => {
      const newWidgets = [...prev.widgets];
      const sourceIndex = newWidgets.findIndex((w) => w.id === sourceId);
      const targetIndex = newWidgets.findIndex((w) => w.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1) return prev;

      // Remove the source widget
      const [sourceWidget] = newWidgets.splice(sourceIndex, 1);

      // Insert at the target position
      newWidgets.splice(targetIndex, 0, sourceWidget);

      // Update positions
      const updatedWidgets = newWidgets.map((widget, index) => ({
        ...widget,
        position: index,
      }));

      return {
        ...prev,
        widgets: updatedWidgets,
      };
    });
  };

  const addWidget = (widget: WidgetInfo) => {
    setState((prev) => ({
      ...prev,
      widgets: [...prev.widgets, widget],
    }));
  };

  const removeWidget = (widgetId: string) => {
    setState((prev) => ({
      ...prev,
      widgets: prev.widgets.filter((w) => w.id !== widgetId),
    }));
  };

  const updateWidget = (widgetId: string, updates: Partial<WidgetInfo>) => {
    setState((prev) => ({
      ...prev,
      widgets: prev.widgets.map((w) =>
        w.id === widgetId ? { ...w, ...updates } : w,
      ),
    }));
  };

  const contextValue: DragDropContextType = {
    state,
    startDrag,
    endDrag,
    setDropTarget,
    reorderWidgets,
    addWidget,
    removeWidget,
    updateWidget,
  };

  return (
    <DragDropContext.Provider value={contextValue}>
      {children}
    </DragDropContext.Provider>
  );
};
