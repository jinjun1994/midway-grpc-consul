

## 存在的问题

根目录使用 koa 的项目可以接入 consul

子目录 boilerplate 下的 grpc 服务无法接入 consul

## gprc

存在两个独立的项目
根目录是 koa框架，具备gprc服务调用功能

boilerplate 子目录，是单独项目提供 grpc 发布服务


先启动 子目录的服务，然后再启动根目录的服务

子目录
```bash
$ npm i
$ npm run dev
```

根目录
```bash
$ npm i
$ npm run dev
```

打开 http://127.0.0.1:7001/api/get_user

可以看到主项目调用gprc 服务的结果

## consul

### Consul部署步骤：
####	安装
运行 `consul agent -dev`
运行后可以打开 ui 界面 http://localhost:8500/ui/dservices

#### midway 接入步骤
##### 安装
````
$ npm i @midwayjs/consul@3 --save
$ npm i @types/consul --save-dev
````

#### 配置
````
//configuration.ts
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
````
````
// config.default.ts
config.consul =  {
  provider: {
    // 注册本服务
    register: true,
    // 应用正常下线反注册
    deregister: true,
    // consul server 主机
    host: '192.168.0.10',               // 此处修改 consul server 的地址
    // consul server 端口
    port: 8500,                                 // 端口也需要进行修改
    // 调用服务的策略(默认选取 random 具有随机性)
    strategy: 'random',
  },
  service: {
    address: '127.0.0.1',               // 此处是当前这个 midway 应用的地址
    port: 7001,                                 // midway应用的端口
    tags: ['tag1', 'tag2'],         // 做泳道隔离等使用
    name: 'my-midway-project'
    // others consul service definition
  }
}
````
配置之后启动，consul ui 会马上出现启动的框架程序服务
