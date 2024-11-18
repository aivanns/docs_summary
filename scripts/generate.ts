import * as path from "path";
import * as readline from "readline";
import chalk from "chalk";
import ora from "ora";
import * as fs from "fs";
import type {
  StructureType,
  StructureTypes,
  Layers,
  BaseTemplates,
  TemplateFunction,
  CrudOperations,
  CustomInterfacesConfig,
} from "./types/index";
import type { GeneratorConfig } from "./types/generator.types";
import gradient from "gradient-string";

const STRUCTURE_TYPES: StructureTypes = {
  FEATURE: "feature",
  ENTITY: "entity",
} as const;

const LAYERS: Layers = {
  UI: "ui",
  MODEL: "model",
  API: "api",
};

const baseTemplates: BaseTemplates = {
  feature: {
    base: {
      "index.ts": (
        name: string,
        customInterfaces?: CustomInterfacesConfig
      ): string => {
        const componentName = capitalize(name);
        const exports = [];

        if (customInterfaces?.props) {
          exports.push(`export { ${componentName} } from "./ui";`);
        }
        if (customInterfaces?.state) {
          exports.push(`export { use${componentName}Store } from "./model";`);
        }
        if (customInterfaces?.hook) {
          exports.push(`export { use${componentName} } from "./model";`);
        }
        exports.push(
          `export type { ${componentName}Props, ${componentName}State } from "./types";`
        );
        exports.push(`export { ${componentName}Api } from "./api";`);

        return exports.join("\n");
      },
      "types/index.ts": (name: string): string => {
        return `export * from "./${name.toLowerCase()}-types";`;
      },
      "types/{{name}}-types.ts": (
        name: string,
        customInterfaces?: CustomInterfacesConfig
      ): string => {
        const componentName = capitalize(name);
        let types = "";

        if (customInterfaces?.props) {
          types += `export interface ${componentName}Props {\n  className?: string;\n}\n\n`;
        }

        if (customInterfaces?.state) {
          types += `export interface ${componentName}State {\n  // Define your state here\n}\n\n`;
        }

        if (customInterfaces?.hook) {
          types += `export interface ${componentName}Hook {\n  data?: unknown;\n  isLoading?: boolean;\n  error?: Error | null;\n}\n\n`;
        }

        types += `export interface Create${componentName}Payload {\n  // Define create payload here\n}\n\n`;
        types += `export interface Update${componentName}Payload {\n  // Define update payload here\n}\n\n`;
        types += `export interface ${componentName}Response {\n  // Define API response here\n}\n\n`;
        types += `export interface ${componentName}ListResponse {\n  items: ${componentName}Response[];\n  total: number;\n}\n`;

        return types;
      },
    },
    [LAYERS.UI]: {
      "ui/index.ts": (name: string): string => {
        const componentName = capitalize(name);
        return `export { ${componentName} } from "./${name.toLowerCase()}-ui";`;
      },
      "ui/{{name}}-ui.tsx": (
        name: string,
        customInterfaces?: CustomInterfacesConfig
      ): string => {
        const componentName = capitalize(name);
        const imports = [
          `"use client";\n`,
          `import { cn } from "@/shared/utils/lib/cn";`,
        ];

        if (customInterfaces?.props) {
          imports.push(
            `import type { ${componentName}Props } from "../types";`
          );
        }

        return (
          `${imports.join("\n")}\n\n` +
          `export const ${componentName} = (${
            customInterfaces?.props
              ? `{ className }: ${componentName}Props`
              : "()"
          }) => {\n` +
          `  return (\n` +
          `    <div className={${
            customInterfaces?.props ? 'cn("", className)' : '""'
          }}>\n` +
          `      ${componentName} Component\n` +
          `    </div>\n` +
          `  );\n` +
          `};`
        );
      },
    },
    [LAYERS.MODEL]: {
      "model/index.ts": (
        name: string,
        customInterfaces?: CustomInterfacesConfig
      ): string => {
        const componentName = capitalize(name);
        const exports = [];

        if (customInterfaces?.state) {
          exports.push(
            `export { use${componentName}Store } from "./${name.toLowerCase()}-store";`
          );
        }
        if (customInterfaces?.hook) {
          exports.push(
            `export { use${componentName} } from "./use-${name.toLowerCase()}";`
          );
        }

        return exports.join("\n");
      },
      "model/{{name}}-store.ts": (
        name: string,
        customInterfaces?: CustomInterfacesConfig
      ): string => {
        const componentName = capitalize(name);

        if (customInterfaces?.state) {
          return (
            `import { create } from "zustand";\n` +
            `import type { ${componentName}State } from "../types";\n\n` +
            `export const use${componentName}Store = create<${componentName}State>((set) => ({\n` +
            `  // Define your store methods here\n` +
            `}));`
          );
        }

        return (
          `import { create } from "zustand";\n\n` +
          `export const use${componentName}Store = create((set) => ({\n` +
          `  // Define your store methods here\n` +
          `}));`
        );
      },
      "model/use-{{name}}.ts": (
        name: string,
        customInterfaces?: CustomInterfacesConfig
      ): string => {
        const componentName = capitalize(name);

        if (customInterfaces?.hook) {
          return (
            `import type { ${componentName}Hook } from "../types";\n\n` +
            `export const use${componentName} = (): ${componentName}Hook => {\n` +
            `  return {\n    // Return hook data here\n  };\n` +
            `};`
          );
        }

        return (
          `export const use${componentName} = () => {\n` +
          `  return {\n    // Return hook data here\n  };\n` +
          `};`
        );
      },
    },
    [LAYERS.API]: {
      "api/index.ts": (name: string): string => {
        const componentName = capitalize(name);
        return `export { ${componentName}Api } from "./${name.toLowerCase()}-api";`;
      },
      "api/{{name}}-api.ts": (
        name: string,
        customInterfaces?: CustomInterfacesConfig,
        config?: GeneratorConfig
      ): string => {
        const componentName = capitalize(name);
        const route = config?.api?.customRoute || name.toLowerCase();
        const ops = config?.api?.selectedOperations;

        if (!config?.api?.includeCrud || !ops) {
          return (
            `import type { ${componentName}Props } from "../types";\n` +
            `import { apiRequest } from "@/shared/api";\n\n` +
            `export const ${componentName}Api = {\n` +
            `  // Add your custom API methods here\n` +
            `};`
          );
        }

        let methods = `export const ${componentName}Api = {\n`;

        if (ops.read) {
          methods += generateReadMethods(componentName, route);
        }
        if (ops.create) {
          methods += generateCreateMethod(componentName, route);
        }
        if (ops.update) {
          methods += generateUpdateMethod(componentName, route);
        }
        if (ops.delete) {
          methods += generateDeleteMethod(route);
        }

        methods = methods.replace(/,\n$/, "\n");
        methods += `};`;

        const imports = generateApiImports(componentName, ops);

        return imports + methods;
      },
    },
  },
};

