import type { LayersConfig } from "./files.types";

export interface CustomInterfacesConfig {
  props: boolean;
  state: boolean;
  hook: boolean;
}

export interface TemplateFunction {
  (
    name: string,
    customInterfaces?: CustomInterfacesConfig,
    config?: LayersConfig
  ): string;
}

export interface Template {
  base: Record<string, TemplateFunction>;
  ui?: Record<string, TemplateFunction>;
  model?: Record<string, TemplateFunction>;
  api?: Record<string, TemplateFunction>;
}

export interface BaseTemplates {
  feature: Template;
  entity?: Template;
}
