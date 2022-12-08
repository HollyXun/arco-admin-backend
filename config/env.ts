import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');
  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('数据库配置文件缺失');
  }
  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
  return {
    path: filePath,
  };
}
export default parseEnv();