const generateReadMethods = (componentName: string, route: string): string => `
  getAll: async () => {
    const response = await apiRequest.get<${componentName}ListResponse>("/${route}");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiRequest.get<${componentName}Response>(\`/${route}/\${id}\`);
    return response.data;
  },
`;

const generateCreateMethod = (componentName: string, route: string): string => `
  create: async (data: Create${componentName}Payload) => {
    const response = await apiRequest.post<${componentName}Response>("/${route}", data);
    return response.data;
  },
`;

const generateUpdateMethod = (componentName: string, route: string): string => `
  update: async (id: string, data: Update${componentName}Payload) => {
    const response = await apiRequest.patch<${componentName}Response>(\`/${route}/\${id}\`, data);
    return response.data;
  },
`;

const generateDeleteMethod = (route: string): string => `
  delete: async (id: string) => {
    const response = await apiRequest.delete(\`/${route}/\${id}\`);
    return response.data;
  },
`;

const generateApiImports = (
  componentName: string,
  ops: CrudOperations
): string => {
  const types: string[] = [];

  if (ops.create) types.push(`Create${componentName}Payload`);
  if (ops.update) types.push(`Update${componentName}Payload`);
  if (ops.read || ops.create || ops.update) {
    types.push(`${componentName}Response`);
    if (ops.read) types.push(`${componentName}ListResponse`);
  }

  return (
    `import type {\n  ${types.join(",\n  ")}\n} from "../types";\n` +
    `import { apiRequest } from "@/shared/api";\n\n`
  );
};

const createReadlineInterface = (): readline.Interface =>
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const askQuestion = (
  rl: readline.Interface,
  question: string,
  defaultValue?: string
): Promise<string> =>
  new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer || defaultValue || "");
    });
  });

const askNumberInRange = async (
  rl: readline.Interface,
  question: string,
  min: number,
  max: number
): Promise<number> => {
  while (true) {
    const answer = await askQuestion(rl, question);
    const num = parseInt(answer);

    if (!isNaN(num) && num >= min && num <= max) {
      return num;
    }

    console.log(
      chalk.red(`❌ Please enter a number between ${min} and ${max}`)
    );
  }
};

const askYesNo = async (
  rl: readline.Interface,
  message: string
): Promise<boolean> => {
  while (true) {
    const answer = await askQuestion(
      rl,
      chalk.blue(`${message} `) + chalk.gray("(y/n): "),
      "n"
    );
    const normalized = answer.toLowerCase();

    if (normalized === "y" || normalized === "n") {
      return normalized === "y";
    }

    console.log(chalk.red("❌ Please enter 'y' or 'n'"));
  }
};

