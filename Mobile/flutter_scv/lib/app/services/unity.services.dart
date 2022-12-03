import 'package:dio/dio.dart';
import 'package:flutter_scv/app/models/pagination.dart';
import 'package:flutter_scv/app/models/unity.dart';
import 'package:flutter_scv/environments.dart';

class UnityServices {
  final endPoint = '/unity';
  Dio dio = Dio();

  UnityServices() {
    dio.options.connectTimeout = 5000;
    dio.options.receiveTimeout = 5000;
    dio.options.sendTimeout = 5000;
    dio.options.baseUrl = EnvironmentConfig.urlsConfig();
  }

  Future getUnityPage(
      {page = 0, search = '', size = 25, order = 'asc', sort = 'id'}) async {
    List listUnity;

    try {
      final response = await dio.get(
          '$endPoint/pages?page=$page&search=$search&size=$size&order=$order&sort=$sort');
      listUnity =
          response.data['results'].map((item) => Unity.fromJson(item)).toList();
      Pagination pagination = Pagination(
          length: response.data['pagination']['length'],
          size: int.parse(response.data['pagination']['size']),
          lastPage: response.data['pagination']['lastPage'],
          page: response.data['pagination']['page'],
          startIndex: response.data['pagination']['startIndex'],
          endIndex: response.data['pagination']['endIndex']);

      return [listUnity, pagination];
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future<Unity> getUnityById(int id) async {
    try {
      final response = await dio.get('$endPoint/$id');
      return Unity.fromJson(response.data);
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future insert(Unity unity) async {
    try {
      final response = await dio.post(endPoint, data: {unity});
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future update(Unity unity) async {
    try {
      final response = await dio.patch('$endPoint/${unity.id}', data: unity);
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future remove(int id) async {
    try {
      final response = await dio.delete('$endPoint/$id');
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }
}
