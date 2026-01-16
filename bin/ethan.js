#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('ethan')
  .description('Ethan构建工具 - 快速初始化前端项目')
  .version('1.0.0');

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
      
      await fs.writeJson(realPkgPath, pkgContent, { spaces: 2 });
      await fs.remove(pkgPath);

      spinner.succeed(chalk.green(`项目 ${chalk.cyan(projectName)} 创建成功！`));
      
      console.log('\n请运行以下命令开始开发：\n');
      console.log(chalk.cyan(`  cd ${projectName}`));
      console.log(chalk.cyan('  npm install'));
      console.log(chalk.cyan('  npm run dev'));
      console.log('\n');

    } catch (err) {
      spinner.fail(chalk.red('项目创建失败：' + err.message));
    }
  });

program.parse();
