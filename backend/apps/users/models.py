from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('ADMIN', 'Administrateur'),
        ('CHEF', 'Pâtissier'),
        ('CASHIER', 'Vendeur'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='CASHIER', verbose_name="Rôle")
    phone_number = models.CharField(max_length=20, blank=True, null=True, verbose_name="Numéro de téléphone")

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
