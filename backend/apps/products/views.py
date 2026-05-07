from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour le CRUD complet de Product.
    Gère automatiquement les actions de base : list, create, retrieve, update, destroy.
    """
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    # Pour l'instant on permet l'accès à tous, on rajoutera l'auth JWT plus tard
    # permission_classes = [IsAuthenticated]
