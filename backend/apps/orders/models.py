from django.db import models
from apps.products.models import Product

class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'En attente'),
        ('PREPARING', 'En préparation'),
        ('COMPLETED', 'Terminée'),
        ('CANCELLED', 'Annulée'),
    ]

    customer_name = models.CharField(max_length=255, verbose_name="Nom du client")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING', verbose_name="Statut")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, verbose_name="Prix total")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Créée le")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Mise à jour le")

    def __str__(self):
        return f"Commande #{self.id} - {self.customer_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE, verbose_name="Commande")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name="Produit")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Quantité")
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix unitaire")

    def __str__(self):
        return f"{self.quantity}x {self.product.name if self.product else 'Produit supprimé'} (Cmd #{self.order.id})"

