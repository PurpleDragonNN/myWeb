// leancloud数据存储服务
import AV, {File} from "leancloud-storage";

export const createObjClass = (name:string) => new AV.Object(name);
export const createQueryClass = (name:string) => new AV.Query(name);
export const createFileClass = (name:string, file:File) => new AV.File(name,file);


