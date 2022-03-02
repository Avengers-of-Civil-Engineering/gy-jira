import React, { ReactNode } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        }
        return <div />;
      }}
    </Droppable>
  );
};

type DropChildrenProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HtmlHTMLAttributes<HTMLDivElement>;

// Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。
export const DropChild = React.forwardRef<HTMLDivElement, DropChildrenProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };

export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ref: provided.innerRef,
            ...provided.draggableProps,
            ...provided.dragHandleProps,
          });
        }
        return <div />;
      }}
    </Draggable>
  );
};
