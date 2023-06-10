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

- `vite`项目开发集成`tsconfig path`

  我们已经能够在纯ts代码当中去支持不打包就能够直接运行相关本地ts包，让我们的代码正确寻找到对应的依赖包了。现在我们要在`vite`项目当中集成`tsconfig path`。当我们尝试使用vite创建一个web项目的时候，比如说vue项目，不依赖本地ts包的情况下，使用命令`vite`可以直接将我们的项目成功跑起来。现在，我们想在项目中引入我们自己开发的本地ts依赖包，当我们尝试在项目中通过import transpiler from "@jeditor/transpiler"`的方式引入包，然后再次使用vite运行我们的项目时，会发现控制台报错`[vite] Internal server error: Failed to resolve entry for package "@jeditor/transpiler". The package may have incorrect main/module/exports specified in its package.json.`，原因也是类似的，开发环境下希望vite直接找到tsconfig配置路径别名的包目前是没法支持的，为了实现这个功能，我们引入一个vite插件：vite-tsconfig-paths，然后配置到vite插件中去，再次运行vite，我们发现vite已经能够直接在开发环境下支持寻找我们本地开发的依赖包了。
