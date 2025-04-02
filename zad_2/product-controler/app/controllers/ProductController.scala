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
    productList += Product(1, "apple")
    productList += Product(2, "bear")
    productList += Product(3, "chainsaw")
    productList += Product(4, "double cheesburger")
    productList += Product(5, "epipen")

    implicit val productFormat: OFormat[Product] = Json.format[Product]

    def getAllProducts: Action[AnyContent] = Action {
        if (productList.isEmpty) {
            NoContent
        }
        else {
            Ok(Json.toJson(productList))
        }
    }

    def getProduct(id: Int): Action[AnyContent] = Action {
        productList.find(_.id == id) match {
            case Some(product) => Ok(Json.toJson(product))
            case None => NotFound
        }
    }

    def addProduct: Action[AnyContent] = Action { implicit request =>
        request.body.asJson.flatMap(Json.fromJson[Product](_).asOpt) match {
            case Some(product) =>
                val nextId = productList.map(_.id).max + 1
                val newProduct = product.copy(id = nextId)
                productList += newProduct
                Created(Json.toJson(newProduct))
            case None => BadRequest
        }
    }

    def updateProduct(id: Int): Action[AnyContent] = Action { implicit request =>
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

    def deleteProduct(id: Int): Action[AnyContent] = Action {
        productList.find(_.id == id) match {
            case Some(product) =>
                productList -= product
                Ok(Json.obj("message" -> s"Product with ID $id deleted"))
            case None => NotFound
        }
    }
}
