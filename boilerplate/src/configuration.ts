import { Configuration } from '@midwayjs/decorator';
import * as consul from '@midwayjs/consul'
import { join } from 'path';
import {
  ILifeCycle,
  IMidwayApplication,
  IMidwayContainer,
} from '@midwayjs/core';


@Configuration({
  imports: [
    consul
  ],
  importConfigs: [join(__dirname, 'config')],

  conflictCheck: true,
})
export class ContainerConfiguration implements ILifeCycle {
  async onReady(container: IMidwayContainer, app?: IMidwayApplication) {
    console.info(app.getConfig());
    // const collector = new WebRouterCollector();
    // console.log(await collector.getFlattenRouterTable());
  }
}
