/// <reference types="vite/client" />

declare module "*.txt?raw" {
  const content: string;
  export default content;
}

declare module "*.md?raw" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "d3-cloud" {
  export interface Word {
    text?: string;
    size?: number;
    x?: number;
    y?: number;
    rotate?: number;
    [key: string]: any;
  }

  export interface Cloud {
    size(size: [number, number]): Cloud;
    words(words: Word[]): Cloud;
    padding(padding: number): Cloud;
    rotate(rotate: () => number): Cloud;
    font(font: string): Cloud;
    fontSize(fontSize: (d: any) => number): Cloud;
    spiral(spiral: string): Cloud;
    on(event: string, callback: (words: Word[]) => void): Cloud;
    start(): void;
  }

  export default function (): Cloud;
}

declare module "figma:asset/*" {
  const src: string;
  export default src;
}
