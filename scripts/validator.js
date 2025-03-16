import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const exec = () => {
  const files = getFiles();
  files.forEach((file) => {
    const frontMatter = matter.read(file);
    const { tags } = frontMatter.data;

    try {
      validateTagContainSpaces(tags)
    } catch (e) {
      console.error(`Invalid Error: ${file}`);
      console.error(e.message);
      process.exit(1);
    }
  });
}

const getFiles = () => {
  // public配下のmdファイル、public/.remote は除外
  const files = fs.readdirSync('public').filter((file) => {
    return file.endsWith('.md') && !file.includes('.remote');
  });

  return files.map((file) => {
    return path.resolve('public', file);
  });
}

const validateTagContainSpaces = (tags) => {
  const invalidTags =  tags.filter((tag) => {
    return tag.match(/\s/);
  });

  if (invalidTags.length > 0) {
    throw new Error(`Invalid tag contains spaces: ${invalidTags.join(', ')}`);
  }
}

exec();
