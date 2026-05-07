from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour la gestion des Utilisateurs (CRUD).
    """
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer
    # Pour sécuriser en production, on pourrait décommenter ceci :
    # permission_classes = [IsAdminUser]
