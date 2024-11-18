import { CrudOperations } from "./crud.types";
import type { LayersConfig as BaseLayersConfig } from "./files.types";

export interface GeneratorApiConfig {
  includeCrud: boolean;
  selectedOperations?: CrudOperations;
  customRoute?: string;
}

export interface GeneratorConfig extends BaseLayersConfig {
  api?: GeneratorApiConfig;
} 