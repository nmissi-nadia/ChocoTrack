from django.db import models

class Ingredient(models.Model):
    UNIT_CHOICES = [
        ('kg', 'Kilogramme'),
        ('g', 'Gramme'),
        ('L', 'Litre'),
        ('ml', 'Millilitre'),
        ('unit', 'Unité'),
    ]

    name = models.CharField(max_length=255, verbose_name="Nom de l'ingrédient")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    quantity_in_stock = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, verbose_name="Quantité en stock")
    unit = models.CharField(max_length=10, choices=UNIT_CHOICES, default='kg', verbose_name="Unité de mesure")
    minimum_stock_level = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, verbose_name="Niveau de stock minimum")
    last_restocked = models.DateTimeField(null=True, blank=True, verbose_name="Dernier réapprovisionnement")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Créé le")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Mis à jour le")

    def __str__(self):
        return f"{self.name} ({self.quantity_in_stock} {self.get_unit_display()})"

    @property
    def is_low_stock(self):
        return self.quantity_in_stock <= self.minimum_stock_level
