export default function (plop) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
      },
      {
        type: "input",
        name: "path",
        message: "Component path (relative to components):",
        default: "components",
      },
    ],
    actions: [
      {
        type: "add",
        path: "app/{{path}}/{{dashCase name}}/{{dashCase name}}.tsx",
        templateFile: "plop/component/component.tsx.hbs",
      },
      {
        type: "add",
        path: "app/{{path}}/{{dashCase name}}/{{dashCase name}}.stories.tsx",
        templateFile: "plop/component/component.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "app/{{path}}/{{dashCase name}}/index.ts",
        templateFile: "plop/component/index.ts.hbs",
      },
      {
        type: "add",
        path: "app/{{path}}/{{dashCase name}}/tv.ts",
        templateFile: "plop/component/tv.ts.hbs",
      },
    ],
  })
}
