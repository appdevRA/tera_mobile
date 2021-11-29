import { Folder } from '../../types'
import axios from '../axios'
import { parseFolder } from '../parsers'

export const list = () =>
  axios
    .get<Folder[]>('folders/')
    .then((res) => res.data)
    .then((data) => data.map((folder) => parseFolder(folder)))
