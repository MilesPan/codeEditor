import { DockerOptions } from 'dockerode';

export const config: DockerOptions = {
  //  docker: host.docker.internal
  //  dev: '127.0.0.1',
  host: process.env.DOCKER_HOST,
  port: process.env.DOCKER_PORT,
  protocol: 'http',
};
