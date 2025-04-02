package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import scala.collection.mutable
import models.Product

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

    private val productList = new mutable.ListBuffer[Product]()
    productList += Product(1, "apple", 1.29, 1)
    productList += Product(2, "bear", 5999.99, 2)
    productList += Product(3, "chainsaw", 599.0, 3)
    productList += Product(4, "double cheesburger", 4.99, 1)
    productList += Product(5, "epipen", 10.0, 3)

    implicit val productFormat: OFormat[Product] = Json.format[Product]

    def getAll: Action[AnyContent] = Action {
        if (productList.isEmpty) {
            NoContent
        }
        else {
            Ok(Json.toJson(productList))
        }
    }

    def get(id: Int): Action[AnyContent] = Action {
        productList.find(_.id == id) match {
            case Some(product) => Ok(Json.toJson(product))
            case None => NotFound
        }
    }

    def add: Action[AnyContent] = Action { implicit request =>
        request.body.asJson.flatMap(Json.fromJson[Product](_).asOpt) match {
            case Some(product) =>
                val nextId = productList.map(_.id).max + 1
                val newProduct = product.copy(id = nextId)
                productList += newProduct
                Created(Json.toJson(newProduct))
            case None => BadRequest
        }
    }

    def update(id: Int): Action[AnyContent] = Action { implicit request =>
        productList.find(_.id == id) match {
            case Some(existingProduct) =>
                request.body.asJson.flatMap(Json.fromJson[Product](_).asOpt) match {
                    case Some(updatedProduct) =>
                        productList -= existingProduct
                        val newProduct = updatedProduct.copy(id = id)
                        productList += newProduct
                        Ok(Json.toJson(newProduct))
                    case None => BadRequest(Json.obj("error" -> "Invalid JSON format"))
                }
            case None => NotFound
        }
    }

    def delete(id: Int): Action[AnyContent] = Action {
        productList.find(_.id == id) match {
            case Some(product) =>
                productList -= product
                Ok(Json.obj("message" -> s"Product with ID $id deleted"))
            case None => NotFound
        }
    }
}
