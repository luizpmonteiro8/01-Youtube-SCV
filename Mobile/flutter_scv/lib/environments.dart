enum Environments {DEVELOPER, TEST, PRODUCTION}

class EnvironmentConfig {
  static Environments? environmentBuild;

  static String urlsConfig(){
    switch (environmentBuild){
      case Environments.DEVELOPER:
        return "http://192.168.100.122:3002";
      case Environments.TEST:
        return "http://192.168.100.122:3002";
      case Environments.PRODUCTION:
        return "http://192.168.100.122:3002";
      default:
        return "http://192.168.100.122:3002";
    }
  }
}