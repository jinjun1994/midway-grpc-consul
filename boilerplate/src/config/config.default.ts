import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '{{keys}}',

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
      port: 6565, // midway应用的端口
      tags: ['tag3', 'tag4'], // 做泳道隔离等使用
      name: 'grpc服务',
      // others consul service definition
    },
  },
} as MidwayConfig;
