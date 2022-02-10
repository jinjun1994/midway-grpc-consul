import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '{{keys}}',
  koa: {
    port: 7001,
  },
  grpc: {
    services: [
      {
        url: 'localhost:6565',
        protoPath: join(__dirname, '../../boilerplate/proto/helloworld.proto'),
        package: 'helloworld',
      },
    ],
  },
  consul: {
    provider: {
      // 注册本服务
      register: true,
      // 应用正常下线反注册
      deregister: true,
      // consul server 主机
      host: '127.0.0.1', // 此处修改 consul server 的地址
      // consul server 端口
      port: 8500, // 端口也需要进行修改
      // 调用服务的策略(默认选取 random 具有随机性)
      strategy: 'random',
    },
    service: {
      address: '127.0.0.1', // 此处是当前这个 midway 应用的地址
      port: 7001, // midway应用的端口
      tags: ['tag1', 'tag2'], // 做泳道隔离等使用
      name: 'koa框架',
      // others consul service definition
    },
  },
} as MidwayConfig;
