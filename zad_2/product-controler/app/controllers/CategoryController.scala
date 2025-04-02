package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import scala.collection.mutable
import models.Category

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

    private val categoryList = new mutable.ListBuffer[Category]()
    categoryList += Category(1, "food", "food that can be eaten, very yummy")
    categoryList += Category(2, "animal", "animal that may eat you, not yummy")
    categoryList += Category(3, "thing", "things that you can use in yor everyday life, may be yummy")

    implicit val categoryFormat: OFormat[Category] = Json.format[Category]

    def getAll: Action[AnyContent] = Action {
        if (categoryList.isEmpty) {
            NoContent
        }
        else {
            Ok(Json.toJson(categoryList))
        }
    }

    def get(id: Int): Action[AnyContent] = Action {
        categoryList.find(_.id == id) match {
            case Some(category) => Ok(Json.toJson(category))
            case None => NotFound
        }
    }

    def add: Action[AnyContent] = Action { implicit request =>
        request.body.asJson.flatMap(Json.fromJson[Category](_).asOpt) match {
            case Some(category) =>
                val nextId = categoryList.map(_.id).max + 1
                val newCategory = category.copy(id = nextId)
                categoryList += newCategory
                Created(Json.toJson(newCategory))
            case None => BadRequest
        }
    }

    def update(id: Int): Action[AnyContent] = Action { implicit request =>
        categoryList.find(_.id == id) match {
            case Some(existingCategory) =>
                request.body.asJson.flatMap(Json.fromJson[Category](_).asOpt) match {
                    case Some(updatedCategory) =>
                        categoryList -= existingCategory
                        val newCategory = updatedCategory.copy(id = id)
                        categoryList += newCategory
                        Ok(Json.toJson(newCategory))
                    case None => BadRequest(Json.obj("error" -> "Invalid JSON format"))
                }
            case None => NotFound
        }
    }

    def delete(id: Int): Action[AnyContent] = Action {
        categoryList.find(_.id == id) match {
            case Some(category) =>
                categoryList -= category
                Ok(Json.obj("message" -> s"Category with ID $id deleted"))
            case None => NotFound
        }
    }
}
