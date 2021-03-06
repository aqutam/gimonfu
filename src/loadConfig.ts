import path from "path"
import { promises as fs } from 'fs'

interface ConfigFile {
  configString: string
  baseDir: string
}
interface Config {
  user_id: string,
  blog_id: string,
  api_key: string,
  baseDir: string
}

const loadConfigFile = (dirPath: string): Promise<ConfigFile> => {
  const configPath = path.resolve( dirPath, '.gimonfu.json' );
  return fs.readFile(configPath, 'utf-8')
    .then( configString => { return { configString, baseDir: dirPath} })
    .catch( ()=> {
      const parentDir = path.resolve( dirPath, '../' )
      if ( parentDir === dirPath ) {
        // root directory までさかのぼっても .gimonfu.jsonが無い
        return Promise.reject(new Error('Need .gimonfu.json'))
      }
      return loadConfigFile( parentDir )
    })
}

export default async function ():Promise<Config> {
  const {configString, baseDir} = await loadConfigFile( process.cwd() )
  try {
    const config = JSON.parse(configString)
    if( !config?.user_id || !config?.blog_id || !config?.api_key ) {
      return Promise.reject(new Error('Need user_id, blog_id, api_key in .gimonfu.json'))
    }
    return {...config, baseDir}
  } catch {
    return Promise.reject(new Error('Failed to parse .gimonfu.json'))
  }
}
