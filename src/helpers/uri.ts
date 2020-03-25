import {parse} from "uri-js";

export enum PROTOCOL {
  GIT= 'git',
  SSH = 'git+ssh',
  HTTP = 'git+http',
  HTTPS = 'git+https',
  FILE = 'git+file',
}

export class Uri {
  public static change(uri: string, username: string, password: string, protocol: PROTOCOL): string {
    if (!this.isGitUri(uri))
      return  uri;

    const uriProps = parse(uri);
    const port = (uriProps.port) ? `:${uriProps.port}` : '';
    const path = (uriProps.path) ? uriProps.path.replace(':', '/') : '';
    const query = (uriProps.query) ? `?${uriProps.query}` : '';
    const fragment = (uriProps.fragment) ? `#${uriProps.fragment}` : '';
    return `${protocol}://${username}:${password}@${uriProps.host}${port}${path}${query}${fragment}`;
  }

  public static isGitUri(uri: string): boolean {
    try {
      return Object
        .values<string>(PROTOCOL)
        .includes(parse(uri).scheme || '');
    } catch (e) {
      return false
    }
  }
}
