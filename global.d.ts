import { MongoClient } from "mongodb";

declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}


declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>
  }
}