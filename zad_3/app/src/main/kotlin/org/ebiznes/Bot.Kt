package org.ebiznes

import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.common.entity.Snowflake
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.routing.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.github.cdimascio.dotenv.Dotenv


data class Product(val name: String, val price: Double, val category: String)

class ProductCatalog {
    private val products = mutableListOf<Product>()

    fun addProduct(product: Product) {
        products.add(product)
    }

    fun getCategories(): List<String> {
        return products.map { it.category }.distinct()
    }

    fun getProductsByCategory(category: String): List<Product> {
        return products.filter { it.category == category }
    }
}


suspend fun main() {
    val dotenv = Dotenv.load()
    val channelId = dotenv.get("CHANNEL_ID")
    val token = dotenv.get("DISCORD_BOT_TOKEN")

    val catalog = ProductCatalog()
    catalog.addProduct(Product("apple", 1.29, "food"))
    catalog.addProduct(Product("beaver", 99.0, "animal"))
    catalog.addProduct(Product("cinammon roll", 2.49, "food"))
    catalog.addProduct(Product("duck", 15.01, "animal"))
    catalog.addProduct(Product("earth", 1000000.0, "thing"))
    catalog.addProduct(Product("fake lashes", 68.99, "thing"))

    println("Starting Discord bot...")
    val kord = Kord(token)

    kord.on<MessageCreateEvent> {
        if (message.author?.isBot != false) return@on

        val content = message.content.lowercase()

         when {
            content == "!categories" -> {
                val categories = catalog.getCategories()
                message.channel.createMessage("Categories: $categories")
            }
            
            content.startsWith("!products ") -> {
                val category = content.removePrefix("!products ").trim()
                val products = catalog.getProductsByCategory(category)
                if (products.isEmpty()) {
                    message.channel.createMessage("Category '$category' not found. Use `!categories` to see available categories.")
                } else {
                    message.channel.createMessage("Products that belong to '$category': $products")
                }
            }
        }
        println("Message received from user ${message.author?.tag}: ${message.content}")
    }

    embeddedServer(Netty, port = 8080) {
        messageSenderModule(kord, channelId)
    }.start(wait = false)

    kord.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}

fun Application.messageSenderModule(kord: Kord, channelId: String) {
    routing {
        post("/send") {
            val message = call.receive<String>()
            kord.rest.channel.createMessage(Snowflake(channelId)) {
                content = message
            }
            call.respond("Message sent to channel with ID $channelId.")
        }
    }
}