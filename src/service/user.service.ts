import { Provide, Inject } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { Clients } from '@midwayjs/grpc';
import { helloworld } from '../domain/helloworld';

@Provide()
export class UserService {
  @Inject()
  grpcClients: Clients;

  async getUser(options: IUserOptions) {
    console.log(options);
    const greeterService =
      this.grpcClients.getService<helloworld.GreeterClient>(
        'helloworld.Greeter'
      );

    // 调用服务
    const result = await greeterService.sayHello().sendMessage({
      name: 'harry',
    });

    // 返回结果
    return result;
  }
}
