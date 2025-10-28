import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

// 自定义插件：复制组件文件和样式文件
function copyComponentFiles() {
  return {
    name: 'copy-component-files',
    closeBundle() {
      // 复制按钮组件文件
      const buttonTargetDir = path.resolve(__dirname, 'dist/components/button');
      if (!fs.existsSync(buttonTargetDir)) {
        fs.mkdirSync(buttonTargetDir, { recursive: true });
      }
      
      const buttonSourceDir = path.resolve(__dirname, 'src/components/button');
      const buttonFiles = fs.readdirSync(buttonSourceDir);
      
      buttonFiles.forEach(file => {
        if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
          const sourcePath = path.join(buttonSourceDir, file);
          const targetPath = path.join(buttonTargetDir, file);
          fs.copyFileSync(sourcePath, targetPath);
          console.log(`Copied: ${file} to ${buttonTargetDir}`);
        }
      });
      
      // 复制styles文件夹
      const stylesTargetDir = path.resolve(__dirname, 'dist/styles');
      if (!fs.existsSync(stylesTargetDir)) {
        fs.mkdirSync(stylesTargetDir, { recursive: true });
      }
      
      const stylesSourceDir = path.resolve(__dirname, 'src/styles');
      const stylesFiles = fs.readdirSync(stylesSourceDir);
      
      stylesFiles.forEach(file => {
        if (file.endsWith('.css')) {
          const sourcePath = path.join(stylesSourceDir, file);
          const targetPath = path.join(stylesTargetDir, file);
          fs.copyFileSync(sourcePath, targetPath);
          console.log(`Copied: ${file} to ${stylesTargetDir}`);
        }
      });
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