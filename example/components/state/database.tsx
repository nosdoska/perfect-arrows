import { IBox, IArrow, IArrowType } from "../../types"
import { getArrow } from "../utils"

const RESET_LOCAL_DATA = true

export const LOCAL_STORAGE_KEY = "perfect_arrows_example"

/**
 * Save something to the "database"
 * @param data
 */
export function saveToDatabase(data: string) {
  localStorage.setItem(LOCAL_STORAGE_KEY, data)
}

/**
 * Get the initial data for the store.
 */
export function getInitialData(): {
  boxes: Record<string, IBox>
  arrows: Record<string, IArrow>
  selectedBoxIds: string[]
  selectedArrowIds: string[]
} {
  let previous: string | null = null
  let initial: {
    boxes: Record<string, IBox>
    arrows: Record<string, IArrow>
    selectedBoxIds: string[]
    selectedArrowIds: string[]
  }

  if (typeof window !== undefined && window.localStorage) {
    previous = localStorage.getItem(LOCAL_STORAGE_KEY)
  }

  if (previous === null || RESET_LOCAL_DATA) {
    // Initial Boxes
    const initBoxes = {
      box_a0: {
        id: "box_a0",
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        label: "",
        color: "rgba(255, 255, 255, 1)",
      },
      box_a1: {
        id: "box_a1",
        x: 200,
        y: 300,
        width: 100,
        height: 100,
        label: "",
        color: "rgba(255, 255, 255, 1)",
      },
    }

    // Initial Arrows
    const a = initBoxes["box_a0"]
    const b = initBoxes["box_a1"]

    const initArrows: Record<string, IArrow> = {
      arrow_a0: {
        id: "arrow_a0",
        type: IArrowType.BoxToBox,
        from: a.id,
        to: b.id,
        flip: false,
        label: "",
      },
      arrow_a1: {
        id: "arrow_a1",
        type: IArrowType.BoxToBox,
        from: a.id,
        to: a.id,
        flip: false,
        label: "",
      },
      arrow_a2: {
        id: "arrow_a2",
        type: IArrowType.BoxToPoint,
        from: a.id,
        to: { x: 300, y: 200 },
        flip: false,
        label: "",
      },
      arrow_a3: {
        id: "arrow_a3",
        type: IArrowType.PointToBox,
        from: { x: 100, y: 500 },
        to: b.id,
        flip: false,
        label: "",
      },
      arrow_a4: {
        id: "arrow_a4",
        type: IArrowType.PointToPoint,
        from: { x: 500, y: 800 },
        to: { x: 200, y: 600 },
        flip: false,
        label: "",
      },
    }

    initial = {
      boxes: initBoxes,
      arrows: initArrows,
      selectedArrowIds: [],
      selectedBoxIds: [],
    }
  } else {
    initial = JSON.parse(previous)
  }

  return initial
}