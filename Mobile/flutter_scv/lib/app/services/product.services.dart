import 'package:dio/dio.dart';
import 'package:flutter_scv/app/models/pagination.dart';
import 'package:flutter_scv/app/models/product.dart';
import 'package:flutter_scv/environments.dart';

class ProductServices {
  final endPoint = '/product';
  Dio dio = Dio();

  ProductServices() {
    dio.options.connectTimeout = 15000;
    dio.options.receiveTimeout = 15000;
    dio.options.sendTimeout = 15000;
    dio.options.baseUrl = EnvironmentConfig.urlsConfig();
  }

  Future getProductPage({required page, search = ''}) async {
    List listProduct;

    try {
      final response =
          await dio.get('$endPoint/pages?page=$page&search=$search');
      listProduct =
          response.data['results'].map((item) => Product.fromJson(item)).toList();
      Pagination pagination = Pagination(
          length: response.data['pagination']['length'],
          size: response.data['pagination']['size'],
          lastPage: response.data['pagination']['lastPage'],
          page: response.data['pagination']['page'],
          startIndex: response.data['pagination']['startIndex'],
          endIndex: response.data['pagination']['endIndex']);

      return [listProduct,pagination];
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future<Product> getProductById(int id) async {
    try {
      final response = await dio.get('$endPoint/$id');
      return Product.fromJson(response.data);
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future insert(Product product) async{
    try{
      final response = await dio.post(endPoint,data:{product});
      return response.data['id'];
    }on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future update(Product product) async{
    try{
      final response = await dio.patch('$endPoint/${product.id}',data:product);
    }on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future remove(int id) async{
    try{
      final response = await dio.delete('$endPoint/$id');
    }on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }
}
