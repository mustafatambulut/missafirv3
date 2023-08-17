module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "initial component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name (e.g. exampleTitle) ?"
      },
      {
        type: "input",
        name: "type",
        message:
          "component type (e.g. atoms | molecules | organisms | templates) ?"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{camelCase type}}/{{camelCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component.hbs"
      },
      {
        type: "add",
        path: "src/components/{{camelCase type}}/{{camelCase name}}/types.ts",
        templateFile: "templates/type.hbs"
      }
    ]
  });
  plop.setGenerator("layout", {
    description: "initial layout",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "layout name (e.g. example) ?"
      },
      {
        type: "input",
        name: "folder",
        message: "layout folder name (e.g. reservation) ?"
      }
    ],
    actions: [
      {
        type: "add",
        path: `src/app/[lang]/{{kebabCase folder}}/layout.tsx`,
        templateFile: "templates/layout.hbs"
      },
      {
        type: "add",
        path: `src/app/[lang]/{{kebabCase folder}}/page.tsx`,
        templateFile: "templates/page.hbs"
      },
      {
        type: "add",
        path: `src/app/[lang]/{{kebabCase folder}}/types.ts`,
        templateFile: "templates/layoutType.hbs"
      }
    ]
  });
};
