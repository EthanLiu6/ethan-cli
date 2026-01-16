#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import ora from 'ora';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

// 获取版本号
const pkg = fs.readJsonSync(path.resolve(__dirname, '../package.json'));

program
  .name('ethan')
  .description('Ethan构建工具 - 快速初始化前端项目')
  .version(pkg.version);

program
  .command('init <project-name>')
  .description('初始化一个新项目')
  .action(async (projectName) => {
    const targetDir = path.join(process.cwd(), projectName);

    if (fs.existsSync(targetDir)) {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `目录 ${chalk.cyan(projectName)} 已存在，请选择操作：`,
          choices: [
            { name: '覆盖', value: 'overwrite' },
            { name: '取消', value: 'cancel' },
          ],
        },
      ]);

      if (action === 'cancel') {
        return;
      } else {
        console.log(`\n正在移除旧目录 ${chalk.cyan(targetDir)}...`);
        await fs.remove(targetDir);
      }
    }

    // 收集项目信息
    const info = await inquirer.prompt([
      {
        name: 'description',
        type: 'input',
        message: '项目描述:',
        default: 'A Vue 3 project created by Ethan CLI',
      },
      {
        name: 'author',
        type: 'input',
        message: '作者:',
        default: '',
      },
      {
        name: 'version',
        type: 'input',
        message: '版本号:',
        default: '1.0.0',
      },
      {
        name: 'install',
        type: 'confirm',
        message: '是否自动安装依赖?',
        default: true,
      },
      {
        name: 'manager',
        type: 'list',
        message: '选择包管理器:',
        choices: ['npm', 'pnpm', 'yarn'],
        when: (answers) => answers.install,
      },
      {
        name: 'git',
        type: 'confirm',
        message: '是否初始化 Git 仓库?',
        default: true,
      },
    ]);

    const spinner = ora('正在创建项目...').start();
    
    try {
      const templateDir = path.resolve(__dirname, '../template');
      
      // 复制模版文件
      await fs.copy(templateDir, targetDir);

      // 处理 package.json
      const pkgPath = path.join(targetDir, 'project-package.json');
      const realPkgPath = path.join(targetDir, 'package.json');
      
      const pkgContent = await fs.readJson(pkgPath);
      pkgContent.name = projectName;
      pkgContent.description = info.description;
      pkgContent.author = info.author;
      pkgContent.version = info.version;
      
      await fs.writeJson(realPkgPath, pkgContent, { spaces: 2 });
      await fs.remove(pkgPath);

      // 处理 README.md 中的占位符
      const readmePath = path.join(targetDir, 'README.md');
      if (fs.existsSync(readmePath)) {
        let readmeContent = await fs.readFile(readmePath, 'utf-8');
        readmeContent = readmeContent.replace(/#PROJECT_NAME#/g, projectName);
        await fs.writeFile(readmePath, readmeContent);
      }

      spinner.succeed(chalk.green(`项目 ${chalk.cyan(projectName)} 创建成功！`));
      
      // 初始化 Git
      if (info.git) {
        try {
          execSync('git init', { cwd: targetDir, stdio: 'ignore' });
          console.log(chalk.green('✔ Git 仓库初始化成功'));
        } catch (e) {
          console.log(chalk.yellow('⚠ Git 仓库初始化失败'));
        }
      }

      // 安装依赖
      if (info.install) {
        console.log(`\n正在使用 ${chalk.cyan(info.manager)} 安装依赖，请稍候...\n`);
        try {
          execSync(`${info.manager} install`, { cwd: targetDir, stdio: 'inherit' });
          console.log(chalk.green(`\n✔ 依赖安装成功`));
        } catch (e) {
          console.log(chalk.red(`\n✘ 依赖安装失败，请手动执行 ${info.manager} install`));
        }
      }

      console.log('\n请运行以下命令开始开发：\n');
      console.log(chalk.cyan(`  cd ${projectName}`));
      if (!info.install) {
        console.log(chalk.cyan('  npm install (或你偏好的包管理器)'));
      }
      console.log(chalk.cyan('  npm run dev'));
      console.log('\n');

    } catch (err) {
      spinner.fail(chalk.red('项目创建失败：' + err.message));
    }
  });

program.parse();
