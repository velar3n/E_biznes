package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import scala.collection.mutable
import models.Cart

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

    private val cartList = new mutable.ListBuffer[Cart]()
    cartList += Cart(1, 2, 3)
    cartList += Cart(2, 1, 1)

    implicit val xartFormat: OFormat[Cart] = Json.format[Cart]

    def getAll: Action[AnyContent] = Action {
        if (cartList.isEmpty) {
            NoContent
        }
        else {
            Ok(Json.toJson(cartList))
        }
    }

    def get(id: Int): Action[AnyContent] = Action {
        cartList.find(_.id == id) match {
            case Some(cart) => Ok(Json.toJson(cart))
            case None => NotFound
        }
    }

    def add: Action[AnyContent] = Action { implicit request =>
        request.body.asJson.flatMap(Json.fromJson[Cart](_).asOpt) match {
            case Some(cart) =>
                val nextId = cartList.map(_.id).max + 1
                val newCart = cart.copy(id = nextId)
                cartList += newCart
                Created(Json.toJson(newCart))
            case None => BadRequest
        }
    }

    def update(id: Int): Action[AnyContent] = Action { implicit request =>
        cartList.find(_.id == id) match {
            case Some(existingCart) =>
                request.body.asJson.flatMap(Json.fromJson[Cart](_).asOpt) match {
                    case Some(updatedCart) =>
                        cartList -= existingCart
                        val newCart = updatedCart.copy(id = id)
                        cartList += newCart
                        Ok(Json.toJson(newCart))
                    case None => BadRequest(Json.obj("error" -> "Invalid JSON format"))
                }
            case None => NotFound
        }
    }

    def delete(id: Int): Action[AnyContent] = Action {
        cartList.find(_.id == id) match {
            case Some(cart) =>
                cartList -= cart
                Ok(Json.obj("message" -> s"Cart with ID $id deleted"))
            case None => NotFound
        }
    }
}