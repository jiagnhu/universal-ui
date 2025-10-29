import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

// 自定义插件：复制组件文件和样式文件
function copyComponentFiles() {
  return {
    name: 'copy-component-files',
    closeBundle() {
      try {
        // 获取所有组件目录
        const componentsSourceDir = path.resolve(__dirname, 'src/components');
        const dirEntries = fs.readdirSync(componentsSourceDir, { withFileTypes: true });
        const componentFolders = [];
        
        for (const dirent of dirEntries) {
          if (dirent.isDirectory()) {
            componentFolders.push(dirent.name);
          }
        }
        
        // 复制每个组件的文件
        for (const componentName of componentFolders) {
          const componentTargetDir = path.resolve(__dirname, 'dist/components/' + componentName);
          if (!fs.existsSync(componentTargetDir)) {
            fs.mkdirSync(componentTargetDir, { recursive: true });
          }
          
          const componentSourceDir = path.resolve(__dirname, 'src/components/' + componentName);
          const componentFiles = fs.readdirSync(componentSourceDir);
          
          for (const file of componentFiles) {
            if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
              const sourcePath = path.join(componentSourceDir, file);
              const targetPath = path.join(componentTargetDir, file);
              fs.copyFileSync(sourcePath, targetPath);
              console.log('Copied: ' + file + ' to ' + componentTargetDir);
            }
          }
        }
        
        // 复制styles文件夹
        const stylesTargetDir = path.resolve(__dirname, 'dist/styles');
        if (!fs.existsSync(stylesTargetDir)) {
          fs.mkdirSync(stylesTargetDir, { recursive: true });
        }
        
        const stylesSourceDir = path.resolve(__dirname, 'src/styles');
        const stylesFiles = fs.readdirSync(stylesSourceDir);
        
        for (const file of stylesFiles) {
          if (file.endsWith('.css')) {
            const sourcePath = path.join(stylesSourceDir, file);
            const targetPath = path.join(stylesTargetDir, file);
            fs.copyFileSync(sourcePath, targetPath);
            console.log('Copied: ' + file + ' to ' + stylesTargetDir);
          }
        }
      } catch (error) {
        console.error('Error in copyComponentFiles:', error);
      }
    }
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'UniversalDesignSystem',
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
      formats: ['umd', 'es']
    },
    rollupOptions: {
      output: {
        assetFileNames: 'index.[ext]'
      }
    },
    sourcemap: true,
    outDir: 'dist',
    assetsInlineLimit: 0,
    emptyOutDir: true
  },
  plugins: [
    copyComponentFiles()
  ]
});