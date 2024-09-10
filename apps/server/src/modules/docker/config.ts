import { DockerOptions } from 'dockerode';

export const config: DockerOptions = {
  //  docker: host.docker.internal
  //  dev: '127.0.0.1',
  host: '127.0.0.1',
  port: '2375',
  protocol: 'http',
};
