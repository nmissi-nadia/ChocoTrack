from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour le CRUD complet des Commandes (Orders).
    Gère la création de la commande et de ses articles liés.
    """
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated] # À ajouter plus tard
