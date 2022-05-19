// leancloud数据存储服务
import AV, {File} from "leancloud-storage";

AV.init({
    appId: 'RkUUB80oGO9vlo9htFYem297-gzGzoHsz',
    appKey: 'A4hJjBWVBKMoPpPKRCOrQUnk',
    serverURL: 'https://rkuub80o.lc-cn-n1-shared.com'
})

export const createObjClass = (name:string) => new AV.Object(name);
export const createQueryClass = (name:string) => new AV.Query(name);
export const createFileClass = (name:string, file:File) => new AV.File(name,file);
export const createUserClass = () => new AV.User();