const askConfirmation = async (
  rl: readline.Interface,
  message: string
): Promise<boolean> => {
  return askYesNo(rl, message);
};

const validateName = (name: string): string => {
  if (!name || name.trim().length === 0) {
    throw new Error("Name cannot be empty");
  }
  return name.trim();
};

const checkFeatureExists = (type: StructureType, name: string): boolean => {
  const basePath = path.join(
    type === "feature" ? "./src/features" : "./src/entities",
    name.toLowerCase()
  );
  return fs.existsSync(basePath);
};

const parseCrudOperations = (input: string): CrudOperations => {
  const operations: CrudOperations = {
    create: false,
    read: false,
    update: false,
    delete: false,
  };

  input
    .toLowerCase()
    .split("")
    .forEach((char) => {
      switch (char) {
        case "c":
          operations.create = true;
          break;
        case "r":
          operations.read = true;
          break;
        case "u":
          operations.update = true;
          break;
        case "d":
          operations.delete = true;
          break;
      }
    });

  return operations;
};

const askStructureType = async (
  rl: readline.Interface
): Promise<StructureType> => {
  console.log(chalk.blue("📦 Select structure type:"));
  console.log(chalk.dim("\nAvailable options:"));
  Object.values(STRUCTURE_TYPES).forEach((type, index) => {
    console.log(
      chalk.gray(`  ${index + 1}) ${type} ${type === "feature" ? "🔥" : "📦"}`)
    );
  });

  const answer = await askNumberInRange(
    rl,
    chalk.blue("\n↪ Enter number (1-2): "),
    1,
    2
  );

  const selectedType = Object.values(STRUCTURE_TYPES)[answer - 1];
  return selectedType as StructureType;
};

const getLayersConfig = async (
  rl: readline.Interface,
  type: StructureType,
  name: string
): Promise<GeneratorConfig> => {
  const config: GeneratorConfig = {
    layers: {
      ui: false,
      model: false,
      api: false,
    },
    fileNames: {},
  };

  console.log(chalk.yellow("\n🗂  Select layers to generate:"));
  console.log(chalk.dim("Choose which layers you want to include\n"));

  if (type === "feature") {
    config.layers.ui = await askConfirmation(rl, "🎨 Include UI layer?");
  }

  const includeModel = await askConfirmation(rl, "📊 Include Model layer?");
  if (includeModel) {
    config.layers.model = true;
    const includeStore = await askConfirmation(rl, "📦 Include Store?");
    const includeHook = await askConfirmation(rl, "🎣 Include Hook?");

    if (includeModel) {
      config.fileNames.model = {
        types: `${name.toLowerCase()}-types`,
        ...(includeStore && { store: `${name.toLowerCase()}-store` }),
        ...(includeHook && { hook: `use-${name.toLowerCase()}` }),
      };
    }
  }

  config.layers.api = await askConfirmation(rl, "🔌 Include API layer?");
  if (config.layers.api) {
    const includeCrud = await askConfirmation(
      rl,
      "🔧 Include CRUD operations?"
    );

    if (includeCrud) {
      console.log(chalk.blue("\n🛠  Select CRUD operations:"));
      console.log(chalk.dim("Available operations:"));
      console.log(chalk.gray("  c - Create 📝"));
      console.log(chalk.gray("  r - Read   📖"));
      console.log(chalk.gray("  u - Update 📤"));
      console.log(chalk.gray("  d - Delete 🗑️ "));

      const crudInput = await askQuestion(
        rl,
        chalk.blue(
          "\n↪ Enter letters for desired operations (e.g., 'crud' or 'cr'): "
        )
      );

      const useCustomRoute = await askConfirmation(
        rl,
        "🛣️  Use custom API route?"
      );
      const customRoute = useCustomRoute
        ? await askQuestion(
            rl,
            chalk.blue("↪ Enter custom route (without leading slash): ")
          )
        : undefined;

      config.api = {
        includeCrud,
        selectedOperations: parseCrudOperations(crudInput),
        customRoute,
      };
    } else {
      config.api = { includeCrud };
    }
  }

  if (!config.layers.ui && !config.layers.model && !config.layers.api) {
    throw new Error("At least one layer must be selected");
  }

  if (config.layers.ui) {
    config.fileNames.ui = {
      component: name.toLowerCase(),
    };
  }

  if (config.layers.api) {
    config.fileNames.api = {
      service: `${name.toLowerCase()}-api`,
      route: config.api?.customRoute || name.toLowerCase(),
      includeCrud: config.api?.includeCrud || false,
      selectedOperations: config.api?.selectedOperations,
      useCustomTypes: true,
    };
  }

  return config;
};

