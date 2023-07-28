module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "initial component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name?"
      },
      {
        type: "input",
        name: "type",
        message:
          "component type e.g. atoms | molecules | organisms | templates ?"
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
      },
    ]
  });
};
