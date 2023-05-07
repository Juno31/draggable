import React, { useEffect, useRef } from "react";

export interface DraggableDependency {}

function useDraggable() {
  let draggableTarget: HTMLElement | undefined;
  let draggablePlaceholder: HTMLElement | undefined;
  let x: number | undefined;
  let y: number | undefined;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = function (e: MouseEvent) {
    const newDraggableTarget = e.currentTarget as HTMLElement;
    draggableTarget = newDraggableTarget;

    requestAnimationFrame(function () {
      // Calculate the mouse position
      const rect = newDraggableTarget.getBoundingClientRect();
      x = e.pageX - rect.left;
      y = e.pageY - rect.top;

      // Attach the listeners to `document`
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });
  };

  const handleMouseMove = function (e: MouseEvent) {
    e.preventDefault();
    requestAnimationFrame(function () {
      if (!draggablePlaceholder) {
        addPlaceholder();
      }

      if (draggableTarget && draggablePlaceholder) {
        const prevEle = draggableTarget.previousElementSibling as HTMLElement;
        const nextEle = draggablePlaceholder.nextElementSibling as HTMLElement;

        const currentWidth = draggableTarget.offsetWidth;

        draggableTarget.style.minWidth = `${currentWidth}px`;
        draggableTarget.style.position = "absolute";
        draggableTarget.style.top = `${e.pageY - (y ?? 0)}px`;
        draggableTarget.style.left = `${e.pageX - (x ?? 0)}px`;

        // 이전 node 위로 이동
        if (prevEle && isAbove(draggableTarget, prevEle)) {
          updateOrder(draggableTarget, prevEle);
          updateOrder(draggablePlaceholder, prevEle);
        }

        // 다음 node 아래로 이동
        if (nextEle && isAbove(nextEle, draggableTarget)) {
          updateOrder(nextEle, draggablePlaceholder);
          updateOrder(nextEle, draggableTarget);
        }
      }
    });
  };

  const handleMouseUp = function (e: MouseEvent) {
    requestAnimationFrame(function () {
      if (draggableTarget) {
        moveTargetToPlaceholder();
        removePlaceholder();

        draggableTarget.style.removeProperty("top");
        draggableTarget.style.removeProperty("left");
        draggableTarget.style.removeProperty("position");

        x = undefined;
        y = undefined;
        draggableTarget = undefined;

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    });
  };

  const addPlaceholder = function () {
    if (draggableTarget && wrapperRef.current) {
      const placeholder = draggableTarget.cloneNode(true) as HTMLElement;

      placeholder.id = "draggable-placeholder";
      placeholder.style.opacity = "0.3";
      draggablePlaceholder = placeholder;
      wrapperRef.current.insertBefore(placeholder, draggableTarget.nextSibling);
    }
  };

  const removePlaceholder = function () {
    if (draggableTarget && wrapperRef.current && draggablePlaceholder) {
      draggablePlaceholder.replaceWith(draggablePlaceholder);
      draggablePlaceholder.remove();
      draggablePlaceholder = undefined;
    }
  };

  const moveTargetToPlaceholder = function () {
    const placeholderRect = draggablePlaceholder?.getBoundingClientRect();

    if (draggableTarget && placeholderRect) {
      draggableTarget.style.top = `${placeholderRect.y}px`;
      draggableTarget.style.left = `${placeholderRect.x}px`;
    }
  };

  const isAbove = function (a: HTMLElement, b: HTMLElement) {
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();
    const rectAVerticalCenter = rectA.top + rectA.height / 2;
    const rectBVerticalCenter = rectB.top + rectB.height / 2;

    return rectAVerticalCenter < rectBVerticalCenter;
  };

  const updateOrder = function (a: HTMLElement, b: HTMLElement) {
    const wrapper = wrapperRef.current;

    if (wrapper) {
      wrapper.insertBefore(a, b);
    }
  };

  const injectDraggableIdToChildren = function () {
    const wrapper = wrapperRef.current;
    const draggableItems = wrapper?.children;

    if (draggableItems) {
      [...draggableItems].forEach(function (item: Element) {
        item.id = "draggable-item";
        item.addEventListener("mousedown", handleMouseDown as EventListener);
      });
    }
  };

  const removeDraggableIdToChildren = function () {
    const wrapper = wrapperRef.current;
    const draggableItems = wrapper?.children;

    if (draggableItems) {
      [...draggableItems].forEach(function (item: Element) {
        item.id.replaceAll("draggable-item", "");
      });
    }
  };

  // inject id to child nodes
  useEffect(function () {
    injectDraggableIdToChildren();

    return function () {
      removeDraggableIdToChildren();
    };
  }, []);

  return { wrapperRef, draggableTarget, draggablePlaceholder };
}

export default useDraggable;
