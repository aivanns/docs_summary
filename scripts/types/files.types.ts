import { CrudOperations } from "./crud.types";

export interface UIFileNames {
  component: string;
}

export interface ModelFileNames {
  types: string;
  store?: string;
  hook?: string;
}

export interface ApiFileNames {
  service: string;
  route: string;
  includeCrud: boolean;
  selectedOperations?: CrudOperations;
  useCustomTypes?: boolean;
}

export interface FileNames {
  ui?: UIFileNames;
  model?: ModelFileNames;
  api?: ApiFileNames;
}

export interface LayersConfig {
  layers: {
    ui: boolean;
    model: boolean;
    api: boolean;
  };
  fileNames: FileNames;
}

export type FileOperationType = "ui" | "store" | "hook" | "api" | "types";
