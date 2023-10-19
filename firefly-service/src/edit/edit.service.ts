import { Injectable } from '@nestjs/common';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import FsHandler from '../generator/fshandler';
import { NodeParam } from '../types';
import Generator from '../generator/ast';
import * as prettier from 'prettier';
import * as chokidar from 'chokidar';
import * as fs from 'fs-extra';
import * as Path from 'path';
import { deleteNode } from '../react-markjsx';

const watcherQueue = [];

@Injectable()
export class EditService {
  rootDir = '';

  insertNode(nodeParam: NodeParam): any {
    const content = FsHandler.getInstance().parseFile(nodeParam.path);
    const code = Generator.getInstance().insertNode(content, nodeParam);
    // const options = prettier.resolveConfig.sync(); // 使用默认配置
    const formatCode = prettier.format(code);
    FsHandler.getInstance().writeFile(nodeParam.path, formatCode);
    return {
      status: 1,
    };
  }

  syncNodeIdMap(data: any): any {
    console.log(data);
  }

  moveNode(): any {
    console.log('moveNode');
  }

  deleteNode(data: { path: string; uid: string }): any {
    const res = deleteNode(data.path, data.uid);
    return {
      status: 0,
    };
  }

  replaceNode(): any {
    console.log('replaceNode');
  }

  watchProject(dir: string) {
    const watcher = chokidar.watch(
      '/Users/haitaowu/lab/firefly/demos/vite-react/',
      {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
      },
    );
    watcher.on('change', (path, stats) => {
      if (!watcherQueue.includes(path)) {
        watcherQueue.push(path);
      }
    });
  }

  getProjectRootPath(path: string) {
    fs.statSync(path).isDirectory();
    let currentPath = fs.statSync(path).isDirectory()
      ? path
      : Path.join(path, '..');
    let rootDir = '';
    while (currentPath) {
      if (fs.pathExistsSync(Path.join(currentPath, 'package.json'))) {
        rootDir = currentPath;
        break;
      } else {
        currentPath = Path.join(currentPath, '..');
      }
    }
    this.rootDir = rootDir;
    return rootDir;
  }

  getWatchChangeFiles() {
    return watcherQueue;
  }

  getFilesContent(files: string[]) {
    return files.map((path) => {
      console.log('******9', path);
      return {
        file: path,
        content: fs.readFileSync(Path.join(path), 'utf8'),
      };
    });
  }
}
