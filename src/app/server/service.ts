import { environment } from '../../environments/environment'

const proxy = {
  //开发地址
  dev: 'http://localhost:3000/backend',
  //dev: 'http://120.76.121.29:3000/backend',
  //正式上线地址
  prod:'http://39.108.64.129:3000/backend' 
   //测试上线地址
 // prod:'http://120.76.121.29:3000/backend' 
  
};
// 打包时运行 ng build --prod 便会应用 prod 地址
export const server = proxy[ environment.env ];