# Typescript Monorepo

## 配置步骤

- 支持项目变成monorepo

  ```json
  "workspaces": ["apps/*", "packages/*"]
  ```

  我们在`package.json`中配置项目成为一个monorepo项目，其中特别指定了`apps/`和`pakcages/`这两个目录下的文件夹都是一个个独立的`repo`，每个repo都有自己的`package.json`。`yarn`会去扫描`workspaces`指定的目录，并寻找每个目录中的`package.json`。

  在`apps/`下建立一个`web`应用，用来存放我们的web页面的代码。其中配置`tsconfig.json`如下：

  ```json
  {
    "compilerOptions": {
          "paths": {
              "@jeditor/*": [
                  "../../packages/*/src/index"
              ]
          }
      }
  }
  ```

  事实上，即使你在web中安装了`"@jeditor/transpiler": "workspace:^"`，通过在`web`项目中`import transpiler from "@jeditor/transpiler"`的方式引入`@jeditor/transpiler`这个包，如果想要ts不报错，就必须正确配置ts路径别名，这样子ts才能够找到对应的文件。否则，你将会得到一个ts错误：`Cannot find module '@jeditor/transpiler' or its corresponding type declarations.ts(2307)`

  现在，我们在`web/src/index.ts`中的代码大致如下：

  ```typescript
  import {transpiler} from '@jeditor/transpiler'
  
  console.log("transpiler", transpiler)
  ```

  当你尝试使用`ts-node web/src/index.ts`时，tsc会报错找不到`@jeditor/transpiler`这个包，本质上ts-node在寻找包的时候是会去`node_modules`下寻找的，它不会去`tsconfig.json`当中找你配置的这个包路径别名。为了实现这个效果，我们需要额外的工具：`tsconfig-paths`。安装完成后，我们将命令改成`ts-node -r tsconfig-paths/register src/index.ts`，此时我们可以看到正确执行了所有代码。