const generateFiles = async (
  type: StructureType,
  name: string,
  config: GeneratorConfig,
  customInterfaces: CustomInterfacesConfig
): Promise<void> => {
  const basePath = path.join(
    type === "feature" ? "./src/features" : "./src/entities",
    name.toLowerCase()
  );

  const template = baseTemplates[type];
  if (!template) {
    throw new Error(`Template for type ${type} not found`);
  }

  createStructure(basePath, template.base, name, customInterfaces, config);

  if (config.layers.ui && template.ui) {
    createStructure(basePath, template.ui, name, customInterfaces, config);
  }
  if (config.layers.model && template.model) {
    createStructure(basePath, template.model, name, customInterfaces, config);
  }
  if (config.layers.api && template.api) {
    createStructure(basePath, template.api, name, customInterfaces, config);
  }
};

const createStructure = (
  basePath: string,
  template: Record<string, TemplateFunction>,
  name: string,
  customInterfaces: CustomInterfacesConfig,
  config?: GeneratorConfig
): void => {
  Object.entries(template).forEach(([filePath, contentFn]) => {
    const finalPath = filePath.replace(/{{name}}/g, name.toLowerCase());
    const fullPath = path.join(basePath, finalPath);
    const directory = path.dirname(fullPath);

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(fullPath, contentFn(name, customInterfaces, config));
  });
};

const printDirectoryStructure = async (
  dir: string,
  prefix: string = ""
): Promise<void> => {
  const files = fs.readdirSync(dir);

  for (const [index, file] of files.entries()) {
    const filePath = path.join(dir, file);
    const isLast = index === files.length - 1;
    const stats = fs.statSync(filePath);
    const isDirectory = stats.isDirectory();

    const fileIcon = isDirectory ? "📁" : "📄";
    const fileName = isDirectory ? chalk.magenta(file) : chalk.cyan(file);

    console.log(
      prefix + (isLast ? "└── " : "├── ") + `${fileIcon} ${fileName}`
    );

    if (isDirectory) {
      await printDirectoryStructure(
        filePath,
        prefix + (isLast ? "    " : "│   ")
      );
    }
  }
};

async function generateStructure(): Promise<void> {
  const rl = createReadlineInterface();
  const spinner = ora();

  try {
    console.log(
      "\n" + gradient.pastel.multiline("🚀 Feature & Entity Generator") + "\n"
    );
    console.log(chalk.dim("✨ Create new features and entities with ease\n"));

    const type = await askStructureType(rl);
    const name = validateName(
      await askQuestion(rl, chalk.blue(" Enter name: "))
    );

    if (checkFeatureExists(type, name)) {
      spinner.fail(
        chalk.red(`❌ ${type} "${name}" already exists! Operation cancelled.`)
      );
      rl.close();
      return;
    }

    const config = await getLayersConfig(rl, type, name);
    const customInterfaces = await askCustomInterfaces(rl, config.layers);

    spinner.start(chalk.blue(`🔨 Creating ${type} structure...`));
    await generateFiles(type, name, config, customInterfaces);

    spinner.succeed(chalk.green(`✅ ${type} "${name}" successfully created`));

    console.log("\n" + chalk.yellow("📂 Created files structure:"));
    await printDirectoryStructure(
      path.join(
        type === "feature" ? "./src/features" : "./src/entities",
        name.toLowerCase()
      )
    );

    console.log(
      "\n" + gradient.cristal("✨ Generation completed successfully!")
    );
    console.log(chalk.dim("\nHappy coding! 🚀\n"));
  } catch (error: unknown) {
    if (error instanceof Error) {
      spinner.fail(chalk.red(`❌ Error: ${error.message}`));
    } else {
      spinner.fail(chalk.red(`❌ An unknown error occurred`));
    }
  } finally {
    rl.close();
  }
}

generateStructure().catch(console.error);

const askCustomInterfaces = async (
  rl: readline.Interface,
  layers: GeneratorConfig["layers"]
): Promise<CustomInterfacesConfig> => {
  console.log(chalk.yellow("\n📘 Interface Configuration:"));
  console.log(chalk.dim("Select which interfaces you want to generate\n"));

  const config: CustomInterfacesConfig = {
    props: false,
    state: false,
    hook: false,
  };

  if (layers.ui) {
    config.props = await askConfirmation(
      rl,
      "🎨 Generate Props interface for UI?"
    );
  }

  if (layers.model) {
    config.state = await askConfirmation(
      rl,
      "📊 Generate State interface for Store?"
    );
    config.hook = await askConfirmation(rl, "🎣 Generate Hook interface?");
  }

  return config;
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
