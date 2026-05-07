from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Nom du produit")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix")
    stock = models.IntegerField(default=0, verbose_name="Quantité en stock")
    is_available = models.BooleanField(default=True, verbose_name="Disponible")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Créé le")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Mis à jour le")

    def __str__(self):
        return self.name
